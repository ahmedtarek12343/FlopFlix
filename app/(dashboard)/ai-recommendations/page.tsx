import UpgradeToPremium from "@/components/pro/UpgradeToPremium";
import { auth } from "@clerk/nextjs/server";
import { Chat } from "@/components/Ai/Chat";

const page = async () => {
  const { has } = await auth();
  const hasPremiumAccess = has({ plan: "paid" });

  if (!hasPremiumAccess) {
    return <UpgradeToPremium />;
  }
  return (
    <div>
      <Chat />
    </div>
  );
};

export default page;
