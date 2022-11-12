import {useNavigate} from '@remix-run/react'
import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import type {ActionArgs} from '@remix-run/node'
import {redirect} from '@remix-run/node'

export async function action({request}: ActionArgs) {
  const formData = await request.formData()
  console.log(formData)
  return redirect(``)
}

export default function AddExpensesPage() {
  const navigate = useNavigate()
  return (
    <Modal onClose={() => navigate('..')}>
      <ExpenseForm></ExpenseForm>
    </Modal>
  )
}
