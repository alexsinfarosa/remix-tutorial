import type {MetaFunction} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react'

import styles from '~/styles/main.css'
import MainNavigation from '~/components/MainNavigation'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

export function links() {
  return [{rel: 'stylesheet', href: styles}]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation></MainNavigation>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function ErrorBoundary({error}: {error: Error}) {
  console.error(error)
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        <main className="error">
          <h1>Error</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <pre style={{overflowWrap: 'break-word', whiteSpace: 'pre-wrap'}}>
            {error.stack}
          </pre>
        </main>
        <Scripts />
      </body>
    </html>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {caught.status} {caught.statusText}
        </h1>
        <Scripts />
      </body>
    </html>
  )
}
