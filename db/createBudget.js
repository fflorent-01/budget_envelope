const Budget = require("../models/budget")

// Starting income = 6000
const dummyIncomeSources = [
    ["First Job", "Money from first job", 1000],
    ["Second Job", "Money from second job", 2000],
    ["Third Job", "Money from third job", 3000]
]

// Starting envelopes amount = 3750
const dummyEnvelopes = [
    ["Mortgage", "Paying for the house", 1500],
    ["Food", "All groceries, snacks", 500],
    ["Misc", "Everything else", 1750]
]

// Starting expenses = 1500
const dummyExpenses = [
    ["Spectacle", "2 tickets for mucis concert", 150],
    ["Gadget", "Nouveau gadget pour la cuisine", 350],
    ["Vacances", "Weekend à Québec", 1000]
]

/**
 * Generates a dummy budget for testing puposes
 * @function createNewBudget
 * @private
 * @returns {Object}    Object containing differents info on the dummy budget
 */
const createNewBudget = () => {

    const budget = new Budget()

    const sources = []
    for (let [name, description, amount] of dummyIncomeSources) {
        sources.push(budget.addIncomeSource(name, description, amount))
    }

    const envelopes = []
    for (let [name, description, amount] of dummyEnvelopes) {
        envelopes.push(budget.addEnvelope(name, description, amount))
    }

    // For some reason I choose to add expense to the third envelope
    const envelopeWithExpense = envelopes[2]
    const expenses = []
    for (let [name, description, amount] of dummyExpenses) {
        expenses.push(envelopeWithExpense.addExpense(name, description, amount))
        
    }

    const newbudget = {}
    newbudget.budget = budget
    newbudget.sources = sources
    newbudget.envelopes = envelopes
    newbudget.expenses = expenses

    return newbudget
}

module.exports = createNewBudget
