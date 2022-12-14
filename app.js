/* global process */
const express = require("express")
const app = express()

module.exports = app

// Start db
// Never do this again as this is a nigthmare to test and no persistence
// Would ideally require a proper db or static data structure
// Not to mention this is probably super not secure
const createBudget = require("./db/createBudget")
const { budget: db } = createBudget()
process.db = db


// Set environement variable
const PORT = process.env.port || 8080

// Top middleware
const cors = require("cors")
app.use(cors())
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const morgan = require("morgan")
app.use(morgan("dev"))

// Set main router
const apiRouter = require("./routes/api")
app.use("/api", apiRouter)

// Start app
app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`))
