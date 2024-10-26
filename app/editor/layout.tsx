import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Editor Page"
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
          <body>
            {children}
          </body>
        </html>
      );
}