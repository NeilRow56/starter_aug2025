import { CreateOrganizationForm } from '@/components/create-organization-form'
import { SignOutButton } from '@/components/sign-out-button'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { getOrganizations } from '@/server/organizations'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
// import Link from "next/link";

export default async function Dashboard() {
  const organizations = await getOrganizations()

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-2'>
      <Button size='icon' asChild>
        <Link href='/' className='w-[90px] p-1'>
          <ArrowLeftIcon />
          <span> Home</span>
        </Link>
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' className='cursor-pointer'>
            Create Client
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Organization</DialogTitle>
            <DialogDescription>
              Create a new organization to get started.
            </DialogDescription>
          </DialogHeader>
          <CreateOrganizationForm />
        </DialogContent>
      </Dialog>

      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-bold'>Clients:</h2>
        {organizations.map(organization => (
          <Button variant='outline' key={organization.id} asChild>
            <Link href={`/dashboard/organization/${organization.slug}`}>
              {organization.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
