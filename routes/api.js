const Router = require("express").Router

const apiRouter = Router()

// Budget routes
const budgetRouter = require("./budget")
apiRouter.use("/budget", budgetRouter)

// Envelopes routes
const envelopeRouter = require("./envelope")
apiRouter.use("/envelopes", envelopeRouter)

// Expense routes
const expenseRouter = require("./expense")
apiRouter.use("/expenses", expenseRouter)

module.exports = apiRouter
