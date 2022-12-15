/* global describe, it */
const assert = require("chai").assert
const createNewBudget = require("../../db/createBudget")

describe("Income", function () {
    const { budget, sources } = createNewBudget()
    const incomeSource = sources[0]
    describe("get operations", function () {
        it("get parent", function () {
            assert.deepEqual(incomeSource.parent, budget)
        })
        it("get parentType", function () {
            assert.strictEqual(incomeSource.parentType, "Budget")
        })
        it("get parentId", function () {
            assert.strictEqual(incomeSource.parentId, "")
        })
        it("get name", function () {
            assert.strictEqual(incomeSource.name, "First Job")
        })
        it("get description", function () {
            assert.strictEqual(incomeSource.description, "Money from first job")
        })
        it("get amount", function () {
            assert.strictEqual(incomeSource.amount, 1000)
        })
        it("get id", function () {
            assert.strictEqual(incomeSource.id, sources[0].id)
        })        
    })

    describe("set operations", function () {
        describe("set name", function () {
            it("set name", function () {
                incomeSource.name = "First Income"
                assert.strictEqual(incomeSource.name, "First Income")
            })
            it("refuse empty string for name", function () {
                assert.throw(() => incomeSource.name = "", Error)
            })
            it("refuse non-string for name", function () {
                assert.throw(() => incomeSource.name = 1, Error)
            })
        })
        describe("set description", function () {
            it("set description", function () {
                incomeSource.description = "Money from first source"
                assert.strictEqual(incomeSource.description, "Money from first source")
            })
            it("refuse non-string for description", function () {
                assert.throw(() => incomeSource.description = 1, Error)
            })            
        })
        describe("set amount", function () {
            it("set amount", function () {
                incomeSource.amount = 4000
                assert.strictEqual(incomeSource.amount, 4000)
            })
            it("refuse non-number", function () {
                assert.throw(() => incomeSource.amount = "4000", Error)
            })
            it("refuse negative number", function () {
                assert.throw(() => incomeSource.amount = -4000, Error)
            })
            it("correctly changes income on parent budget", function() {
                assert.strictEqual(budget.income, 9000)
            })
            it("correctly changes availableAmount", function() {
                assert.strictEqual(budget.availableAmount, 5250)
            })
        })
    })
})
    