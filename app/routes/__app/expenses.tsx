import {Link, Outlet} from '@remix-run/react'
import {FaDownload, FaPlus} from 'react-icons/fa'
import ExpensesList from '~/components/expenses/ExpensesList'
import {DUMMIE_DATA} from './expenses.analysis'

export default function ExpensesPage() {
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
        <ExpensesList expenses={DUMMIE_DATA}></ExpensesList>
      </main>
    </>
  )
}
