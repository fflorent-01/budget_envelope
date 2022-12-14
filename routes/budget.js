/* global process */
const Router = require("express").Router
const db = process.db

const budgetRouter = Router()

budgetRouter.route("/")
    .get( (req, res) => {
        res.send(db.toJson())
    })
    .post( (req, res) => {

        const {name, description, amount} = req.body
        let newIncomeSource

        try {
            newIncomeSource = db.addIncomeSource(name, description, amount)
        } catch (err) {
            return res.status(400).send(err.message)
        }

        if ( !newIncomeSource ) {
            return res.sendStatus(500)
        }

        return res.status(201).send(newIncomeSource.toJson())
    })

budgetRouter.param("incomeSourceId", (req, res, next, id) => {
    const incomeSource = db.getIncomeSourceById(id)
    if ( !incomeSource ) {
        return res.sendStatus(404)
    }
    req.incomeSource = incomeSource
    next()
})

budgetRouter.route("/income")
    .get( (req, res) => {
        res.send(Object.values(db.toJson()["incomeSources"]))
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
            return res.status(500).send(err.message)
        }

        res.send(req.incomeSource.toJson())
    })
    .delete( (req, res) => {
        try {
            db.removeIncomeSource(req.incomeSource.id)
        } catch (err) {
            return res.status(500).send(err.message)
        }
        res.sendStatus(202)
    })

module.exports = budgetRouter
