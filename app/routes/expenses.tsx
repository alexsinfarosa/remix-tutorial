import {Outlet} from '@remix-run/react'
import styles from '~/styles/expenses.css'
import ExpensesList from '~/components/expenses/ExpensesList'
import {DUMMIE_DATA} from './expenses.analysis'

export function links() {
  return [{rel: 'stylesheet', href: styles}]
}

export default function ExpensesPage() {
  return (
    <>
      <Outlet></Outlet>
      <main>
        <ExpensesList expenses={DUMMIE_DATA}></ExpensesList>
      </main>
    </>
  )
}
