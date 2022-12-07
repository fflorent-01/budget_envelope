
const Income = require("./income")


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

    get incomeSources() {
        return this._incomeSources
    }
    addIncomeSource(name, description, amount) {
        if ( typeof name !== 'string' || name === "" ) {
            throw new Error(`name: [${name}] must be a non-empty string.`)
        } else if (typeof description !== 'string') {
            throw new Error(`description: [${description}] must be a string.`)
        } else if (typeof amount !== 'number') {
            throw new Error(`amount: [${amount}] must be a number.`)
        } else if ( amount < 0 ) {
            throw new Error(`amount: [${amount}] must be a positive number.`)
        }

        const newIncomeSource = new Income(this, name, description, amount)
        this._incomeSources[newIncomeSource.id] = newIncomeSource
        // income and available amount need to be recalculated when adding.
        this.updateIncome()
        this.updateAvailableAmount()
        return newIncomeSource
    }
    getIncomeSourceById(incomeId) {
        const incomeSource = this.incomeSources.incomeId
        return incomeSource
    }

    get envelopes() {
        return this._envelopes
    }
    getEnvelopeById(incomeId) {
        const incomeSource = this.incomeSources.incomeId
        return incomeSource
    }

    get income () {
        return this._income
    }
    updateIncome () {
        this._income = Object
            .values(this.incomeSources)
            .reduce( (total, source) => total + source.amount, 0 );
    }

    get availableAmount () {
        return this._availableAmount
    }

    updateAvailableAmount () {
        this._availableAmount = this.income - Object
            .values(this.envelopes)
            .reduce( (total, envelope) => total + envelope.amount, 0 )
    }   
}

module.exports = Budget
