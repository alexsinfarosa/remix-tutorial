import {Link, Outlet, useLoaderData} from '@remix-run/react'
import {FaDownload, FaPlus} from 'react-icons/fa'
import ExpensesList from '~/components/expenses/ExpensesList'
import {json} from '@remix-run/node'
import {getExpenses} from '~/utils/expenses.server'

export async function loader() {
  const expenses = await getExpenses()
  return json(expenses)
}

export default function ExpensesPage() {
  const expenses = useLoaderData<typeof loader>()
  const isExpenses = expenses && expenses.length !== 0

  return (
    <>
      <Outlet></Outlet>
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus></FaPlus>
            <span>Add Expense</span>
          </Link>
          <a href="/expensese/raw">
            <FaDownload></FaDownload>
            <span>Load Raw Data</span>
          </a>
        </section>
        {isExpenses ? (
          <ExpensesList expenses={expenses}></ExpensesList>
        ) : (
          <section id="no-expenses">
            <h1>No Expenses Found</h1>
            <p>
              Start <Link to="add">adding some </Link>today.
            </p>
          </section>
        )}
      </main>
    </>
  )
}
