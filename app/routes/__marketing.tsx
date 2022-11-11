import {Outlet} from '@remix-run/react'
import styles from '~/styles/marketing.css'

export default function MarketingLayout() {
  return <Outlet></Outlet>
}

export function links() {
  return [{rel: 'stylesheet', href: styles}]
}
