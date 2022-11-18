import {useNavigate} from '@remix-run/react'
import ExpensesForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import type {LoaderArgs} from '@remix-run/node'
import {json} from '@remix-run/node'
import {getExpense} from '~/utils/expenses.server'
import invariant from 'tiny-invariant'

export async function loader({params}: LoaderArgs) {
  const expenseId = params.id
  invariant(expenseId, 'ExpenseId not found')

  const expense = await getExpense(Number(expenseId))
  if (!expense) {
    throw new Response('Not Found', {status: 404})
  }

  return json({expense})
}

export default function UpadateExpensePage() {
  const navigate = useNavigate()
  return (
    <Modal onClose={() => navigate('..')}>
      <ExpensesForm></ExpensesForm>
    </Modal>
  )
}
