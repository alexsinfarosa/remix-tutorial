import type {ActionArgs} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {useNavigate} from '@remix-run/react'
import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import {addExpense} from '~/utils/expenses.server'
import {validateExpenseInput} from '~/utils/validation.server'
import type {Expense} from '@prisma/client'

export async function action({request}: ActionArgs) {
  const formData = await request.formData()
  // const data = Object.fromEntries(formData) as Expense
  const title = formData.get('title') as string
  const amount = formData.get('amount') as string
  const date = formData.get('date') as string

  const note: Pick<Expense, 'title' | 'amount' | 'date'> = {
    title,
    amount: +amount,
    date: new Date(date),
  }

  try {
    validateExpenseInput({title, amount, date})
  } catch (error) {
    return error
  }
  await addExpense(note)
  return redirect(`/expenses`)
}

export default function AddExpensesPage() {
  const navigate = useNavigate()
  return (
    <Modal onClose={() => navigate('..')}>
      <ExpenseForm></ExpenseForm>
    </Modal>
  )
}
