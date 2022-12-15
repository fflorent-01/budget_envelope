# budget_envelope

Personal Budget app project from Code Academy backend engineer career path

Note:
- my first 'big' project using js
- my first project using unit testing (any language)

Aim of the exercise: 
- practice setting up API endpoint

Self-added aim: 
- explore class dependency and relations
- explore unit testing

Known limitation:
- using an actual db or using fixed data structure would have been more efficient
- I over tested and was not consistent in using TDD
- Tests could have a better design

Deploy API endpoints to allow:

- Budget / income:
  - /api/budget:
    - get => return ALL budget info : income, available income, income sources, envelopes
    - post => add an income source
  - /api/budget/income
    - get => return all income sources
  - /api/budget/:incomeSourceId
    - get => return name, description, amount of an income source
    - put => overwrite income source properties (name, description, amount)
    - delete => delete an income source

- Envelope / Expense
  - /api/envelopes:
    - get => return ALL envelope infos: name, description, amount, available amount, expenses
    - post => add an envelope
  - /api/envelopes/:envelopeId
    - get => return name, description, amount, available amount, expenses of an envelope
    - put => overwrite an envelope properties (name, description, amount)
    - delete => delete an envelope
  - /api/envelopes/:envelopeId/expenses:
    - get => return ALL expenses for an envelope
    - post => add an expense to an envelope

- Expense
  - /api/epxpenses:
    - get => return ALL expenses
  - /api/expenses/:expenseId
    - get => return name, description, amount of specified envelope
    - put => overwrite expense properties (name, description, amount)
  - /api/expenses/:expenseId
    - get => return name, description, amount
    - put => overwrite an expense (name, description, amount)
    - delete => delete an expense
    - post => transfers current expense to specified envelope
