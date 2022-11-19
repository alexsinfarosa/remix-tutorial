import {
  Form,
  Link,
  useMatches,
  useActionData,
  useParams,
  useTransition as useNavigation,
} from '@remix-run/react'

export default function ExpenseForm() {
  // const data = useLoaderData()
  const params = useParams()
  const matches = useMatches()
  const expenses = matches.find(m => m.id === 'routes/__app/expenses').data
  const expense = expenses.find(e => e.id === Number(params.id))
  const defaultValues = expense ? expense : {title: '', amount: '', date: ''}

  const errors = useActionData()
  const today = new Date().toISOString().slice(0, 10) // yields something like 2023-09-10

  const navigation = useNavigation()
  const isSubmitting = navigation.state !== 'idle'

  // const submit = useSubmit()
  // // we can submit the form to the server programmatically
  // function handleSubmit(event) {
  //   event.preventDefault()

  //   submit(event.target, {
  //     method: 'POST',
  //   })
  // }

  if (params.id && !expense) {
    return <div>Expense not found</div>
  }

  return (
    <Form
      method={expense ? 'patch' : 'post'}
      className="form"
      id="expense-form"
      // onSubmit={handleSubmit}
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValues.title}
        />
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
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={
              defaultValues.date ? defaultValues.date.slice(0, 10) : ''
            }
          />
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
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save Expense'}
        </button>
        <Link to={'/expenses'}>Cancel</Link>
      </div>
    </Form>
  )
}
