/* global describe, it */
const assert = require("chai").assert
const Budget = require("../../models/budget")
const Income = require("../../models/income")
const Envelope = require("../../models/envelope")
const createNewBudget = require("../../db/createBudget")

describe("Budget Class", function () {
    
    describe("Budget Class without parameters", function() {

        // Create an empty Budget
        const emptyBudget = new Budget()

        it("is an object", function() {
            assert.isObject(emptyBudget)
        })
        it("incomeSources return an empty object", function() {
            assert.isObject(emptyBudget.incomeSources)
            assert.deepEqual(emptyBudget.incomeSources, {})
        })
        it("envelopes return an empty object", function() {
            assert.isObject(emptyBudget.envelopes)
            assert.deepEqual(emptyBudget.envelopes, {})
        })
        it("income return 0", function() {
            assert.equal(emptyBudget.income, 0)
        })
        it("availableAmount return 0", function() {
            assert.equal(emptyBudget.availableAmount, 0)
        })
        it("getIncomeSourceById('wrongId') returns undefined", function() {
            assert.equal(emptyBudget.getIncomeSourceById("wrongId"), undefined)
        })
        it("getEnvelopeById('wrongId') returns undefined", function() {
            assert.equal(emptyBudget.getEnvelopeById("wrongId"), undefined)
        })
        it("updateIncome() changes income to 0", function() {
            emptyBudget._income = null
            emptyBudget.updateIncome()
            assert.equal(emptyBudget.income, 0)
        })
        it("updateAvailableAmount() changes availableAmount to 0", function() {
            emptyBudget._availableAmount = null
            emptyBudget.updateAvailableAmount()
            assert.equal(emptyBudget.availableAmount, 0)
        })
    })
    
    describe("Income", function () {
        const { budget, sources } = createNewBudget()
        describe("using addIncomeSource()", function() {
            it("return Income instances", function() {
                assert.instanceOf(sources[0], Income)
                assert.instanceOf(sources[1], Income)
                assert.instanceOf(sources[2], Income)
            })
            it("add the new instances to incomeSources", function() {
                assert.deepEqual(budget.incomeSources,  {
                    1: sources[0],
                    2: sources[1],
                    3: sources[2]
                })
            })
            it("correclty triggers updateIncome()", function() {
                assert.equal(budget.income, 6000)
            })
            it("correclty triggers updateAvailableAmount()", function() {
                assert.equal(budget.availableAmount, 2250)
            })
        })
        describe("getIncomeSourceById()", function () {
            it("return the correct Income object", function () {
                assert.deepEqual(budget.getIncomeSourceById("1"), sources[0])
                assert.deepEqual(budget.getIncomeSourceById("2"), sources[1])
                assert.deepEqual(budget.getIncomeSourceById("3"), sources[2])
            })
            it("works with number as well", function () {
                assert.deepEqual(budget.getIncomeSourceById(1), sources[0])
            }) 
        })
        describe("removeIncomeSource()", function () {
            it("delete the rigth Income source", function () {
                // Delete Income with id 2
                budget.removeIncomeSource(2)
                assert.deepEqual(budget.incomeSources,  {
                    1: sources[0],
                    3: sources[2]
                })
            })
            it("correclty updates income", function() {
                assert.strictEqual(budget.income, 4000)
            })
            it("correclty updates availableAmount", function() {
                assert.strictEqual(budget.availableAmount, 250)
            })
        })        
    })

    describe("Envelope", function () {
        const { budget, envelopes } = createNewBudget()
        // This is done in the createNewBudget
        describe("using addEnvelope()", function() {
            it("return Envelope instances", function() {
                assert.instanceOf(envelopes[0], Envelope)
                assert.instanceOf(envelopes[1], Envelope)
                assert.instanceOf(envelopes[2], Envelope)
            })
            it("add the new instances to envelopes", function() {
                assert.deepEqual(budget.envelopes,  {
                    4: envelopes[0],
                    5: envelopes[1],
                    6: envelopes[2]
                })
            })
            it("correclty triggers updateAvailableAmount()", function() {
                assert.equal(budget.availableAmount, 2250)
            })
            it("refuse to create if amount > availableAmount", function () {
                assert.throw(() => budget.addEnvelope("name", "description", 99999), Error)
            })
        })
        describe("getEnvelopeById()", function () {
            it("return the correct Envelope object", function () {
                assert.deepEqual(budget.getEnvelopeById("4"), envelopes[0])
                assert.deepEqual(budget.getEnvelopeById("5"), envelopes[1])
                assert.deepEqual(budget.getEnvelopeById("6"), envelopes[2])
            })
            it("works with number as well", function () {
                assert.deepEqual(budget.getEnvelopeById(4), envelopes[0])
            }) 
        })
        describe("removeEnvelope()", function () {
            it("delete the rigth Envelope", function () {
                // Delete Envelope with id 5
                budget.removeEnvelope(5)
                assert.deepEqual(budget.envelopes,  {
                    4: envelopes[0],
                    6: envelopes[2]
                })
            })
            it("correctly update availableAmount", function () {
                assert.strictEqual(budget.availableAmount, 2750)
            })
        })
    })
})
