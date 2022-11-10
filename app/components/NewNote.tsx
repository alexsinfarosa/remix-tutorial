import {Form, useActionData, useTransition} from '@remix-run/react'
import styles from './NewNote.css'

export function links() {
  return [{rel: 'stylesheet', href: styles}]
}

type actionData = {
  message: string
}

export default function NewNote() {
  const actionData = useActionData<actionData>() // <-- not sure about this.
  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'

  return (
    <Form method="post" id="note-form">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required min={5} />
        {actionData?.message && <small>{actionData.message}</small>}
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Sumbitting...' : 'Add Note'}
        </button>
      </div>
    </Form>
  )
}

// <form> default method is 'get'
// <form> default action is '.', the current active path
// the button within the form will be responsible for submitting the form
