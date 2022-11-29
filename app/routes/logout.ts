import type {ActionArgs} from '@remix-run/node'
import {json} from '@remix-run/node'
import {destroyUserSession} from '~/utils/auth.server'

export async function action({request}: ActionArgs) {
  if (request.method !== 'POST') {
    throw json({message: 'invalid request method'}, {status: 400})
  }

  return destroyUserSession(request)
}
