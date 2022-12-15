const FinanceElement = require("./finance-element")

let _incomeCounter = 0

/**
* Represent an income. 
* @extends FinanceElement
*/
class Income extends FinanceElement {

    constructor (parent, name, description, amount) {
        super(parent, name, description, amount)
        _incomeCounter++
        this._id = _incomeCounter
    }

    get id () {
        return this._id
    }

}

module.exports = Income
