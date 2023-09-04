const layout = require("../layout");
const getError = require("../../helpers");

const productForm = ({ errors }) => {
  return layout({
    content: `
            <form method="POST" enctype="multipart/form-data">
                <input type="text" name="title" placeholder="product title" />
                ${getError(errors, "title")}
                <input type="number" name="price" />
                ${getError(errors, "price")}
                <input type="file" name="image" />
                <button type="submit">Create Product </button>
            </form>

        `,
  });
};

module.exports = productForm;
