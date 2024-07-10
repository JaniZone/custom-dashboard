import React from 'react';
import Link from 'next/link';

export default function Home(){

  return (
    <div>
      <h1>Welcome to Home page</h1>
     <p>
        <Link href="\new">Go to Hello World Page</Link>
      </p>
    </div>
  );
}