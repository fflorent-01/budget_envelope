const Router = require("express").Router

const apiRouter = Router()

// Budget routes
const budgetRouter = require("./budget")
apiRouter.use("/budget", budgetRouter)

// Envelopes routes
const envelopeRouter = require("./envelope")
apiRouter.use("/envelope", envelopeRouter)

// Expense routes
const expenseRouter = require("./expense")
apiRouter.use("/expense", expenseRouter)

module.exports = apiRouter
