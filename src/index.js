const express = require('express')
const app = express()
require("dotenv").config();
const swaggerUi = require("swagger-ui-express")
const swaggerDocs = require("./swagger.json")
const cors = require('cors')

const PORT = process.env.PORT || 3001
const routes = require('./routes')

/*const corsOptions = {
    origin: "https://agenda-ai-front-end.vercel.app"
  };*/
  
  app.use(cors());

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/', routes)

const server = app.listen(PORT , () => {
    console.log(`App rodando na porta ${PORT}`)
})

module.exports = server