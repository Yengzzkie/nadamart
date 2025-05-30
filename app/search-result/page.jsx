"use client"
import { usePostSearchResult } from "@/stores/store";

const page = () => {
  const { postSearchResult } = usePostSearchResult();
  console.log(postSearchResult);

  return (
    <div>page</div>
  )
}

export default page