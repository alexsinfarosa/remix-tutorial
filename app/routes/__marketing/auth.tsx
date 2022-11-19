import type {ActionArgs} from '@remix-run/node'
import {json, redirect} from '@remix-run/node'
import AuthForm from '~/components/auth/AuthForm'
import styles from '~/styles/auth.css'
import {validateEmail} from '~/utils/validation.server'

export function links() {
  return [{rel: 'stylesheet', href: styles}]
}

export async function action({request}: ActionArgs) {
  const searchParams = new URL(request.url).searchParams
  const authMode = searchParams.get('mode') || 'login'

  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  if (!validateEmail(email)) {
    return json(
      {errors: {email: 'Email is invalid', password: null}},
      {status: 400},
    )
  }

  if (typeof password !== 'string' || password.length === 0) {
    return json(
      {errors: {email: null, password: 'Password is required'}},
      {status: 400},
    )
  }

  if (password.length < 8) {
    return json(
      {errors: {email: null, password: 'Password is too short'}},
      {status: 400},
    )
  }

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
