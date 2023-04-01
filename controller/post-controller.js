// ⚓ ====================> core modules
const path = require(`path`);
// ⚓ ====================> own modules
const getData = require(path.join(__dirname, `/../model/get-data`));

const postController = async ({body}, res) => {
    
    if("latitude" in body && "longitude" in body) {

        const {latitude, longitude} = body;
        const response = await getData(latitude, longitude);
        const {resolved, data} = response;

        if(!resolved) {
            
            res
             .set({"X-Powered-By" : "Sourov", "Content-Type" : "application/json; charset=utf-8"})
             .status(500)
             .send(JSON.stringify({message : `Internal server error 💥.`}));

        } else {
            
            res
             .set({"X-Powered-By" : "Sourov", "Content-Type" : "application/json"})
             .status(200)
             .send(JSON.stringify(data));
        }

    } else {
        
        res
         .set({"X-Powered-By" : "Sourov", "Content-Type" : "application/json; charset=utf-8"})
         .status(400)
         .send(JSON.stringify({message : `Wrong coordinates 😭.`}));
    }
};

module.exports = postController;