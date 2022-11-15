import type {ActionArgs} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {useNavigate} from '@remix-run/react'
import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import {addExpense} from '~/utils/expenses.server'
import {validateExpenseInput} from '~/utils/validation.server'

export async function action({request}: ActionArgs) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    validateExpenseInput(data)
  } catch (error) {
    return error
  }
  await addExpense(data)
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
