const getError = (errors, field) => {
  try {
    return errors.mapped()[field].msg;
  } catch (err) {
    return "";
  }
};

module.exports = getError;
