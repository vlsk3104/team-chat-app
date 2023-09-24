import { DirectMessage } from '@prisma/client'
import { NextResponse } from 'next/server'

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

const MESSAGES_BATCH = 10

export async function GET(req: Request) {
  try {
    const profile = await currentProfile()
    const { searchParams } = new URL(req.url)

    const cursor = searchParams.get('cursor')
    const conversationId = searchParams.get('conversationId')

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!conversationId) {
      return new NextResponse('Conversation ID missing', { status: 400 })
    }

    const conversationOne = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
      },
    })

    if (!conversationOne) {
      return new NextResponse('ConversationOne not found', { status: 404 })
    }

    const conversationTwo = await db.conversation.findFirst({
      where: {
        memberOneId: conversationOne?.memberTwoId,
        memberTwoId: conversationOne?.memberOneId,
      },
    })

    if (!conversationTwo) {
      return new NextResponse('ConversationTwo not found', { status: 404 })
    }

    const conversationIds = [conversationOne.id, conversationTwo.id]

    let messages: DirectMessage[] = []

    if (cursor) {
      messages = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          conversationId: {
            in: conversationIds,
          },
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    } else {
      messages = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        where: {
          conversationId: {
            in: conversationIds,
          },
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    }

    let nextCursor = null

    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id
    }

    return NextResponse.json({
      items: messages,
      nextCursor,
    })
  } catch (error) {
    console.log('[DIRECT_MESSAGES_GET]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
