"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import Container from "../Container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import SearchInput from "./SearchInput";

const NavBar = () => {
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <div className="sticky top-0 border border-b-primary/10 bg-secondary w-full">
      <Container>
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src="/bed.svg"
              alt="logo"
              width={25}
              height={25}
              className="h-5 md:h-8 w-5 md:w-8"
            />
            <div className="font-bold text-sm md:text-xl font-serif">
              Comfycation Station
            </div>
          </div>
          <SearchInput />
          <div className="flex gap-3 items-center">
            <div>Theme Button </div> <UserButton afterSwitchSessionUrl="/" />
            {!userId && (
              <>
                <Button
                  onClick={() => router.push("/sign-in")}
                  variant="outline"
                >
                  Sign in
                </Button>
                <Button onClick={() => router.push("/sign-up")} size="sm">
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
