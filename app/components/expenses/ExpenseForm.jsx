import {Link, useActionData, useSubmit} from '@remix-run/react'

export default function ExpenseForm() {
  const errors = useActionData()
  const today = new Date().toISOString().slice(0, 10) // yields something like 2023-09-10

  const submit = useSubmit()
  // we can submit the form to the server programmatically
  function handleSubmit(event) {
    event.preventDefault()

    submit(event.target, {
      method: 'POST',
    })
  }

  return (
    <form
      method="post"
      className="form"
      id="expense-form"
      onSubmit={handleSubmit}
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" required maxLength={30} />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" max={today} required />
        </p>
      </div>
      {errors && (
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button>Save Expense</button>
        <Link to={'/expenses'}>Cancel</Link>
      </div>
    </form>
  )
}
