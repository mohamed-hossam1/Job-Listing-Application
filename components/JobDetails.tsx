import React from "react";
import { Calendar, Clock, MapPin, CheckCircle } from "lucide-react";
import { JobPosting } from "@/types/JobPosting";

export default function JobDetails({ jobData }: { jobData: JobPosting }) {
  return (
    <div className="flex gap-6">
      <div className="flex-3 flex gap-10 flex-col">
        <div>
          <h2 className="text-4xl font-extrabold text-primary mb-6">
            Description
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            {jobData.description}
          </p>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold text-primary mb-6">
            Responsibilities
          </h2>
          <ul className="space-y-3 mb-8">
            {jobData.responsibilities.map((responsibilitie, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-sky-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{responsibilitie}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-4xl font-extrabold text-primary mb-6">
            Ideal Candidate we want
          </h2>
          <ul className="space-y-4 mb-8 list-disc pl-5">
            <li className="text-gray-700">
              <strong>Young({jobData.ideal_candidate.age} year old) {jobData.ideal_candidate.gender} {jobData.title}</strong>
            </li>
            {
              jobData.ideal_candidate.traits.map((trait, i)=>
              <li key={i} className="text-gray-700">
                <strong>{trait.split(':', 1).concat(trait.substring(trait.indexOf(':') + 1))[0]}</strong>: {trait.split(':', 1).concat(trait.substring(trait.indexOf(':') + 1))[1]}
              </li>
              )
            }
          </ul>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold text-primary mb-6">
            When & Where
          </h2>
          <div className="flex items-center">
            <div className="w-11 h-11 border rounded-full flex justify-center items-center  mr-3 mt-0.5 ">
              <MapPin className="w-6 h-6 text-sky-500 flex-shrink-0" />
            </div>
            <p className="text-gray-700">{jobData.when_where}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 ">
        <div className="border-b pb-5">
          <h2 className="text-4xl font-extrabold text-primary mb-6">About</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-11 h-11 border rounded-full flex justify-center items-center  mr-3 mt-0.5 ">
                <Calendar className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Posted On</p>
                <p className="font-semibold text-gray-900">
                  {jobData.about.posted_on}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-11 h-11 border rounded-full flex justify-center items-center  mr-3 mt-0.5 ">
                <Clock className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Deadline</p>
                <p className="font-semibold text-gray-900">
                  {jobData.about.deadline}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-11 h-11 border rounded-full flex justify-center items-center  mr-3 mt-0.5 ">
                <MapPin className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold text-gray-900">
                  {jobData.about.location}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-11 h-11 border rounded-full flex justify-center items-center  mr-3 mt-0.5 ">
                <Calendar className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="font-semibold text-gray-900">
                  {jobData.about.start_date}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-11 h-11 border rounded-full flex justify-center items-center  mr-3 mt-0.5 ">
                <Calendar className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">End Date</p>
                <p className="font-semibold text-gray-900">
                  {jobData.about.end_date}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b pb-5">
          <h2 className="text-4xl font-extrabold text-primary mb-6 mt-6">
            Categories
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <span className=" bg-amber-100/70 px-4 py-2 rounded-4xl text-amber-400 font-semibold">
              {jobData.about.categories[0]}
            </span>
            <span className="bg-emerald-100/50 px-6 py-2 rounded-4xl text-emerald-600/70 font-semibold">
              {jobData.about.categories[1]}
            </span>
          </div>
        </div>
        <div className="border-b pb-5">
          <h2 className="text-4xl font-extrabold text-primary mb-6 mt-6">
            Required Skills
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-900 font-semibold rounded text-sm  ">
                {jobData.about.required_skills[0]}
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-900 font-semibold rounded text-sm  ">
                {jobData.about.required_skills[1]}
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-900 font-semibold rounded text-sm  ">
                {jobData.about.required_skills[2]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
