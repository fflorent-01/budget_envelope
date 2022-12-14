const { prettyJson } =require("../utils/utils")

class FinanceElement {
    constructor (parent, name, description, amount) {
        if (new.target === FinanceElement) {
            throw new TypeError(`${new.target} is meant as an abstract class and cannot be directly instanciated.`)
        }
        if (typeof name !== 'string' || name === "") {
            throw new Error(`[${name}] is not a valid name, a string is needed.`)
        }
        if (typeof description !== 'string') {
            throw new Error(`[${description}] is not a valid description, a string is needed.`)
        }
        if (typeof amount !== "number") {
            throw new Error(`Amount (${amount}) is not a valid amount, a number is needed.`)
        } else if ( amount < 0) {
            throw new Error(`Amount (${amount}) must be a positive number.`)
        }
        // I don't like how this is coupled I'll have to find a better design
        if ( !parent.constructor.name === 'Income' ) {
            if ( amount > parent.availableAmount ) {
                throw new Error(
                    `Amount (${amount} is greater than the available amount (${parent.availableAmount}) )`
                    )
            }
        }
        this._parent = parent
        this._parentType = parent.constructor.name
        this._parentId = parent.id || ""
        this._name = name
        this._description = description
        this._amount = amount
    }

    // TODO: parent seems to be problematic
    get parent () {
        return this._parent
    }
    get parentType () {
        return this._parentType
    }
    get parentId () {
        return this._parentId
    }

    get name () {
        return this._name
    }
    set name (name) {
        if (typeof name !== 'string' || name === "") {
            throw new Error(`[${name}] is not a valid name, a string is needed.`)
        }

        this._name = name
    }

    get description () {
        return this._description
    }
    set description (description) {
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

        // I don't like how this is coupled I'll have to find a better design
        const isIncome = this.constructor.name === 'Income'
        if ( !isIncome ) {
            if ( amount > this.parent.availableAmount ) {
                throw new Error(
                    `Amount (${amount} is greater than the available amount (${this.parent.availableAmount}) )`
                    )
            }
        }
        this._amount = amount
        if ( isIncome ) {
            this.parent.updateIncome()
        }
        this.parent.updateAvailableAmount()
     }

    toJson (){
        return prettyJson(this)
    }
}

module.exports = FinanceElement
