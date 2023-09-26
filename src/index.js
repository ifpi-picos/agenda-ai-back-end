const express = require('express')
const app = express()
require("dotenv").config();
const swaggerUi = require("swagger-ui-express")
const swaggerDocs = require("./swagger.json")

const PORT = process.env.PORT || 3000

const lanchoneteRoutes = require('./routes/lanchonetes');
const authRoutes = require('./routes/auth')

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/lanchonetes', lanchoneteRoutes);
app.use('/auth', authRoutes)

app.listen(PORT , () => {
    console.log(`App rodando na porta ${PORT}`)
})

//vercel