import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusinessIcon, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSingIn, setShowSingIn] = useState(false);

  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sing-in")) {
      setShowSingIn(true);
    }
  }, [search]);

  const handelOverlayCLick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSingIn(false);
      setSearch({});
    }
  };
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to={"/"} className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="h-10 mt-2" />
          <span className="text-xl md:text-2xl lg:text-3xl grdient-title font-extrabold">
            Jobify
          </span>
        </Link>
        <div className="flex gap-8">
          <SignedOut>
            <Button varient="outline" onClick={() => setShowSingIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruter" && (
              <Link to={"/post-jobs"}>
                <Button varient={"destructive"} className={"rounded-full"}>
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label={"My Jobs"}
                  labelIcon={<BriefcaseBusinessIcon size={15} />}
                  href={"/my-jobs"}
                />
                <UserButton.Link
                  label={"Save Jobs"}
                  labelIcon={<Heart size={15} />}
                  href={"/save-jobs"}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSingIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handelOverlayCLick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
