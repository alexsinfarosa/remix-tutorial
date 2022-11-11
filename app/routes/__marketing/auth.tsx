import styles from '~/styles/auth.css'
import AuthForm from '~/components/auth/AuthForm'

export function links() {
  return [{rel: 'stylesheet', href: styles}]
}

export default function AuthPage() {
  return (
    <div>
      <AuthForm></AuthForm>
    </div>
  )
}
