// ⚓ ====================> core modules
const path = require(`path`);

const getController = (_req, res) => {
    res
     .set({
        "X-Powered-By" : "Sourov",
        "Content-Type" : "text/html; charset=utf-8"
     })
     .status(200)
     .sendFile(path.join(__dirname, `/../view/index.html`));
};

module.exports = getController;