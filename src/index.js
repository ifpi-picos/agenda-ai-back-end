const express = require('express')
const app = express()
require("dotenv").config();
const swaggerUi = require("swagger-ui-express")
const swaggerDocs = require("./swagger.json")
const cors = require('cors')
const routes = require('./routes')

const corsOptions = {
  origin: "https://agendaai.vercel.app"
};

app.use(cors(corsOptions));


app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/', routes)


module.exports = app