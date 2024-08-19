import React from "react";
import { Button } from "./components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import OnBoarding from "./pages/OnBoarding";
import JobLisiting from "./pages/JobLisiting";
import Job from "./pages/Job";
import PostJob from "./pages/PostJob";
import SaveJobs from "./pages/SaveJobs";
import MyJobs from "./pages/MyJobs";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/onboarding", element: <OnBoarding /> },
        { path: "/jobs", element: <JobLisiting /> },
        { path: "/job/:id", element: <Job /> },
        { path: "/post-job", element: <PostJob /> },
        { path: "/save-jobs", element: <SaveJobs /> },
        { path: "/my-jobs", element: <MyJobs /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
