import {Link, useFetcher} from '@remix-run/react'

function ExpenseListItem({id, title, amount}) {
  const fetcher = useFetcher()

  function deleteExpenseItemHandler() {
    const proceed = confirm('Are you sure? Do you want to delete this item?')
    if (!proceed) return

    // fetcher is used when we want to make a request to the server without a navigation
    fetcher.submit(null, {
      method: 'delete',
      action: `/expenses/${id}`,
    })
  }

  // fetcher is also usefull to know the state of the submition
  if (fetcher.state !== 'idle') {
    return (
      <article className="expense-item locked">
        <p>Deleting...</p>
      </article>
    )
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        {/* <Form method="delete" action={`/expenses/${id}`}>
          <button onClick={deleteExpenseItemHandler}>Delete</button>
        </Form> */}
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  )
}

export default ExpenseListItem
