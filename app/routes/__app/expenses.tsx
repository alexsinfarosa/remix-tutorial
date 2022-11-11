import {Outlet} from '@remix-run/react'
import ExpensesList from '~/components/expenses/ExpensesList'
import {DUMMIE_DATA} from './expenses.analysis'

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
