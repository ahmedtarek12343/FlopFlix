"use client";
import { usePaginationStore } from "@/store/pagination.store";
import { Button } from "../ui/button";
const Pagination = () => {
  const { pageNum, setPageNum } = usePaginationStore();
  return (
    <div className="flex justify-center items-center w-full mt-8">
      <Button
        variant="ghost"
        onClick={() => setPageNum(pageNum - 1)}
        className="mr-5 md:block hidden"
        disabled={pageNum === 1}
      >
        Previous
      </Button>
      <div className="flex gap-6 flex-wrap justify-center">
        {[...Array(10)].map((_, index) => (
          <Button
            variant="ghost"
            key={index}
            onClick={() => setPageNum(index + 1)}
            className={pageNum === index + 1 ? "bg-primary text-white" : ""}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      <Button
        variant="ghost"
        onClick={() => setPageNum(pageNum + 1)}
        className="ml-5 md:block hidden"
        disabled={pageNum === 10}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
