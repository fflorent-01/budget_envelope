const FinanceElement = require("./finance-element")

_counter = 0

class Income extends FinanceElement {

    constructor (parent, name, description, amount) {
        super(parent, name, description, amount)
        _counter++
        this._id = _counter
    }

    get id () {
        return this._id
    }
}

module.exports = Income