"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = ({ session }) => {
    

  console.log(session);
  return (
    <div>
      <Link href="/login">Login</Link>
      <button onClick={() => signOut()}>Logout</button>

      <p>Logged in as: {session?.user?.name}</p>
    </div>
  );
};

export default Navbar;
