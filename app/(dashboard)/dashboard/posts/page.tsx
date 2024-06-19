import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"

import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { PostCreateButton } from "@/components/post/post-create-button"
import { PostItem } from "@/components/post/post-item"

export const metadata = {
  title: "Posts",
  description: "Manage account posts.",
}

export default async function PostsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const posts = await db.post.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>
      <div>
        {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PostCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
