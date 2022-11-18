import type {ActionArgs} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import AuthForm from '~/components/auth/AuthForm'
import styles from '~/styles/auth.css'

export function links() {
  return [{rel: 'stylesheet', href: styles}]
}

export async function action({request}: ActionArgs) {
  const searchParams = new URL(request.url).searchParams
  const authMode = searchParams.get('mode') || 'login'

  const formData = await request.formData()
  const credentials = Object.fromEntries(formData)
  console.log(credentials)

  if (authMode === 'login') {
    // log in
  } else {
    //sign up
  }

  return redirect(``)
}

export default function AuthPage() {
  return (
    <div>
      <AuthForm></AuthForm>
    </div>
  )
}
