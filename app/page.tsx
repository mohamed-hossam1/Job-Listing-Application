import CardJob from "@/components/CardJob";
import { jobPostings } from "@/lib/jodsData";
import { ArrowDown } from "lucide-react";

export default function Home() {

  return (
    <div className="max-w-[1450px] m-auto h-screen px-5 ">
      <div className="mt-15 ">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-primary">
              Opportunities
            </h1>
            <p className="text-gray-500 mt-1.5">Showing 73 results</p>
          </div>
          <div className="flex">
            <p className="text-gray-500">
              Sort by: <span className="pl-2 text-primary">Most relevant </span>
            </p>
            <ArrowDown className="text-primary" size={22} />
          </div>
        </div>
        <div className="flex flex-col gap-5 pb-30">

          {jobPostings.map((jobPosting, i) => (
            <div key={i}>
              <CardJob jobPosting={jobPosting}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
