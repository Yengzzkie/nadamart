"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="p-4">
      {status === "loading" ? (
        <p>Loading...</p>
      ) : !session ? (
        <Link href="/login">Login</Link>
      ) : (
        <>
          <button onClick={() => signOut()}>Logout</button>
          <p>Logged in as: {session.user?.email}</p>
        </>
      )}
    </div>
  );
};

export default Navbar;
