declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string;
    type: string;
    fullname: string;
  }
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: {
      id: string;
      type: string;
      fullname: string;
      email: string;
      fillname: string;
    };
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    type: string;
  }
}

interface TProduct {
  categories: any;
  stoke: ReactNode;
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  images: string[];
  colors: TColor[];
  sizes: TSize[];
  selected_size: TSize;
  selected_color: TColor;
  qty: number;
  price: number;
}

interface TCategory {
  id: number;
  name: string;
}

interface TColor {
  hexCode: Background<string | number> | undefined;
  id: number;
  hexcode: string;
  name: string;
}
interface TSize {
  id: number;
  name: string;
}
