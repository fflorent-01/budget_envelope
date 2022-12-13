const expect = require("chai").expect;
const request = require("supertest");
const { response } = require("../../app");

const app = require("../../app");
const db = process.db


describe("/api/budget routes", function () {
    describe("GET /api/budget", function () {
        it("return the whole budget", function () {
            return request(app)
                .get("/api/budget")
                .expect(200)
                .then((response) => {
                    expect(response.body).to.haveOwnProperty("incomeSources")
                    expect(response.body).to.haveOwnProperty("envelopes")
                    expect(response.body).to.haveOwnProperty("income")
                    expect(response.body).to.haveOwnProperty("availableAmount")
                })
        })
        it("return the correct number of income sources and attribute", function () {
            return request(app)
                .get("/api/budget")
                .expect(200)
                .then((response) => {
                    const source_length = Object.keys(db.incomeSources).length
                    const body_length = Object.keys(response.body.incomeSources).length
                    expect(body_length).to.be.equal(source_length)
                    Object.values(response.body.incomeSources).forEach((source) => {
                        expect(source).to.haveOwnProperty("id")
                        expect(source).to.haveOwnProperty("name")
                        expect(source).to.haveOwnProperty("description")
                        expect(source).to.haveOwnProperty("amount")
                    });
                })
        })
        it("return the correct number of envelopes and attributes", function () {
            return request(app)
                .get("/api/budget")
                .expect(200)
                .then((response) => {
                    const source_length = Object.keys(db.envelopes).length
                    const body_length = Object.keys(response.body.envelopes).length
                    expect(body_length).to.be.equal(source_length)
                    Object.values(response.body.envelopes).forEach((envelope) => {
                        expect(envelope).to.haveOwnProperty("id")
                        expect(envelope).to.haveOwnProperty("name")
                        expect(envelope).to.haveOwnProperty("description")
                        expect(envelope).to.haveOwnProperty("amount")
                        expect(envelope).to.haveOwnProperty("expenses")
                        expect(envelope).to.haveOwnProperty("availableAmount")
                    });
                })
        })
        it("return the correct number of expense and attributes for each envelopes", function () {
            return request(app)
                .get("/api/budget")
                .expect(200)
                .then((response) => {
                    for (const [key, value] of Object.entries(db.envelopes)) {
                        const source_length = Object.keys(value.expenses).length
                        const body_length = Object.keys(response.body.envelopes[key].expenses).length
                        expect(body_length).to.be.equal(source_length)
                        Object.values(response.body.envelopes[key].expenses).forEach((expense) => {
                         expect(expense).to.haveOwnProperty("id")
                         expect(expense).to.haveOwnProperty("parentId")
                         expect(expense).to.haveOwnProperty("name")
                         expect(expense).to.haveOwnProperty("description")
                         expect(expense).to.haveOwnProperty("amount")
                        });
                    }
                })
        })
        it("return the correct income", function () {
            return request(app)
                .get("/api/budget")
                .expect(200)
                .then((response) => {
                    expect(response.body.income).to.be.equal(db.income)
                })
        })
        it("return the correct availableAmount", function () {
            return request(app)
                .get("/api/budget")
                .expect(200)
                .then((response) => {
                    expect(response.body.availableAmount).to.be.equal(db.availableAmount)
                })
        })
    })
    describe("POST /api/budget", function () {
        it("using correct arguments should return 201", function (done){
            const newIncomeSource = {
                "name": "New Income Source",
                "description": "New Income Source Description",
                "amount": 100
            }
            return request(app)
                .post("/api/budget")
                .send(newIncomeSource)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err)
                    newIncomeSource.id = res.body.id
                    expect(res.body).to.be.deep.equal(newIncomeSource)
                }, done())
        })
        it("omiting name should return 400", function () {
            const newIncomeSource = {
                "description": "New Income Source Description",
                "amount": 100
            }
            return request(app)
                .post("/api/budget")
                .send(newIncomeSource)
                .expect(400)
        })
        it("omiting amount should return 400", function () {
            const newIncomeSource = {
                "name": "New Income Source",
                "description": "New Income Source Description"
            }
            return request(app)
                .post("/api/budget")
                .send(newIncomeSource)
                .expect(400)
        })
    })
    describe("GET /api/budget/income", function () {
        it("return the correct incomes sources", function () {
            let budget
            return request(app)
                .get("/api/budget")
                .then(response => {budget = response.body})
                .then(() => {
                    return request(app)
                    .get("/api/budget/income")
                })
                .then(response => {
                    expect(response.body).to.deep.equal(Object.values(budget.incomeSources))
                    expect(response.status).to.be.equal(200)
                })
            })
    })
    describe("GET /api/budget/:incomeSourceId", function () {
        it("return correct object if valid id", function () {
            let budget
            return request(app)
                .get("/api/budget")
                .then(response => {budget = response.body})
                .then(() => {
                    return request(app)
                    .get("/api/budget/1")
                })
                .then(response => {
                    expect(response.body).to.deep.equal(budget.incomeSources['1'])
                    expect(response.status).to.be.equal(200)
                })
        })
        it("return 404 if invalid id", function() {
            return request(app)
                .get("/api/budget/9999999")
                .expect(404)
        })
    })
    describe("PUT /api/budget/:incomeSourceId", function () {
        it("retrun 400 if none of the parameters present", function () {
            const source = {"noneOfTheArgument": "Not valid"}
            return request(app)
                .put("/api/budget/1")
                .send(source)
                .expect(400)
        })
        it("correclty update all parameters", function () {
            const source = {
                "name": "Updated name",
                "description": "Updated description",
                "amount": 22
            }
            return request(app)
                .put("/api/budget/1")
                .send(source)
                .then(response => {
                    expect(response.body).to.deep.include(source)
                    expect(response.status).to.be.equal(200)
                })                   
        })
        it("correclty update name", function () {
            const source = {
                "name": "Updated name only"
            }
            return request(app)
                .put("/api/budget/1")
                .send(source)
                .then(response => {
                    expect(response.body).to.deep.include(source)
                    expect(response.status).to.be.equal(200)
                })                   
        })
        it("correclty update description", function () {
            const source = {
                "description": ""
            }
            return request(app)
                .put("/api/budget/1")
                .send(source)
                .then(response => {
                    expect(response.body).to.deep.include(source)
                    expect(response.status).to.be.equal(200)
                })                   
        })
        it("correclty update amount", function () {
            const source = {
                "amount": 66
            }
            return request(app)
                .put("/api/budget/1")
                .send(source)
                .then(response => {
                    expect(response.body).to.deep.include(source)
                    expect(response.status).to.be.equal(200)
                })                   
        })
    })
    describe("DELETE /api/budget/:incomeSourceId", function () {
        it("return 404 if invalid id", function() {
            return request(app)
                .delete("/api/budget/9999999")
                .expect(404)
        })
        it("correctly remove correct income source", function () {
            let incomeSources, removedSource
            return request(app)
                .get("/api/budget/income")
                .then(response => {
                    incomeSources = response.body
                    removedSource = incomeSources[1]
                })
                .then(() => {
                    return request(app)
                        .delete(`/api/budget/${removedSource.id}`)
                        .then(response => {
                            expect(response.body).to.not.deep.include(removedSource)
                            expect(response.status).to.be.equal(202)
                        })
                })
        })
    })
})
