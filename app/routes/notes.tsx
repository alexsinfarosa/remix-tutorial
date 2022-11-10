import NewNote, {links as linksNewNote} from '~/components/NewNote'
import NoteList, {links as linksNoteList} from '~/components/NoteList'
import {json, redirect} from '@remix-run/node'
import {getStoredNotes, storeNotes} from '~/models/notes'
import type {LoaderArgs, ActionArgs} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import type {Note} from '~/models/notes'

export function links() {
  return [...linksNewNote(), ...linksNoteList()]
}

// the action is called (before the loader) only when a non-GET request is made
export async function action({request}: ActionArgs) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const notes: Note[] = await getStoredNotes()
  data.id = new Date().toISOString()
  const updatedNotes = [...[data], ...notes]

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
    a.id < b.id ? -1 : a.id > b.id ? 1 : 0,
  )

  return (
    <main>
      <NewNote></NewNote>
      <NoteList notes={reversed}></NoteList>
    </main>
  )
}