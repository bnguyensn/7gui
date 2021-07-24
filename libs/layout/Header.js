import * as React from 'react';
import Link from 'next/link';

const NavLinkDesktop = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="mx-4 no-underline">{children}</a>
    </Link>
  );
};

export default function Header() {
  return (
    <header>
      <nav className="container mx-auto flex items-center p-4">
        <h4 className="flex-grow text-blue-500">
          <strong>7 GUI</strong>
        </h4>

        <NavLinkDesktop href="/">Home</NavLinkDesktop>
        <NavLinkDesktop href="/about">About</NavLinkDesktop>
      </nav>
    </header>
  );
}
