import {Link, useLoaderData} from '@remix-run/react'
import styles from '~/styles/note-details.css'
import type {LoaderArgs} from '@remix-run/node'
import {json} from '@remix-run/node'
import {getStoredNotes} from '~/models/notes'

export function links() {
  return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params}: LoaderArgs) {
  const notes = await getStoredNotes()
  const note = notes.find(n => n.id === params.noteId)

  if (!note) {
    throw new Error('Note not found')
  }
  return json(note)
}

export default function NoteDetailsPage() {
  const note = useLoaderData<typeof loader>()
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes"> &larr; Back to Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  )
}

export function ErrorBoundary({error}: {error: Error}) {
  return (
    <main className="error">
      <h1>Error</h1>
      <p>{error.message}</p>

      <p>The stack trace is:</p>
      <pre style={{overflowWrap: 'break-word', whiteSpace: 'pre-wrap'}}>
        {error.stack}
      </pre>

      <p>
        Back to <Link to="/">Safety</Link>
      </p>
    </main>
  )
}
