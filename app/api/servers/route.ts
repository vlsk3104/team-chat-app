import { MemberRole } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

interface Body {
  name: string
  imageUrl: string
}

export async function POST(req: NextRequest) {
  try {
    const { name, imageUrl } = (await req.json()) as Body

    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuid(),
        channels: {
          create: [
            {
              name: 'general',
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('servers-post', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
