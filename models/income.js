const FinanceElement = require("./finance-element")

let _incomeCounter = 0

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
