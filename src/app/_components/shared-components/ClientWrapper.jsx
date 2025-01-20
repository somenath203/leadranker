'use client';

import dynamic from 'next/dynamic';


const ClientWrapper = ({ children }) => {

  const DynamicThemeProvider = dynamic(
    () => import('@/components/theme-provider').then((mod) => mod.ThemeProvider), 
    { ssr: false }
  );

  return (
    <DynamicThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >

      {children}

    </DynamicThemeProvider>
  );
};


export default ClientWrapper;