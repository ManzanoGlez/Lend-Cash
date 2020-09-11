const cors = require("cors");
 
const cors_config = (app) => {
  
    app.use(cors());
};

module.exports = cors_config;
