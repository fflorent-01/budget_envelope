// TODO: Integrate the Expense model
const assert = require("chai").assert;
const Budget = require("../../models/budget");

const dummyIncomeSources = [
    [
        "First Job",
        "Money from first job",
        1000
    ],
    [
        "Second Job",
        "Money from second job",
        2000
    ],
    [
        "Third Job",
        "Money from third job",
        3000
    ]
]

const dummyEnvelopes = [
    [
        "Mortgage",
        "Paying for the house",
        1500
    ],
    [
        "Food",
        "All groceries, snacks",
        1000
    ],
    [
        "Misc",
        "Everything else",
        1250
    ]
]

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

    const newbudget = {}
    newbudget.budget = budget
    newbudget.sources = sources
    newbudget.envelopes = envelopes

    return newbudget
}

describe("Envelope", function () {
    const { budget, envelopes } = createNewBudget()
    const envelope = envelopes[0]
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
        it('set amount', function () {
            envelope.amount = 2000
            assert.strictEqual(envelope.amount, 2000)
        })
        it('refuse non-number', function () {
            assert.throw(() => envelope.amount = "2000", Error)
        })
        it('refuse negative number', function () {
            assert.throw(() => envelope.amount = -2000, Error)
        })

        it("correctly changes availableAmount", function() {
            assert.strictEqual(budget.availableAmount, 1750)
        })        
    })
})
    