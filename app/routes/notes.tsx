import NewNote, {links as linksNewNote} from '~/components/NewNote'
import NoteList, {links as linksNoteList} from '~/components/NoteList'
import {json, redirect} from '@remix-run/node'
import {getStoredNotes, storeNotes} from '~/models/notes'
import type {LoaderArgs, ActionArgs} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import type {Note} from '~/models/notes'

export function links() {
  return [...linksNewNote(), ...linksNoteList()]
}

// the action is called (before the loader) only when a non-GET request is made
export async function action({request}: ActionArgs) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  // Add simple validation
  if (typeof data.title !== 'string') {
    throw new Error('Title must be a string')
  }
  // Just for fun...
  if (data.title === 'Title') {
    // an action can also return data. The data can be accessed using the useActionData hook
    return {message: 'The title of a note cannot be "Title"'}
  }

  const notes: Note[] = await getStoredNotes()
  data.id = new Date().toISOString()
  const updatedNotes = [...[data], ...notes] as Note[]

  await storeNotes(updatedNotes)

  // Adding artificial delay
  await new Promise<void>(res => setTimeout(() => res(), 2000))

  return redirect(`/notes`)
}

export async function loader(request: LoaderArgs) {
  const notes = await getStoredNotes()
  return json(notes)
}

export default function NotesPage() {
  const notes = useLoaderData<typeof loader>()

  // sort ISO date string lexicographically
  const reversed = notes.sort((a: Note, b: Note) =>
    a.id < b.id ? 1 : a.id > b.id ? -1 : 0,
  )

  return (
    <main>
      <NewNote></NewNote>
      <NoteList notes={reversed}></NoteList>
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
