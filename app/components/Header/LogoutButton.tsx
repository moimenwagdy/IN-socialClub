"use client";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import React from "react";

const LogoutButton = () => {
  const tButtons = useTranslations("buttons");
  const logOut = () => {
    signOut();
  };
  return (
    <Link
      className="text-xs text-black dark:text-white"
      onClick={logOut}
      href="/">
      {tButtons("logout")}
    </Link>
  );
};

export default LogoutButton;
