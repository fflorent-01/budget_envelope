/*global process*/
const Router = require("express").Router
const db = process.db

const expenseRouter = Router()

expenseRouter.route("/")
    .get((req, res) => {
        res.send(db.expenses)
    })

expenseRouter.param("expenseId", (req, res, next, id) => {
    const expense = db.getExpenseById(id)
    if ( !expense ) {
        return res.sendStatus(404)
    }

    req.expense = expense
    next()
})

expenseRouter.route("/:expenseId")
    .get((req, res) => {
        res.send(req.expense.toJson())
    })
    .put((req, res) => {
        const {name, description, amount} = req.body
        try {
            if ( name ) {
                req.expense.name = name
            }
            if ( typeof description === "string" ) {
                req.expense.description = description
            }
            if ( amount ) {
                req.expense.amount = amount
            }            
        } catch(err) {

            return res.status(400).send(err.message)
        }

        res.send(req.expense.toJson())
    })
    .delete((req, res) => {
        try {
            req.expense.parent.removeExpense(req.expense.id)
        } catch(err) {
            res.status(500).send(err.message)
        }
        res.sendStatus(204)
    })
    // Using post in order to move expense from envelopes
    .post((req, res) => {

        const currentEnvelope = req.expense.parent
        const destinationEnvelope = db.getEnvelopeById(req.body.moveTo)

        if ( !destinationEnvelope ) {
            return res.sendStatus(404)
        }
        try {
            currentEnvelope.moveExpenseTo(req.expense, destinationEnvelope)
        } catch(err) {
            console.log(err)
            return res.status(500).send(err.message)
        }
        res.send({"movedTo": req.expense.parent.id})
    })

module.exports = expenseRouter
