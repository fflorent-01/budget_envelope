// TODO: Check the json export
const FinanceElement = require("./finance-element")
const Expense = require("./expense")

let _envelopeCounter = 0

class Envelope extends FinanceElement {

    constructor (parent, name, description, amount) {
        super(parent, name, description, amount)
        _envelopeCounter++
        this._id = _envelopeCounter
        this._expenses = {}
        this._availableAmount = amount
    }

    get id () {
        return this._id
    }

    get expenses () {
        return this._expenses
    }
    getExpenseById (expenseId) {
        return this._expenses[expenseId]
    }
    addExpense (name, description, amount) {


        if ( this.availableAmount < amount ) {
            throw new Error(`Amount (${amount} is greater than the available amount (${this.availableAmount}) )`)
        }

        const newExpense = new Expense(this, name, description, amount)
        this._expenses[newExpense.id] = newExpense

        this.updateAvailableAmount()

        return newExpense
    }
    removeExpense (expenseId) {
        delete this._expenses[expenseId]
        
        this.updateAvailableAmount()
    }

    get availableAmount () {
        return this._availableAmount
    }
    updateAvailableAmount () {
        this._availableAmount = this.amount - Object
            .values(this.expenses)
            .reduce( (total, expense) => total + expense.amount, 0 )
    }
}

module.exports = Envelope