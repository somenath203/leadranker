'use client';

import { MdLeaderboard } from 'react-icons/md';
import { FaMoon } from "react-icons/fa";
import { FiMonitor } from "react-icons/fi";
import { CiSun } from "react-icons/ci";
import { useTheme } from 'next-themes';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { dark } from '@clerk/themes';
import { FaPlus } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import AboutUsDialogBox from './AboutUsDialogBox';


const Navbar = () => {


  const { setTheme, theme } = useTheme();


  const [ openAboutUsDialogBox, setOpenAboutusDialogBox ] = useState(false);


  return (
    <>
      <nav className="py-5 px-10 flex justify-between items-center">

        <Link href='/' className="text-2xl font-bold flex items-center justify-center gap-2">
          <MdLeaderboard className="text-orange-500 text-4xl" />
          LeadRanker
        </Link>

        <div className='flex items-center justify-center gap-3'>

          <SignedIn>

            <div className='flex items-center justify-center gap-4'>

              <Link href='/dashboard'>

                <Button>Dashboard</Button>

              </Link>

              <Link href='/lead-form'>

                <FaPlus className='text-2xl text-orange-500 dark:text-orange-400' />

              </Link>

            </div>

          </SignedIn>

          <Button variant="secondary" onClick={() => setOpenAboutusDialogBox(true)}>About</Button>

          <DropdownMenu>

            <DropdownMenuTrigger asChild>

              <Button variant="outline" size="icon">

                {theme === "light" && (
                  <CiSun className="h-[1.2rem] w-[1.2rem] transition-all" />
                )}

                {theme === "dark" && (
                  <FaMoon className="h-[1.2rem] w-[1.2rem] transition-all" />
                )}

                {theme === "system" && (
                  <FiMonitor className="h-[1.2rem] w-[1.2rem] transition-all" />
                )}

                <span className="sr-only">Toggle theme</span>

              </Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>

            </DropdownMenuContent>
              
          </DropdownMenu>

          <SignedIn>
              
            <div className='flex items-center justify-center'>

              <UserButton
                appearance={{ 
                  elements: { avatarBox: { width: '2.5rem', height: '2.5rem' }},
                  baseTheme: theme === 'light' ? undefined : dark
                }}
              />

            </div>

          </SignedIn>

          <SignedOut>

            <Link href='/sign-in'>

              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Get Started
              </Button>

            </Link>

          </SignedOut>

        </div>

      </nav>

      <AboutUsDialogBox openAboutUsDialogBox={openAboutUsDialogBox} setOpenAboutusDialogBox={setOpenAboutusDialogBox} />

    </>
  );
};

export default Navbar;
