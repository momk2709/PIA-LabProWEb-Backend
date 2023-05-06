const registerController = async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
const loginController = async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = {
  registerController,
  loginController,
};
