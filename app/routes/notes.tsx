import NewNote, {links as linksNewNote} from '~/components/NewNote'

export function links() {
  return [...linksNewNote()]
}

export default function NotesPage() {
  return (
    <main>
      <h1>Note Page</h1>
      <NewNote></NewNote>
    </main>
  )
}
