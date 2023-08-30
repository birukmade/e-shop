const layout = require("../layout");
const getError = require("../../helpers");
const signupForm = ({ req, errors }) => {
  return layout({
    content: `
  <div>
    <form method="post">
        <input type="" name="email" placeholder="email" /> 
        ${getError(errors, "email")}
        <input type="password" name="password" placeholder="password" /> 
        ${getError(errors, "password")}
        <input type="password" name="confirmPassword" placeholder="confirm passowrd" /> 
        ${getError(errors, "confirmPassword")}
        <button type="submit">Sign Up</button>
    </form>
  </div>
  `,
  });
};

module.exports = signupForm;
