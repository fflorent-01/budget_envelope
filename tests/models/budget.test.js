const assert = require("chai").assert;
const Budget = require("../../models/budget");
const Income = require("../../models/income")

const dummyIncomeSources = [
    [
        "First Job",
        "Money from first job",
        2000
    ],
    [
        "Second Job",
        "Money from second job",
        1500
    ]
]


describe("Budget Class without parameters", function() {
    const budget = new Budget()

    it("is an object", function() {
        assert.isObject(budget)
    })
    it("incomeSources return an empty object", function() {
        assert.isObject(budget.incomeSources)
        assert.deepEqual(budget.incomeSources, {})
    })
    it("envelopes return an empty object", function() {
        assert.isObject(budget.envelopes)
        assert.deepEqual(budget.envelopes, {})
    })
    it("income return 0", function() {
        assert.equal(budget.income, 0)
    })
    it("availableAmount return 0", function() {
        assert.equal(budget.availableAmount, 0)
    })
    it("getIncomeSourceById('id') returns undefined", function() {
        assert.equal(budget.getIncomeSourceById('id'), undefined)
    })
    it("getEnvelopeById('id') returns undefined", function() {
        assert.equal(budget.getEnvelopeById('id'), undefined)
    })
    it("updateIncome() changes income to 0", function() {
        budget._income = 99
        budget.updateIncome()
        assert.equal(budget.income, 0)
    })
    it("updateIncome() changes income to 0", function() {
        budget._income = 99
        budget.updateIncome()
        assert.equal(budget.income, 0)
    })
    it("updateAvailableAmount() changes availableAmount to 0", function() {
        budget._availableAmount = 99
        budget.updateAvailableAmount()
        assert.equal(budget.availableAmount, 0)
    })
})

describe("Using addIncomeSource()", function() {
    const budget = new Budget()
    const firstCase = dummyIncomeSources.shift()
    let [name, description, amount] = firstCase
    const source = budget.addIncomeSource(name, description, amount)
    it("return a Income instance", function() {
        assert.instanceOf(source, Income)
    })
    it("add the new instance to incomeSources", function() {
        assert.deepEqual(budget.incomeSources,  {1: source})
    })
})

