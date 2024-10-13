"use client";

import { UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <div>
      <UserButton afterSwitchSessionUrl="/" />
    </div>
  );
};

export default NavBar;
