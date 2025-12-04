"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { syncUser } from "@/lib/actions/user.action";

const SyncUser = () => {
  const { user } = useUser();

  useEffect(() => {
    const sync = async () => {
      try {
        if (user) {
          await syncUser();
        }
      } catch (error) {
        console.log(error);
      }
    };
    sync();
  }, [user]);
  return null;
};

export default SyncUser;
