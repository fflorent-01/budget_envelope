const assert = require("chai").assert
const Budget = require("../../models/budget")
const createNewBudget = require("../../db/createBudget")

describe("Expense", function () {
    const { budget, envelopes, expenses } = createNewBudget()
    const envelopeWithExpense = envelopes[2]
    const expense = expenses[0]
    describe("get operations", function () {
        it("get parent", function () {
            assert.deepEqual(expense.parent, envelopeWithExpense)
        })
        it("get parentType", function () {
            assert.strictEqual(expense.parentType, "Envelope")
        })
        it("get parentId", function () {
            assert.strictEqual(expense.parentId, envelopeWithExpense.id)
        })
        it("get name", function () {
            assert.strictEqual(expense.name, "Spectacle")
        })
        it("get description", function () {
            assert.strictEqual(expense.description, "2 tickets for mucis concert")
        })
        it("get amount", function () {
            assert.strictEqual(expense.amount, 150)
        })
        it("get id", function () {
            assert.strictEqual(expense.id, expenses[0].id)
        })   
    })
    describe("set operations", function () {
        describe("set name", function () {
            it("set name", function () {
                expense.name = "Concert"
                assert.strictEqual(expense.name, "Concert")
            })
            it("refuse empty string for name", function () {
                assert.throw(() => expense.name = "", Error)
            })
            it("refuse non-string for name", function () {
                assert.throw(() => expense.name = 1, Error)
            })
        })
        describe("set description", function () {
            it("set description", function () {
                expense.description = "2 tickets for rock concert"
                assert.strictEqual(expense.description, "2 tickets for rock concert")
            })
            it("refuse non-string for description", function () {
                assert.throw(() => expense.description = 1, Error)
            })            
        })
        describe("set amount", function () {
            it("set amount", function () {
                expense.amount = 250
                assert.strictEqual(expense.amount, 250)
            })
            it("refuse non-number", function () {
                assert.throw(() => expense.amount = "250", Error)
            })
            it("refuse negative number", function () {
                assert.throw(() => expense.amount = -250, Error)
            })
            it("correctly changes availableAmount", function() {
                assert.strictEqual(envelopeWithExpense.availableAmount, 150)
            })
        })
    })
})