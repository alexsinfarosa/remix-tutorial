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
        <ExpensesList expenses={expenses}></ExpensesList>
      </main>
    </>
  )
}
