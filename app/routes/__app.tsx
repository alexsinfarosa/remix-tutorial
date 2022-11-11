import {Outlet} from '@remix-run/react'
import styles from '~/styles/expenses.css'

export default function ExpensesAppLayout() {
  return <Outlet></Outlet>
}

export function links() {
  return [{rel: 'stylesheet', href: styles}]
}
