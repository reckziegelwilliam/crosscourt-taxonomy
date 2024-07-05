import { getCurrentUser } from "@/lib/session";

export async function fetchUser() {
  const user = await getCurrentUser();
  return user;
}
