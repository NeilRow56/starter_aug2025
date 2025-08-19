import AllUsers from '@/components/all-users'
import MembersTable from '@/components/members-table'
import { Button } from '@/components/ui/button'
import { getOrganizationBySlug } from '@/server/organizations'
import { getUsers } from '@/server/users'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

type Params = Promise<{ slug: string }>

export default async function OrganizationPage({ params }: { params: Params }) {
  const { slug } = await params

  const organization = await getOrganizationBySlug(slug)
  const users = await getUsers(organization?.id || '')

  return (
    <div className='mx-auto flex max-w-3xl flex-col gap-4 pt-20'>
      <Button size='icon' asChild>
        <Link href='/dashboard' className='w-[125px] p-1'>
          <ArrowLeftIcon />
          <span> Dashboard </span>
        </Link>
      </Button>
      <h1 className='text-2xl font-bold'>{organization?.name}</h1>
      <MembersTable members={organization?.members || []} />
      {/* Below is a list of users that are not the currently logged in user and other organization members */}
      <AllUsers users={users} organizationId={organization?.id || ''} />
    </div>
  )
}
