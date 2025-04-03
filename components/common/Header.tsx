import { FileText } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavLink from "./nav-link";

export default function Header() {
  return (
    <nav className="container flex items-center justify-between lg:px-4 px-2 mx-auto py-4">
      {/* Logo Section */}
      <div className="flex lg:flex-1">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold lg:text-xl text-gray-900">PDFSummize</span>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">Your Summaries</NavLink>
        </SignedIn>
      </div>

      {/* Authentication Section */}
      <div className="flex lg:justify-end lg:flex-1 items-center gap-4">
        <SignedIn>
          <NavLink href="/upload">Upload a PDF</NavLink>
          <span>Pro</span>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <NavLink href="/sign-in">Sign In</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
}
