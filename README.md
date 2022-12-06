# budget_envelope

Personal Budget app project from Code Academy backend engineer career path

Plan:
- Use class based object to monitor:
  - Budget  **This will act as the main interface**
    - _incomeSources => Object {'incomeId': Income, ...}]
      - getIncomeSources() => return  this._incomeSources
      - getIncomeSourceById('incomeId') => return specific Income object
      - addIncomeSource(name, descritption, amount) => return new created Income object
        - Must trigger this.updateIncome()
        - Must trigger this.updateAvailableIncome()
      - removeIncomeSource("incomeId") => Delete a specific Income
        - Must trigger this.updateIncome()
        - Must trigger this.updateAvailableIncome()
    - _envelopes => Object {'EnvelopeID': Envelope, ...}
      - getEnvelopes() => return  this._envelopes
      - getEnvelopeById('envelopeId') => return specific Envelope object
      - addEnvelopes(name, descritption, amount) => return new created Envelope object
        - Must trigger this.updateAvailableIncome()
      - removeEnvelope('envelopeId') => Delete a specific Envelope
        - Must trigger this.updateAvailableIncome()
    - _income => Number - **Needs special care to stay up to date** ???
      - getIncome() => return  this._income
      - updateIncome() => set this._income based on Object.values(this.getIncomeSources()).reduce( (total, source) => total + source.amount, 0 )
    - _availableIncome => Number **Needs special care to stay up to date** ???
      - getAvailableIncome() => return this._availableIncome
      - updateAvailableIncome() =>  set this._availableIncome based on this.getIncome() - Object.values(this.getEnvelopes()).reduce( (total, envelope) => total + envelope.amount, 0 )

  - Transaction => **Kind of an abstract class**
    -  if (new.target === Abstract) {
        throw new TypeError("Cannot construct Abstract instances directly");
      } in constructor
    - _name => String
      - getName()
      - setName('name')
    - _description => String
      - getDescription()
      - setDescription('description')
    - _amount => Number
      - getAmount()
      - setAmount(amount)
    - _parent => class instance  ***Bad for coupling but I don't see how else to do it***
      - getParent() => return parent instance class 

  - Income(Transaction)
    - _counter => To give a uniqueID
      - use _counter++ in constructor
    - setAmount(amount)
      - ***Must trigger [budget].updateIncome()***
      - ***Must trigger [budget].updateAvailableIncome()***

  - Expense(Transaction)
    - _counter => To give a uniqueID
      - use _counter++ in constructor
    - setAmount(amount)
      - ***Must trigger [envelope].updateAvailableAmount()***

  - Envelope(Transaction)
    - _counter => To give a uniqueID
      - use _counter++ in constructor
    - _expenses => Object {'ExpenseID': Expense}
      - getExpenses() => return  this._expenses
      - getExpenseById('expenseId') => return specific Expense object
      - addExpense(name, descritption, amount) => return new created Expense object
        - Must trigger this.updateAvailableAmount()
      - removeExpense('expenseId') => Delete a specific Expense
        - Must trigger this.updateAvailableAmount()
    - _availableAmount => Number **Needs special care to stay up to date** ???
      - getAvailableAmount()  => return this._availableAmount
      - updateAvailableAmount()  =>  set this._availableAmount based on this.getAmount() - Object.values(this.getExpenses()).reduce( (total, expense) => total + expense.amount, 0 )

- Use ObserverPattern to monitor changes and keep everything coherent ???
  - Listen:
    - on('expense_amount_change') // Must be lower/equal to parent availableAmount
    - on('envelope_amount_change') // Must be lower/equal to parent availableAmount
  - Calulate updateIncome() whenever an envelope Available amount change
  - Calculate updateAvailableIncome() whenever an expense get modified

- Deploy API endpoints to allow:
  - /budget:
    - get => return ALL income, availableIncome, getIncomeSources, getEnvelopes
    - post => add an income source
  - /budget/:incomeSourceId
    - get => return name, description, amount of an income source
    - put => overwrite an income source 
    - delete => delete an income source
  - /envelopes:
    - get => return ALL name, description, amount, availableAmount, getExpenses
    - post => add an envelope
  - /envelopes/:envelopeID
    - get => return name, description, amount, availableAmount, getExpenses of an envelope
    - put => overwrite an envelope
    - delete => delete an envelope
  - /expense:
    - get => return ALL name, description, amount
  - /expense/:envelopeId
    - get => => return  ALL name, description, amount of specified envelope
    - post => create new expense in associated envelope
  - /expense/:expenseId
    - get => return name, description, amount
    - put => overwrite an expense
    - delete => delete an expense
  - /expense/:expenseId/:envelopeId
    - post => transfers current expense to specified envelope
