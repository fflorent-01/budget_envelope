/*global describe, it, process*/
const expect = require("chai").expect
const request = require("supertest")

const app = require("../../app")
const db = process.db

describe("/api/envelopes routes", function () {
    describe("GET /api/envelopes", function () {
        it("return the correct propreties", function () {
            return request(app)
                .get("/api/envelopes")
                .expect(200)
                .then(response => {
                    for (const envelope of response.body) {
                        expect(envelope).to.haveOwnProperty("id")
                        expect(envelope).to.haveOwnProperty("name")
                        expect(envelope).to.haveOwnProperty("description")
                        expect(envelope).to.haveOwnProperty("amount")
                        expect(envelope).to.haveOwnProperty("availableAmount")
                        expect(envelope).to.haveOwnProperty("expenses")
                    }
                })
        })
        it("return the correct envelopes", function () {
            const envelopes = Object.values(db.toJson()["envelopes"])
            return request(app)
                .get("/api/envelopes")
                .expect(200)
                .then(response => {
                    expect(response.body).to.eql(envelopes)
                })
        })
    })
    describe("POST /api/envelopes", function () {
        it("correct argument create a new envelope and return 201", function () {
            let newEnvelope = {
                "name": "New Envelope",
                "description": "New Description",
                "amount": 200
            }
            return request(app)
                .post("/api/envelopes")
                .send(newEnvelope)
                .expect(201)
                .then(response => {
                    newEnvelope.id = response.body.id
                    expect(response.body).to.deep.include(newEnvelope)
                })
        })
        it("return 400 if argument missing", function () {
            let newEnvelope = {
                "name": "",
                "description": "New Description",
                "amount": "500"
            }
            return request(app)
                .post("/api/envelopes")
                .send(newEnvelope)
                .expect(400)
        })
    })
    describe("GET /api/envelopes/:envelopeId", function () {
        it("return 404 if bad id", function () {
            return request(app)
                .get("/api/envelopes/99999999")
                .expect(404)
        })
        it("return the right envelope and 200", function () {
            const envelope = db.envelopes["3"].toJson()
            return request(app)
                .get("/api/envelopes/3")
                .expect(200)
                .then(response => {
                    expect(response.body).to.deep.include(envelope)
                })
        })
    })
    describe("PUT /api/envelopes/:envelopeId", function () {

        it("return 404 if bad id", function () {
            return request(app)
                .put("/api/envelopes/99999999")
                .expect(404)
        })
        it("return 400 if incorrect amount format", function () {
            const envelope = {
                "name": "Updated name",
                "description": "Updated description",
                "amount": "10000"
            }
            return request(app)
                .put("/api/envelopes/1")
                .send(envelope)
                .expect(400)
        })
        it("return 400 if incorrect amount too high", function () {
            const envelope = {
                "name": "Updated name",
                "description": "Updated description",
                "amount": 10000
            }
            return request(app)
                .put("/api/envelopes/1")
                .send(envelope)
                .expect(400)
        })
        it("return 200 if correct arguments", function () {
            const envelope = {
                "name": "Updated name",
                "description": "Updated description",
                "amount": 100
            }
            return request(app)
                .put("/api/envelopes/1")
                .send(envelope)
                .expect(200)
                .then(response => {
                    expect(response.body).to.deep.include(envelope)
                })
        })
    })
    describe("DELETE api/envelope/:envelopeId", function () {
        it("return 404 if non valid id", function () {
            return request(app)
                .delete("/api/envelopes/9999")
                .expect(404)
        })
        it("return 202 if valid id", function () {
            return request(app)
                .delete("/api/envelopes/1")
                .expect(202)
        })
    })
})
describe("/api/envelopes/:envelopeId/expenses routes", function () {
    describe("GET /api/envelopes/:envelopeId/expenses", function () {
        it("return all expense of envelopeId", function () {
            const envelopeExpenses = Object.values(db.getEnvelopeById(3).expenses)
                .map((expense) => expense.toJson())

            return request(app)
                .get("/api/envelopes/3/expenses")
                .expect(200)
                .then(response => {
                    expect(response.body).to.have.same.deep.members(envelopeExpenses)
                })
        })
        it("return empty for empty Envelope", function () {
            return request(app)
                .get("/api/envelopes/2/expenses")
                .expect(200)
                .then(response => {
                    expect(response.body).to.have.same.deep.members([])
                })
        })
    })
    describe("POST /api/envelopes/:envelopeId/expenses", function () {
        it("add an expense to the correct envelope", function() {
            const newExpense = {
                "name": "New expense",
                "description": "New description",
                "amount": 50
            }
            return request(app)
                .post("/api/envelopes/2/expenses")
                .send(newExpense)
                .expect(201)
                .then(response => {
                    expect(response.body).to.deep.include(newExpense)
                    expect(response.body.parentId).to.eql(2)
                })
        })
        it("refuses amount too big with code 400", function () {
            const newExpense = {
                "name": "New expense",
                "description": "New description",
                "amount": 50000
            }
            return request(app)
                .post("/api/envelopes/2/expenses")
                .send(newExpense)
                .expect(400)
        })
    })
})
