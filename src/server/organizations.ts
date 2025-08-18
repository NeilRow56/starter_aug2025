'use server'

import { member, organization } from '@/db/schema'
import { eq, inArray } from 'drizzle-orm'

import { db } from '@/db'
import { getCurrentUser } from './users'

export async function getOrganizations() {
  const { currentUser } = await getCurrentUser()

  const members = await db.query.member.findMany({
    where: eq(member.userId, currentUser.id)
  })

  const organizations = await db.query.organization.findMany({
    where: inArray(
      organization.id,
      members.map(member => member.organizationId)
    )
  })

  return organizations
}
