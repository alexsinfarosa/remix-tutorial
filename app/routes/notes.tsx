import NewNote, {links as linksNewNote} from '~/components/NewNote'

export function links() {
  return [...linksNewNote()]
}

export default function NotesPage() {
  return (
    <main>
      <NewNote></NewNote>
    </main>
  )
}
