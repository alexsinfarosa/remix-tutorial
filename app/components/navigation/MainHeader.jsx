import {Link, NavLink} from '@remix-run/react'
import Logo from '../util/Logo'
import {useLoaderData, Form} from '@remix-run/react'

function MainHeader() {
  const userId = useLoaderData()
  console.log(userId)
  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {userId ? (
              <Form method="post" id="logout-form" action="/logout">
                <button type="submit" className="cta-alt">
                  Logout
                </button>
              </Form>
            ) : (
              <Link to="/auth" className="cta">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainHeader
