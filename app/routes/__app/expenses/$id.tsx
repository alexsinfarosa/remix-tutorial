import {Expense} from '@prisma/client'
import type {ActionArgs} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {useNavigate} from '@remix-run/react'
import invariant from 'tiny-invariant'
import ExpensesForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import {deleteExpense, updateExpense} from '~/utils/expenses.server'
import {validateExpenseInput} from '~/utils/validation.server'

// export async function loader({params}: LoaderArgs) {
//   const expenseId = params.id
//   invariant(expenseId, 'ExpenseId not found')

//   const expense = await getExpense(Number(expenseId))
//   if (!expense) {
//     throw new Response('Not Found', {status: 404})
//   }

//   return json({expense})
// }

export async function action({params, request}: ActionArgs) {
  const expenseId = params.id
  invariant(expenseId, 'ExpenseId not found')

  if (request.method === 'PATCH') {
    const formData = await request.formData()
    const title = formData.get('title') as string
    const amount = formData.get('amount') as string
    const date = formData.get('date') as string

    const note: Pick<Expense, 'id' | 'title' | 'amount' | 'date'> = {
      id: +expenseId,
      title,
      amount: +amount,
      date: new Date(date),
    }

    try {
      validateExpenseInput({title, amount, date})
    } catch (error) {
      return error
    }
    await updateExpense(note)
    return redirect(`/expenses`)
  }

  if (request.method === 'DELETE') {
    await deleteExpense(Number(expenseId))
    return redirect(`/expenses`)
  }
}

export default function UpadateExpensePage() {
  const navigate = useNavigate()
  return (
    <Modal onClose={() => navigate('..')}>
      <ExpensesForm></ExpensesForm>
    </Modal>
  )
}
