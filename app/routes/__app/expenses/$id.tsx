import {useNavigate} from '@remix-run/react'
import ExpensesForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'

export default function UpadateExpensePage() {
  const navigate = useNavigate()
  return (
    <Modal onClose={() => navigate('..')}>
      <ExpensesForm></ExpensesForm>
    </Modal>
  )
}
