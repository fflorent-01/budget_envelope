const FinanceElement = require("./finance-element")
const Expense = require("./expense")

let _envelopeCounter = 0

/**
* Represent a budget Envelope. 
* Mainly hold expenses and keep track of available amount.
* @extends FinanceElement
*/
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
            throw new Error(
                `Amount (${amount} is greater than the available amount (${this.availableAmount}).`
            )
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
    
    moveExpenseTo (expense, envelope) {

        if (expense.constructor.name !== "Expense") {
            throw new Error(
                `${expense} is not a valid Expense object`
            )
        }
        if (envelope.constructor.name !== "Envelope") {
            throw new Error(
                `${envelope} is not a valid Envelope object`
            )
        }
        if ( expense.amount > envelope.availableAmount ) {
            throw new Error(
                `The expense you are trying to move has an amont \
                (${expense.amount}) that is greater than the destination envelope \
                available amount (${envelope.availableAmount}).`
            )
        }

        try {
            // Change expense reference to its parent
            expense._parentId = envelope.id
            expense._parent = envelope
            // Add expense to the destination envelope
            envelope._expenses[expense.id] = expense
            envelope.updateAvailableAmount()
            // Remove expense from the original envelope
            delete this._expenses[expense.id]
            this.updateAvailableAmount()
        } catch(err) {
            return err
        }

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
