import Image from 'next/image'
import { db } from '@/server/db' // use the pre-configured Prisma client
import type { User } from '@prisma/client'

// Make this an async function to use await
export default async function Home() {
  // Fetch users from the database using the pre-configured Prisma client
  const users: User[] = await db.user.findMany() // Explicitly type the users array

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Display fetched users */}
        <div className="w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Users from Database:</h2>
          <ul className="list-disc pl-5">
            {users.map((user) => (
              <li key={user.id} className="mb-2">
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
