import * as React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 px-4 py-8 text-white">
      <p className="text-center">
        <span>
          Made by{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/bnguyensn"
          >
            @bnguyensn
          </a>
        </span>
        <span className="px-2">|</span>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/bnguyensn/super-app-19"
        >
          Source code
        </a>
      </p>
    </footer>
  );
}
