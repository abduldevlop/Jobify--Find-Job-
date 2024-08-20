import { getJobs } from "@/api/api-job";
import JobCard from "@/components/JobCard";
import useFetch from "@/hooks/useFetch";
import { useSession, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobLisiting = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [companyId, setCompanyId] = useState("");
  const { isLoaded } = useUser();
  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, companyId, searchQuery });
  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, companyId, searchQuery]);
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      {loadingJobs === false && (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-10">
          {dataJobs?.length ? (
            dataJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div>No Jobs Found 🤔</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobLisiting;
