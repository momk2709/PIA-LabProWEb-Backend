const createInforme = require("./informe.services");
const contactUsController = async (req, res) => {
  try {
    const informe = await createInforme(req.body);
    res.send(informe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
module.exports = contactUsController;
