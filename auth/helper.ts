"use server";
import { signIn as signInAuth, signOut as signOutAuth } from ".";

const signIn = async (user: any) => {
  await signInAuth("credentials", {
    redirectTo: "/dashboard",
    ...user,
  });
};

const signOut = async () => {
  await signOutAuth({
    redirectTo: "/sign-in",
  });
};

export { signIn, signOut };
