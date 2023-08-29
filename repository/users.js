// Import the fs and crypto modules
const fs = require("fs");
const crypto = require("crypto");

// Define a class that can manage access to a data store of users
class UsersRepository {
  // Define a constructor that takes a filename as an argument
  constructor(filename) {
    // If no filename is provided, throw an error
    if (!filename) {
      throw new Error("creating a repository requires a filename");
    }

    // Assign the filename to a property of the class instance
    this.filename = filename;

    // Try to access the file with the given filename or create it if it does not exist
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(filename, "[]");
    }
  }

  // Define an async method that returns all the records in the file as an array of objects
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf-8",
      })
    );
  }

  // Define an async method that creates a new record and adds it to the file
  async create(user) {
    user.id = this.randomId();
    const userRecords = await this.getAll();
    userRecords.push(user);
    await this.writeAll(userRecords);
    return user;
  }

  // Define an async method that writes an array of records to the file
  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  // Define a method that generates a random ID using the crypto module
  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }

  // Define an async method that returns a record with a given ID or undefined if not found
  async getOne(id) {
    const records = await this.getAll();
    return records.filter((record) => record.id === id);
  }

  // Define an async method that deletes a record with a given ID from the file
  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    this.writeAll(filteredRecords);
  }

  // Define an async method that updates a record with a given ID with new attributes
  async update(id, attr) {
    const records = await this.getAll();
    const targetUser = records.find((record) => record.id === id);

    if (!targetUser) {
      throw new Error(`record with id ${id} not found.`);
    }

    Object.assign(targetUser, attr);
    await this.writeAll(records);
  }

  // Define an async method that returns a record that matches a given filter object or undefined if not found
  async getOneBy(filter) {
    const records = await this.getAll();

    for (const record of records) {
      let found = true;

      for (const key in filter) {
        if (record[key] !== filter[key]) {
          found = false;
          break;
        }
      }

      if (found) {
        return record;
      }
    }
  }
}

// Export a new instance of the UsersRepository class with a default filename of users.json
module.exports = new UsersRepository("usersStore.json");
