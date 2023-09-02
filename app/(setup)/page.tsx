import { Profile } from '@prisma/client'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initial-profile'

const SetupPage = async () => {
  const profile = (await initialProfile()) as Profile

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (server) {
    redirect(`/servers/${server.id}`)
  }

  return <div>SetUpPage</div>
}

export default SetupPage
