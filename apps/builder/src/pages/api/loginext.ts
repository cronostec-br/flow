import { createId } from '@paralleldrive/cuid2'
import { env } from '@typebot.io/env'
import prisma from '@typebot.io/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export async function createHash(message: string) {
  const data = new TextEncoder().encode(message)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toString()
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.email || req.query.s != env.ENCRYPTION_LINK_SELENE) {
    return res.status(400).json({ message: 'Not worked', email: 'invalid' })
  }

  const oneMinute = new Date(Date.now() + 1000 * 60)
  const id = createId()
  const idHashed = await createHash(`${id}${env.ENCRYPTION_SECRET}`)

  console.log(idHashed)
  console.log(id)

  const verificationToken = await prisma.verificationToken.create({
    data: {
      token: idHashed,
      expires: oneMinute,
      identifier: req.query.email.toString(),
    },
  })

  if (verificationToken) {
    return res
      .status(200)
      .json({
        id,
        url: `${env.NEXTAUTH_URL}/api/auth/callback/email?callbackUrl=${env.NEXTAUTH_URL}&token=${id}&email=${req.query.email}`,
      })
  }
  return res.status(400).json({ message: 'Not worked' })
}
