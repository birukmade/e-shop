// Import the fs, crypto, and util modules

const crypto = require("crypto");
const util = require("util");
const Repository = require("./repository");

// Convert the crypto.scrypt function into a promise-based version using util.promisify
const scrypt = util.promisify(crypto.scrypt);

// Define a class that can manage access to a data store of users
class UsersRepository extends Repository {
  // Define an async method that compares two passwords by hashing and salting them
  async comparePasswords(saved, supplied) {
    const [hash, salt] = saved.split(".");
    const hashOfSupplied = await scrypt(supplied, salt, 64);
    return hashOfSupplied.toString("hex") === hash;
  }

  // Define an async method that creates a new record and adds it to the file
  async create(user) {
    user.id = this.randomId();
    const salt = crypto.randomBytes(8).toString("hex");
    const buffer = await scrypt(user.password, salt, 64);

    const userRecords = await this.getAll();
    const newUserRecord = {
      ...user,
      password: `${buffer.toString("hex")}.${salt}`,
    };
    userRecords.push(newUserRecord);
    await this.writeAll(userRecords);
    return newUserRecord;
  }
}

// Export a new instance of the UsersRepository class with a custom filename of usersStore.json
module.exports = new UsersRepository("usersStore.json");
