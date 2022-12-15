/* global describe, it */
const assert = require("chai").assert
const createNewBudget = require("../../db/createBudget")

describe("Envelope", function () {
    const { budget, envelopes, expenses } = createNewBudget()
    const envelope = envelopes[0]
    const envelopeWithExpense = envelopes[2]
    describe("get operations", function () {
        it("get parent", function () {
            assert.deepEqual(envelope.parent, budget)
        })
        it("get parentType", function () {
            assert.strictEqual(envelope.parentType, "Budget")
        })
        it("get parentId", function () {
            assert.strictEqual(envelope.parentId, "")
        })
        it("get name", function () {
            assert.strictEqual(envelope.name, "Mortgage")
        })
        it("get description", function () {
            assert.strictEqual(envelope.description, "Paying for the house")
        })
        it("get amount", function () {
            assert.strictEqual(envelope.amount, 1500)
        })
        it("get id", function () {
            assert.strictEqual(envelope.id, envelopes[0].id)
        })
        it("get expenses", function () {
            assert.deepEqual(envelopeWithExpense.expenses, {
                7: expenses[0],
                8: expenses[1],
                9: expenses[2]
            })
        })
        it("get getExpenseById", function () {
            assert.deepEqual(envelopeWithExpense.getExpenseById("8"), expenses[1])
        })
        it("get availableAmount", function () {
            assert.strictEqual(envelopeWithExpense.availableAmount, 250)
        })
    })
    describe("set name" , function () {
        it("set name", function () {
            envelope.name = "Mortgage payment"
            assert.strictEqual(envelope.name, "Mortgage payment")
        })
        it("refuse empty string for name", function () {
            assert.throw(() => envelope.name = "", Error)
        })
        it("refuse non-string for name", function () {
            assert.throw(() => envelope.name = 1, Error)
        })
    })
    describe("set description", function () {
        it("set description", function () {
            envelope.description = "Monthly payment for the house"
            assert.strictEqual(envelope.description, "Monthly payment for the house")
        })
        it("refuse non-string for description", function () {
            assert.throw(() => envelope.description = 1, Error)
        })
    })
    describe("set amount" , function () {
        it("set amount", function () {
            envelope.amount = 2000
            assert.strictEqual(envelope.amount, 2000)
        })
        it("refuse non-number", function () {
            assert.throw(() => envelope.amount = "2000", Error)
        })
        it("refuse negative number", function () {
            assert.throw(() => envelope.amount = -2000, Error)
        })
        it("refuse if amount > availableAmount", function () {
            assert.throw(() => envelope.amount = 999999, Error)
        })
        it("correctly changes availableAmount", function() {
            assert.strictEqual(budget.availableAmount, 1750)
        })        
    })
    describe("removeExpense", function () {
        it("removes the rigth envelope", function() {
            envelopeWithExpense.removeExpense(8)
            assert.deepEqual(envelopeWithExpense.expenses, {
                7: expenses[0],
                9: expenses[2]
            })
        })
        it("correctly update availableAmount", function () {
            assert.strictEqual(envelopeWithExpense.availableAmount, 600)
        })
    })
})
