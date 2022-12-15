// TODO: Check the json export
const FinanceElement = require("./finance-element")

let _expenseCounter = 0

/**
* Represent an expense. 
* @extends FinanceElement
*/
class Expense extends FinanceElement {

    constructor (parent, name, description, amount) {
        super(parent, name, description, amount)
        _expenseCounter++
        this._id = _expenseCounter
    }

    get id () {
        return this._id
    }

}

module.exports = Expense