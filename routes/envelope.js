/* global process */
const Router = require("express").Router
const db = process.db

const envelopeRouter = Router()

envelopeRouter.route("/")
    .get( (req, res) => {
        res.send(Object.values(db.toJson()["envelopes"]))
    })
    .post((req, res) => {
        
        const {name, description, amount} = req.body
        let newEnvelope
        try {
            newEnvelope = db.addEnvelope(name, description, amount)
        } catch(err) {
            return res.status(400).send(err.message)
        }
        if ( !newEnvelope ) {
            return res.sendStatus(500)
        }

        res.status(201).send(newEnvelope.toJson())
    })

envelopeRouter.param("envelopeId", (req, res, next, id) => {
    const envelope = db.getEnvelopeById(id)
    if ( !envelope ) {
        return res.sendStatus(404)
    }
    req.envelope = envelope
    next()
})

envelopeRouter.route("/:envelopeId")
    .get((req, res) => {
        res.send(req.envelope.toJson())
    })
    .put((req, res) => {
        
        const {name, description, amount} = req.body

        try {
            if ( name !== undefined ) {
                req.envelope.name = name
            }
            if ( description !== undefined ) {
                req.envelope.description = description
            }
            if ( amount !== undefined ) {
                req.envelope.amount = amount
            }
        } catch (err) {
            return  res.status(400).send(err.message)
        }

        res.send(req.envelope.toJson())
    })
    .delete((req, res) => {
        try {
            req.envelope.parent.removeEnvelope(req.envelope.id)
        } catch (err) {
            return res.status(500).send(err.message)
        }
        res.sendStatus(202)
    })

envelopeRouter.route("/:envelopeId/expenses")
    .get((req, res) => {
        const expenses = req.envelope.expenses
        if ( !expenses ) {
            return res.send([])
        }

        const envelopeExpenses = Object.values(expenses)
            .map((expense) => expense.toJson())

        res.send(envelopeExpenses)
    })
    .post((req, res) => {
        let expense
        try {
            const {name, description, amount} = req.body
            expense = req.envelope.addExpense(name, description, amount)
        } catch(err) {
            return res.status(400).send(err.message)
        }

        res.status(201).send(expense.toJson())
    })

module.exports = envelopeRouter
