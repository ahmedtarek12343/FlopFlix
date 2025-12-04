"use server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const syncUser = async () => {
  try {
    const user = await currentUser();
    if (!user) return;

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (existingUser) return existingUser;

    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to sync user");
  }
};
