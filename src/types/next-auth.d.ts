import { DefaultSession, DefaultUser } from "next-auth";

// Extend next-auth types to include our custom fields (id in particular)
declare module "next-auth" {
  interface Session {
    user: {
      /** The user's unique identifier. */
      id: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    /** The user's unique identifier stored in JWTs */
    id: string;
  }
}

// make sure our JWT type also includes the id for server callbacks
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
