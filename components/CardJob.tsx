import { JobPosting } from "@/types/JobPosting";
import Image from "next/image";
import Link from "next/link";

export default function CardJob({jobPosting}:{jobPosting:JobPosting}) {
  return (
    <>
      <div className="border bg-gray-50 rounded-2xl">
        <div className="flex px-20 py-11 items-start">
          <div className="flex-1 w-70 h-70">
            <Image
              className="rounded-full object-contain"
              src={jobPosting.logoUrl||"https://plus.unsplash.com/premium_photo-1739786995646-480d5cfd83dc?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt={jobPosting.title}
              width={70}
              height={70}
            />
          </div>
          <div className="flex-15 flex flex-col gap-3 ml-8">
            <Link href={`/${jobPosting.id}`}>
              <h2 className="text-2xl font-semibold">{jobPosting.title}</h2>
            </Link>
            <p className="text-lg text-gray-500">{jobPosting.location[0]}</p>
            <p className="text-lg">{jobPosting.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-emerald-100/50 px-2.5 py-2 rounded-4xl text-emerald-600/70 font-semibold">In Person</span>
              <span className="border-2 border-amber-400 px-2.5 py-2 rounded-4xl text-amber-400 font-semibold">{jobPosting.categories[0]}</span>
              <span className="border-2 border-blue-800 px-6 py-2 rounded-4xl text-blue-800 font-semibold">{jobPosting.categories[0]}</span>
            </div>  
          </div>


        </div>
      </div>
    </>
  );
}
