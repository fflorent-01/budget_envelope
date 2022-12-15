/*global describe, it, process*/
const expect = require("chai").expect
const request = require("supertest")

const app = require("../../app")
const db = process.db

describe("/api/expenses routes", function () {
    describe("GET /api/epxpenses", function () {
        it("retrieve all expense objects", function () {
            return request(app)
                .get("/api/expenses")
                .expect(200)
                .then(response => {
                    if ( response.status === 500 ) {
                        console.log(response.text)
                    }
                    expect(response.body).to.have.same.deep.members(db.expenses)
                })
        })
    })  
})
describe("/api/expenses/:expenseId", function () {
    describe("GET /api/expenses/:expenseId", function () {
        it("return 200 and correct value if valid id", function () {
            return request(app)
                .get("/api/expenses/1")
                .expect(200)
                .then(response => {
                    expect([response.body]).to.have.same.deep.members([db.getExpenseById(1).toJson()])
                })
        })
    })
    describe("PUT /api/expenses/:expenseId", function () {
        it("correctly modifies an expenseId", function () {
            const modifiedExpense = {
                "name": "Modified Expense",
                "description": "Modified description",
                "amount": 44
            }
            return request(app)
                .put("/api/expenses/2")
                .send(modifiedExpense)
                .expect(200)
                .then(response => {
                    expect(response.body).to.deep.include(modifiedExpense)
                })
        })
        it("refuse to modify if amount too great", function () {
            const modifiedExpense = {
                "name": "Modified Expense",
                "description": "Modified description",
                "amount": 444444
            }
            return request(app)
                .put("/api/expenses/2")
                .send(modifiedExpense)
                .expect(400)
        })
    })
    describe("DELETE /api/expenses/:expenseId", function () {
        it("removes the expense", function () {
            return request(app)
                .delete("/api/expenses/2")
                .expect(204)
                .then(() => {
                    return request(app)
                        .get("/api/expenses/2")
                        .expect(404)
                })
        })
        it("return 404 on invaid id", function () {
            return request(app)
                .delete("/api/expenses/999")
                .expect(404)
        })
    })
    describe("POST /api/expenses/:expenseId", function () {
        it("move the expense to another envelope", function () {
            const requetsMoveTo = {
                "moveTo": 2
            }
            return request(app)
                .post("/api/expenses/1")
                .send(requetsMoveTo)
                .expect(200)
                .then(response => {
                    expect(response.body.movedTo).to.eql(2)
                })
        })
    })
})

