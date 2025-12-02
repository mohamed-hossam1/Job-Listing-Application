import { About } from "./About";
import { IdealCandidate } from "./IdealCandidate";

export interface JobPosting {
  id: number
  title: string;
  description: string;
  responsibilities: string[];
  ideal_candidate: IdealCandidate;
  when_where: string;
  about: About;
  company: string;
  image: string;
}
