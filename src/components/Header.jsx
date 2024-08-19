import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { BriefcaseBusinessIcon, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSingIn, setShowSingIn] = useState(false);

  const [search, setSearch] = useSearchParams();

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
        <Link>
          <img src="/logo.png" alt="logo" className="h-20" />
        </Link>
        <div className="flex gap-8">
          <SignedOut>
            <Button varient="outline" onClick={() => setShowSingIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            <Link to={"/post-job"}>
              <Button varient={"destructive"} className={"rounded-full"}>
                <PenBox size={20} className="mr-2" />
                Post a Job
              </Button>
            </Link>
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
