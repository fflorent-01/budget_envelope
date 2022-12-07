class FinanceElement {
    constructor (parent, name, description, amount) {
        if (new.target === FinanceElement) {
            throw new TypeError(`${new.target} is meant as an abstract class and cannot be directly instanciated.`)
        }
        this._parent = parent
        this._name = name
        this._description = description
        this._amount = amount
    }

    // TODO: parent seems to be problematic
    get parent () {
        return this._parent
    }

    get name () {
        return this._name
    }
    set (name) {
        if (typeof name !== 'string' || name === "") {
            throw new Error(`[${name}] is not a valid name, a string is needed.`)
        }

        this._name = name
    }

    get description () {
        return this._description
    }
    set (description) {
        if (typeof description !== 'string') {
            throw new Error(`[${description}] is not a valid description, a string is needed.`)
        }

        this._description = description
    }

    get amount () {
        return this._amount
    }
    set amount (amount) {
        if (typeof amount !== "number") {
            throw new Error(`Amount (${amount}) is not a valid amount, a number is needed.`)
        } else if ( amount < 0) {
            throw new Error(`Amount (${amount}) must be a positive number.`)
        }

        this._amount = amount
        this.parent.updateAvailableAmount()
    }
}

module.exports = FinanceElement
