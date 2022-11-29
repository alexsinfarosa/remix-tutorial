import {getExpenses} from '~/utils/expenses.server'

export async function loader() {
  return getExpenses()
}
