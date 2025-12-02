import { getJob } from "@/actions/getJobs"
import Error from "@/components/Error"
import JobDetails from "@/components/JobDetails"

export default async function page({params}:{params:Promise<{id:string}>}) {
  const {id} = await params
  
  const {data:jobData, error} = await getJob(id)
  if(error){
      return<Error/>
    }
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
