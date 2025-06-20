"use client";

import React from "react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../../public/Gemini_Generated_Image_lgg6o8lgg6o8lgg6.png";

import { motion } from "framer-motion";

export default function Navbar() {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo & Mobile Nav */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={logo} alt="Logo" width={40} height={40}  />
            <span className="text-xl font-bold tracking-tight ">BlogPoster</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/blog/Blogs" className="transition-colors hover:text-primary font-bold">
            Blogs
          </Link>
         
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-2">
         <SignedIn>
           <Link href="/blog/new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-md border border-primary bg-transparent px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white"
            >
              AI Blog Generate
            </motion.button>
          </Link>
         </SignedIn>

   

          <SignedIn>
            <Link
              href="/dashboard"
             className="flex items-center px-4 py-1 border-2 border-black rounded-md text-sm font-semibold transition-colors hover:bg-gray-100 hover:text-black"
            >
              Dashboard
            </Link>
            <div className="hidden md:flex items-center space-x-2 px-2">
              <span className="text-muted-foreground text-sm">
                Hi, {user?.firstName || user?.email}
              </span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <button className="flex px-3 py-1 border-2 border-black">Sign In</button>
              
              </motion.div>
            </SignInButton>
            <SignUpButton mode="modal">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="flex px-3 py-1 border-2 border-black">Sign Up</button>
              </motion.div>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
