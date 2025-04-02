import Link from "next/link";
import AuthStatus from "./AuthStatus";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-indigo-800">
              JobListing
            </Link>
          </div>
          <nav className="hidden md:ml-6 md:flex md:space-x-8">
            <Link
              href="/"
              className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              Home
            </Link>
            <Link
              href="/opportunities"
              className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              Opportunities
            </Link>
          </nav>
          <div className="flex items-center">
            <AuthStatus />
          </div>
        </div>
      </div>
    </header>
  );
}
