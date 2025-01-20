'use client';

import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import AboutUsDialogBox from '../shared-components/AboutUsDialogBox';


const HeroSection = () => {


  const [ openAboutUsDialogBox, setOpenAboutusDialogBox ] = useState(false);


  return (
    <>
      <Card className="border-0 bg-transparent shadow-none">

        <CardContent className="pt-10 lg:pt-20 text-center">

          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            AI-Powered Lead Generation
            <span className="text-orange-500"> Made Simple</span>
          </h1>

          <p className="text-lg lg:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Supercharge your hiring process with AI-driven insights. Automatically identify, analyze, and prioritize top developer talent from GitHub.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-3">

            <SignedIn>

              <Link href='/lead-form'>

                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  Get Started for Free
                </Button>

              </Link>

            </SignedIn>

            <SignedOut>

              <Link href='/sign-in'>

                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  Get Started for Free
                </Button>

              </Link>

            </SignedOut>

            <Button size="lg" variant="outline" onClick={() => setOpenAboutusDialogBox(true)}>
              Learn More
            </Button>

          </div>

        </CardContent>

      </Card>

      <AboutUsDialogBox openAboutUsDialogBox={openAboutUsDialogBox} setOpenAboutusDialogBox={setOpenAboutusDialogBox} />

    </>
  );

};


export default HeroSection;
