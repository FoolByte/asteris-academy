import { getUsers } from '@/lib/payload/collections/get-users'

export default async function Page() {
  const users = await getUsers()
  return <pre>{JSON.stringify(users, null, 2)}</pre>
}
