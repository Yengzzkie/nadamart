"use client";

import { signOut, getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const sessionData = await getSession();
      setSession(sessionData);
      console.log(sessionData);
    }

    fetchSession();
  }, []);

  return (
    <div className="p-4">
      {!session ? (
        <Link href="/login">Login</Link>
      ) : (
        <>
          <button onClick={() => signOut()}>Logout</button>
          <p>Logged in as: {session?.user?.email}</p>
        </>
      )}
    </div>
  );
};

export default Navbar;
