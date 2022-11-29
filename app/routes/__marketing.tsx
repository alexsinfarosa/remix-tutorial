import {Outlet} from '@remix-run/react'
import MainHeader from '~/components/navigation/MainHeader'
import styles from '~/styles/marketing.css'
import type {LoaderArgs} from '@remix-run/node'
import {getUserFromSession} from '~/utils/auth.server'

export async function loader({request}: LoaderArgs) {
  return getUserFromSession(request)
}

export default function MarketingLayout() {
  return (
    <>
      <MainHeader></MainHeader>
      <Outlet></Outlet>
    </>
  )
}

export function links() {
  return [{rel: 'stylesheet', href: styles}]
}
