"use client";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  const { user } = useUser();
  return (
    <header className="h-16 absolute top-0 w-full z-50 bg-transparent">
      <div className="container bg-transparent h-full mx-auto flex px-5 items-center justify-between">
        <div>
          <a href="#" className="font-semibold italic text-xl">
            Flop<span className="text-primary font-bold">Flix</span>
          </a>
        </div>
        <nav className="hidden md:block">
          <ul className="flex gap-6 items-center">
            <li>
              <a href="#" className="navLink">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="navLink">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="navLink">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="navLink">
                Contact
              </a>
            </li>
          </ul>
        </nav>
        {user ? (
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/popular">Dashboard</Link>
            </Button>
            <UserButton />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="default" asChild>
              <SignInButton mode="modal" />
            </Button>
            <Button variant="ghost" asChild>
              <SignUpButton mode="modal" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
