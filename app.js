const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const morgan = require("morgan")

// Set environement varaibles
const PORT = process.env.port || 8080

// Start app
const app = express()
app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`))

// Top middleware
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

// Here will be the routes
const apiRouter = require("./routes/api")
app.use('/api', apiRouter)

