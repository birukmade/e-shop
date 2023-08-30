const layout = require("../layout");
const signupForm = ({ req }) => {
  return layout({
    content: `
  <div>
    <form method="post">
        <input type="" name="email" placeholder="email" /> 
        <input type="password" name="password" placeholder="password" /> 
        <input type="password" name="confirmPassword" placeholder="confirm passowrd" /> 
        <button type="submit">Sign Up</button>
    </form>
  </div>
  `,
  });
};

module.exports = signupForm;
