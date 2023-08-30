const layout = require("../layout");
const getError = require("../../helpers");
const signinForm = ({ errors }) => {
  return layout({
    content: `
  <div>
    <form method="post">
        <input type="" name="email" placeholder="email" /> 
        ${getError(errors, "email")}
        <input type="password" name="password" placeholder="password" /> 
        ${getError(errors, "password")}
        <button type="submit">Sign in</button>
    </form>
  </div>
  `,
  });
};

module.exports = signinForm;
