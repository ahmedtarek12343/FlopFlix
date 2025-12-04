"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const HandleUnauthorized = () => {
  const searchParams = useSearchParams();
  const unauthorized = searchParams.get("unauthorized");

  useEffect(() => {
    if (unauthorized) {
      toast.error("Please sign in to access this page");
    }
  }, [unauthorized]);

  return null;
};

export default HandleUnauthorized;
