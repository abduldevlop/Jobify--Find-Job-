import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-5 sm:py-10">
      <section className="text-center">
        <h1 className="flex items-center justify-center flex-col grdient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job
          <span className="flex items-center gap-2 sm:gap-5">
            and get
            <img src="/logo.png" alt="logo" className="h-14 sm:h-24 lg:h-32" />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl ">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        <Link to={"/jobs"}>
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to={"/post-jobs"}>
          <Button variant="destructive" size="xl">
            Post a Job
          </Button>
        </Link>
      </div>
      <Carousel plugins={[Autoplay({ delay: 1000 })]}>
        <CarouselContent>
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className={"basis-1/3 lg:basis-1/6"}>
              <img
                src={path}
                alt={name}
                className="h-9 sm:h14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <img src="/banner.jpeg" alt="banner" className="w-full" />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Search and apply for jobs , track applications, and more,</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Post jobs, manage applications, and find the best candidates.</p>
          </CardContent>
        </Card>
      </section>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index + 1}`} key={index}>
            <AccordionTrigger> {faq.question} </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default LandingPage;
