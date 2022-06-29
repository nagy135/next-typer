import Head from "next/head";
import React from "react";

interface ILayout {
  children?: JSX.Element;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@2.17.0/dist/full.css"
          rel="stylesheet"
          type="text/css"
        />
        <script src="https://cdn.tailwindcss.com" defer></script>
        <title>Next-Typer</title>
        <meta
          name="description"
          content="Simple app calculating typing speed"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
