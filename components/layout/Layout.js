import React from 'react';
import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

export default function Layout({ title = '7GUI 💎', children }) {
  return (
    <div>
      <Head key="head">
        <title>{title}</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
