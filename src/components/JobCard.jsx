import { useUser } from "@clerk/clerk-react";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const JobCard = ({
  job,
  isMyJob = true,
  saveinit = false,
  onJobSave = () => {},
}) => {
  const { user } = useUser();
  return (
    <Card className="flex justify-between flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {" "}
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-between">
          {job.companies && (
            <img src={job.companies.logo_url} alt="" className="h-6" />
          )}
          <div className="flex items-center gap-2 text-sm">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />

        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>
      <CardFooter className="flex gap-2 justify-between items-center">
        <Link to={`/job/${job.id}`}>
          <Button varient="outline" classNamew="w-full">
            More details..
          </Button>
        </Link>
        <Heart size={20} stroke="red" fill="red" />
      </CardFooter>
    </Card>
  );
};

export default JobCard;
