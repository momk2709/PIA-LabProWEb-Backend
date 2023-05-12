const { register, login } = require("./auth.services");
const registerController = async (req, res) => {
  try {
    const user = await register(req.body);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
const loginController = async (req, res) => {
  try {
    const user = await login(req.body);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = {
  registerController,
  loginController,
};
