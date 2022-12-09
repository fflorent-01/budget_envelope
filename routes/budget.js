const { validateHeaderValue } = require("http")

const Router = require("express").Router
const budget = process.db

const budgetRouter = Router()

budgetRouter.route("/")
    .get( (req, res) => {
        res.send(budget.toJson())
    })
    .post( (req, res) => {
        const {name, description, amount} = req.body
        if ( !(name && amount && typeof description === "string") ) {
            res.sendStatus(400)
        }
        try {
            const newIncomeSource = budget.addIncomeSource(name, description, amount)
            if ( newIncomeSource ) {
                res.send(newIncomeSource.toJson())
            }
        } catch (err) {
            res.sendStatus(500)
        }
    })

budgetRouter.param("incomeSourceId", (req, res, next, id) => {
    const incomeSource = budget.getIncomeSourceById(id)
    if ( !incomeSource ) {
        res.sendStatus(404)
    }
    req.incomeSource = incomeSource
    next()
})

budgetRouter.route("/income")
    .get( (req, res) => {
        const incomeSources = budget.toJson()["incomeSources"]
        res.send(Object.values(incomeSources))
    })

budgetRouter.route("/:incomeSourceId")
    .get( (req, res) => {
        res.send(req.incomeSource.toJson())
    })
    .put( (req, res) => {
        const {name, description, amount} = req.body
        if ( !(name || typeof description === "string" || amount) ) {
            return res.sendStatus(400)
        }
        try {
            if ( name ) {
                req.incomeSource.name = name
            }
            if ( typeof description === "string" ) {
                req.incomeSource.description = description
            }
            if ( amount ) {
                req.incomeSource.amount = amount
            }            
        } catch (err) {
            return res.status(400).send(err.message)
        }

        res.send(req.incomeSource.toJson())
    })
    .delete( (req, res) => {
        try {
            budget.removeIncomeSource(req.incomeSource.id)
        } catch (err) {
            return res.status(400).send(err.message)
        }
        res.sendStatus(202)
    })



module.exports = budgetRouter
