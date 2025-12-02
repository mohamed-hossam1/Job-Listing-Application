import JobDetails from "@/components/JobDetails"
import { jobPostings } from "@/lib/jodsData"

export default async function page({params}:{params:Promise<{id:number}>}) {
  const {id} = await params
  
  const jobData = jobPostings.filter(jobPosting=>jobPosting.id==id)[0]
  return (
    <div className="max-w-[1450px] m-auto h-screen px-5 mb-30">
      <div className="mt-15">
        <div className="flex justify-between items-center mb-10">
          <JobDetails jobData={jobData} />
        </div>
      </div>
    </div>

  )
}
