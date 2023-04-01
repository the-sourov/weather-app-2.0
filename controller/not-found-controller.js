// ⚓ ====================> core modules
const path = require(`path`);

const notFoundController = (_req, res) => {
    res
     .set({
        "X-Powered-By" : "Sourov",
        "Content-Type" : "text/html; charset=utf-8"
     })
     .status(404)
     .sendFile(path.join(__dirname, `/../view/404.html`));
};

module.exports = notFoundController;