
// TODO: Check the json export
const Income = require("./income")
const Envelope = require("./envelope")

const { prettyJson } =require("../utils")

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

    get income () {
        return this._income
    }
    updateIncome () {
        this._income = Object
            .values(this.incomeSources)
            .reduce( (total, source) => total + source._amount || 0, 0 );
    }

    get availableAmount () {
        return this._availableAmount
    }
    updateAvailableAmount () {
        this._availableAmount = this.income - Object
            .values(this.envelopes)
            .reduce( (total, envelope) => total + envelope._amount || 0, 0 )
    }

    toJson (){
        return prettyJson(this)
    }
}

module.exports = Budget
