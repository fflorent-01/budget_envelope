// TODO: Check the json export
// TODO: Integrate the Expense model
const FinanceElement = require("./finance-element")

_envelopeCounter = 0

class Envelope extends FinanceElement {

    constructor (parent, name, description, amount) {
        super(parent, name, description, amount)
        _envelopeCounter++
        this._id = _envelopeCounter
    }

    get id () {
        return this._id
    }

}

module.exports = Envelope