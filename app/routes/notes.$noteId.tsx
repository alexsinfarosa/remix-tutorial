import {Link, useCatch, useLoaderData} from '@remix-run/react'
import styles from '~/styles/note-details.css'
import type {LoaderArgs} from '@remix-run/node'
import {json} from '@remix-run/node'
import {getStoredNotes} from '~/models/notes'

export function links() {
  return [{rel: 'stylesheet', href: styles}]
}

// The data property is the data exported by the loader function
export function meta({data}: {data: {title: string; description: string}}) {
  if (!data) {
    return {
      title: 'Note Page',
      description: 'The note details',
    }
  }

  const {title, description} = data
  return {
    title,
    description,
  }
}

export async function loader({params}: LoaderArgs) {
  const notes = await getStoredNotes()
  const note = notes.find(n => n.id === params.noteId)

  if (!note) {
    // throw new Error('Note not found')
    throw json({message: `Could not find note ${params.noteId}`}, {status: 404})
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

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <main className="error">
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre style={{overflowWrap: 'break-word', whiteSpace: 'pre-wrap'}}>
        <code>{JSON.stringify(caught.data, null, 4)}</code>
      </pre>
    </main>
  )
}
