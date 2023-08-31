const layout = require("../layout");
const getError = require("../../helpers");

const productForm = ({ errors }) => {
  return layout({
    content: `
            <form method="POST">
                <input type="text" name="title" placeholder="product title" />
                <input type="number" name="price" />
                <input type="file" name="image" />
                <button type="submit">Create Product </button>
            </form>

        `,
  });
};

module.exports = productForm;
