import React from "react";
import { Calendar, Clock, MapPin, CheckCircle } from "lucide-react";
import { JobPosting } from "@/types/JobPosting";

export default function JobDetails({ jobData }: { jobData: JobPosting }) {
  const splitBulletPoints = (text: string) =>
    text
      .split(".")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);

    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex gap-6 justify-between w-full">
      <div className=" flex gap-10 flex-col">
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
            {splitBulletPoints(jobData.responsibilities).map(
              (responsibilitie, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-sky-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{responsibilitie}</span>
                </li>
              )
            )}
          </ul>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold text-primary mb-6">
            Ideal Candidate we want
          </h2>
          <ul className="space-y-4 mb-8 list-disc pl-5">
            <li className="text-gray-700">
              <strong>{jobData.title}</strong>
            </li>
            {splitBulletPoints(jobData.idealCandidate).map((trait, i) => (
              <li key={i} className="text-gray-700">
                <strong>{trait}</strong>
              </li>
            ))}
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
            <p className="text-gray-700">{jobData.whenAndWhere}</p>
          </div>
        </div>
      </div>
      <div className="w-70">
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
                  {formatDate(jobData.datePosted)}
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
                  {formatDate(jobData.deadline)}
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
                  {jobData.location}
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
                  {formatDate(jobData.startDate)}
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
                  {formatDate(jobData.endDate)}
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
              {jobData.categories[0]}
            </span>
            <span className="bg-emerald-100/50 px-6 py-2 rounded-4xl text-emerald-600/70 font-semibold">
              {jobData.categories[1]}
            </span>
          </div>
        </div>
        <div className="border-b pb-5">
          <h2 className="text-4xl font-extrabold text-primary mb-6 mt-6">
            Required Skills
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex flex-wrap gap-2">
              {jobData.requiredSkills.map((requiredSkill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-50 text-blue-900 font-semibold rounded text-sm  "
                >
                  {requiredSkill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
