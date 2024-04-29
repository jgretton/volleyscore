"use client";

import Link from "next/link";
import React from "react";

import { usePathname } from "next/navigation";

const Links = [
  { href: "/", link: "Home" },
  { href: "/create", link: "Create" },
  { href: "/lineup", link: "Lineup" },
  { href: "/pregame", link: "Pre Game" },
  { href: "/match", link: "Match" },
  { href: "/basic-match", link: "Basic Match" },
  { href: "/scoresheet", link: "Scoresheet" },
];

const Navbar = () => {
  const pathName = usePathname();

  return (
    <nav className="flex gap-x-10 p-10">
      {Links.map((link, idx) => {
        const isActive = pathName.startsWith(link.href);
        return (
          <Link
            href={link.href}
            key={idx}
            className={
              isActive
                ? "underline underline-offset-2 font-bold text-slate-800"
                : "font-normal text-slate-500"
            }
          >
            {link.link}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
