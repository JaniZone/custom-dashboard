
import React from 'react';
import Link from 'next/link';

export default function Home(){

  return (
    <div>
      <h1>Welcome to Next.js with TypeScript</h1>
     <p>
        <Link href="\hello">Go to Hello World Page</Link>
      </p>
    </div>
  );
};

