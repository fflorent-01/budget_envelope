const Income = require("./income")
const Envelope = require("./envelope")

const { prettyJson } =require("../utils/utils")

class Budget {
    /*
        Topmost object in the project. Holds income sources and envelopes.
    */
    constructor (incomeSources={}, envelopes={}) {
        this._incomeSources = incomeSources
        this._envelopes = envelopes
        this._income = 0
        this._availableAmount = 0
    }

    get incomeSources () {
        return this._incomeSources
    }
    getIncomeSourceById (incomeId) {
        const incomeSource = this.incomeSources[incomeId]
        return incomeSource
    }
    addIncomeSource (name, description, amount) {
        const newIncomeSource = new Income(this, name, description, amount)
        this._incomeSources[newIncomeSource.id] = newIncomeSource

        this.updateIncome()
        this.updateAvailableAmount()

        return newIncomeSource
    }
    removeIncomeSource (incomeId) {
        delete this.incomeSources[incomeId]

        this.updateIncome()
        this.updateAvailableAmount()
    }

    get envelopes () {
        return this._envelopes
    }
    getEnvelopeById (envelopeId) {
        return this._envelopes[envelopeId]
    }
    addEnvelope (name, description, amount) {

        if ( this.availableAmount < amount ) {
            throw new Error(
                `Amount (${amount} is greater than the available amount (${this.availableAmount}).`
            )
        }

        const newEnvelope = new Envelope(this, name, description, amount)
        this._envelopes[newEnvelope.id] = newEnvelope

        this.updateIncome()
        this.updateAvailableAmount()

        return newEnvelope
    }
    removeEnvelope (envelopeId) {
        delete this.envelopes[envelopeId]

        this.updateAvailableAmount()
    }

    // Not sure this is the best design, but it is simple
    get expenses () {
        // Since this is only intended for API call
        const expenses = []
        for (const envelope of Object.values(this.envelopes)) {
            for (const expense of Object.values(envelope.expenses)) {
                expenses.push(expense.toJson())
            }
        }
        return expenses
    }
    getExpenseById (expenseId) {
        for (const envelope of Object.values(this.envelopes)) {
            const expense = envelope.getExpenseById(expenseId)
            if ( expense ) {
                return expense
            }
        }
    }

    get income () {
        return this._income
    }
    updateIncome () {
        this._income = Object
            .values(this.incomeSources)
            .reduce( (total, source) => total + source._amount, 0 )
    }

    get availableAmount () {
        return this._availableAmount
    }
    updateAvailableAmount () {
        this._availableAmount = this.income - Object
            .values(this.envelopes)
            .reduce( (total, envelope) => total + envelope._amount, 0 )
    }

    toJson (){
        return prettyJson(this)
    }
}

module.exports = Budget
