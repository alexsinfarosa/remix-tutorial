import {prisma} from './db.server'
import {compare, hash} from 'bcryptjs'
import {createCookieSessionStorage, redirect} from '@remix-run/node'
import invariant from 'tiny-invariant'

invariant(process.env.SESSION_SECRET, 'SESSION_SECRET must be set')

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'alex__session',
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    secrets: [process.env.SESSION_SECRET],
    sameSite: 'lax',
  },
})

const USER_SESSION_KEY = 'userId'
export async function createUserSession(userId: string, redirectTo: string) {
  const session = await sessionStorage.getSession()
  session.set(USER_SESSION_KEY, userId)

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7,
      }),
    },
  })
}

export async function signup(email: string, password: string) {
  const userFound = await prisma.user.findFirst({where: {email}})

  if (userFound) {
    throw new Error(`User with this email already exists.`)
  }

  const passwordHash = await hash(password, 12)
  const user = await prisma.user.create({data: {email, password: passwordHash}})
  return createUserSession(user.id, '/expenses')
}

export async function login(email: string, password: string) {
  const userFound = await prisma.user.findFirst({where: {email}})

  if (!userFound) {
    throw new Error('User not found')
  }

  const isValidPassword = compare(password, userFound.password)

  if (!isValidPassword) {
    throw new Error('Password not valid')
  }

  return createUserSession(userFound.id, '/expenses')
}
