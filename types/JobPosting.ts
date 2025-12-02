export interface JobPosting {
  id: string
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType:string
  startDate:string
  endDate: string
  deadline: string
  location:string[]
  requiredSkills:string[]
  whenAndWhere: string;
  createdBy:string
  status:string
  datePosted:string
  orgName:string
  orgEmail:string
  orgPrimaryPhone:string
  company: string;
  logoUrl: string;
}
