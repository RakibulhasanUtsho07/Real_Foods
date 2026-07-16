import UserInfoCard from "@/components/user/ProfileCard";
import UserActivityLog from "@/components/user/UserActivityLog";
import { getSessionData } from "@/lib/core/session";
import { redirect } from "next/navigation";


export default async function UserProfilePage() {
    const user = await getSessionData()
      if (!user) {
        redirect("/login"); // ⚠️ point this to your real login route
      }
    
      if (user?.role !== "user") {
        redirect("/");
      }
      // 
  // এখানে আপনার সেশন বা বেস ডেটা অ্যাকশন থেকে ফিড করতে পারেন।
  const mockUserData = {
    name: "Rakibul Hasan",
    email: "rakib@example.com",
    role: "user",
    avatar: "",
    joinedAt: "January 2026",
    totalOrders: 12,
    totalSpent: 184.50
  };

  return (
    <div className="min-h-screen bg-[#FBF6EC]/40 p-4 sm:p-6 lg:p-8 space-y-8 mt-12 lg:mt-0">
      <div>
        <h1 className="text-3xl font-black text-[#2B1B14] tracking-tight">My Profile</h1>
        <p className="text-sm text-[#7A6A5C] font-semibold mt-0.5">Manage your personal details and track your app activities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <UserInfoCard user={mockUserData} />
        </div>
        <div className="lg:col-span-2">
          <UserActivityLog />
        </div>
      </div>
    </div>
  );
}