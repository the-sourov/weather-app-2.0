// ⚓ ====================> core modules
const path = require(`path`);
// ⚓ ====================> third party modules
require(`dotenv`).config();
const express = require(`express`);
const bodyParser = require(`body-parser`);
// ⚓ ====================> own modules
const getController = require(path.join(__dirname, `controller/get-controller`));
const postController = require(path.join(__dirname, `controller/post-controller`));
const notFoundController = require(path.join(__dirname, `controller/not-found-controller`));

const app = express();

// 🐸 ====================> middlewares
app.use(express.static(`public`));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// 🍕 ====================> routing
app.route(`/`).get(getController).post(postController).all(notFoundController);
app.route(`*`).all(notFoundController);

// 🔥 ====================> the server
const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`Server is running on port ${port} 🔥.`);
})