
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express")




const connectToMongoDB = require('./Config/connection');
const userRoutes = require('./apps/controllers/userController');
const router = require('./apps/routes/userroutes');
const { title } = require('process');
const { version } = require('os');
const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());
// Mount the user routes
app.use('/', router);

const options = {
  definition:{
    openapi: "3.0.0",
    info:{
      title: "SR Solutions api-doc",
      version:"0.1",
      description:"This is a simple api - doc made with Express and Node JS and documented with SwaggerUi.",
      contact: {
        name :'Sharon Sebastian',
        url:"sharonsebastian81@gmail.com",
        email:"sharonsebastian81@gmail.com"
      }
    },

    servers:[
      {
        url:"http://localhost:7000/"
      },
    ],
  },
  apis:["./apps/routes/userroutes.js"]
}

const spaces = swaggerjsdoc(options)
app.use("/api-docs",swaggerui.serve,
  swaggerui.setup(spaces)
 )





  

// Connect to MongoDB
connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
