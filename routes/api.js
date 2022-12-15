const { Router } = require("express")


const apiRouter = Router()

/**
 * Middleware that checks the validity of name, description, amount
 * @returns {NextFunction | res.status}
 */
const bodyParameterChecker = (req, res, next) => {

    const { name, description, amount } = req.body

    if (name && (typeof name !== "string" || name === "") ) {
        return res.status(400).send("Argument [name] must be a non-empty string.")
    }
    if ( !["string", "undefined"].includes(typeof description) ) {
        return res.status(400).send("Argument [description] must be a string.")    
    }
    if (amount && (typeof amount !== "number" || amount < 0) ) {
        return res.status(400).send("Argument [amount] must be a positive number.")
    }        

    next()
}


// Budget routes
const budgetRouter = require("./budget")
apiRouter.use("/budget", bodyParameterChecker, budgetRouter)

// Envelopes routes
const envelopeRouter = require("./envelope")
apiRouter.use("/envelopes", bodyParameterChecker, envelopeRouter)

// Expense routes
const expenseRouter = require("./expense")
apiRouter.use("/expenses", bodyParameterChecker, expenseRouter)

module.exports = apiRouter
