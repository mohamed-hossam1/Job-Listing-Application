import { URL } from "@/lib/baseURL";
import axios from "axios";

export async function getAllJobs() {
  try {
    const { data } = await axios.get(`${URL}/opportunities/search`);
    return {error: false, data: data.data}
  } catch (err) {
    return {error: true, data: []}
  }
}

export async function getJob(jobUrl:string) {
  try {
    const { data } = await axios.get(`${URL}/opportunities/${jobUrl}`);
    return {error: false, data: data.data}
  } catch (err) {
    return {error: true, data: []}
  }
}