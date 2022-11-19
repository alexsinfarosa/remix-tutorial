import Chart from '~/components/expenses/Chart'
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics'
import {json} from '@remix-run/node'
import {getExpenses} from '~/utils/expenses.server'
import {useCatch, useLoaderData} from '@remix-run/react'
import Error from '~/components/util/Error'

export async function loader() {
  const expenses = await getExpenses()
  console.log(expenses)
  if (!expenses || expenses.length === 0) {
    throw json(
      {message: 'Expenses could not be loaded for requested analysis'},
      {status: 404, statusText: 'Expenses not found'},
    )
  }

  return json({expenses})
}

export default function AddExpensesAnalysisPage() {
  const {expenses} = useLoaderData<typeof loader>()
  return (
    <main>
      <Chart expenses={expenses}></Chart>
      <ExpenseStatistics expenses={expenses}></ExpenseStatistics>
    </main>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <main>
      <Error title={caught.statusText}>
        <p>Status: {caught.status}</p>
        <p>{caught.data?.message && 'Something went wrong'}</p>
      </Error>
    </main>
  )
}
