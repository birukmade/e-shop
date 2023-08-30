const layout = require("../layout");
const signinForm = () => {
  return layout({
    content: `
  <div>
    <form method="post">
        <input type="" name="email" placeholder="email" /> 
        <input type="password" name="password" placeholder="password" /> 
        <button type="submit">Sign in</button>
    </form>
  </div>
  `,
  });
};

module.exports = signinForm;
