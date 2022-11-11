import Chart from '~/components/expenses/Chart'
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics'

export const DUMMIE_DATA = [
  {
    id: 'e1',
    title: 'First Expense',
    amount: 12.99,
    date: new Date().toISOString(),
  },
  {
    id: 'e2',
    title: 'Second Expense',
    amount: 11.99,
    date: new Date().toISOString(),
  },
]

export default function AddExpensesAnalysisPage() {
  return (
    <main>
      <Chart expenses={DUMMIE_DATA}></Chart>
      <ExpenseStatistics expenses={DUMMIE_DATA}></ExpenseStatistics>
    </main>
  )
}
