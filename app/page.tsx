import Link from "next/link";
export default function Home() {
  return (
    <>
      <h1>This is the main page</h1>
      <button>
      <Link href="/hello">
        Click to go to Hello Page
      </Link>
      </button>
    </>
  );
}
