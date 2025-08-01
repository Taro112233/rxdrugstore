import { SignUpView } from "@/modules/auth/ui/views/sign-up-view"
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"; // Force dynamic rendering

const Page = async () => {
  const session = await caller.auth.session();

  if (session.user) {
    redirect("/");
  }

  return <SignUpView />
}

export default Page;