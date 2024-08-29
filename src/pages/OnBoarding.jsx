import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const OnBoarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && user?.unsafeMetadata?.role) {
      navigate(
        user.unsafeMetadata.role === "recruter" ? "/post-jobs" : "/jobs"
      );
    }
  }, [isLoaded, user, navigate]);

  const handleRoleSelection = async (role) => {
    try {
      await user.update({ unsafeMetadata: { role } });
      navigate(role === "recruter" ? "/post-jobs" : "/jobs");
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a...
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-4 w-full md:px-20">
        <Button
          variant="blue"
          className="h-36 text-xl"
          onClick={() => handleRoleSelection("candidat")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-xl"
          onClick={() => handleRoleSelection("recruter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default OnBoarding;
