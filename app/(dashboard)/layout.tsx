import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import RouteTransition from "@/components/DashboardLayout";
import { ExpandingOverlay } from "@/components/ExpandingOverlay";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="sticky top-0" />
      <main className="p-5 md:p-10 flex-1">
        <RouteTransition>{children}</RouteTransition>
        <ExpandingOverlay />
      </main>
    </SidebarProvider>
  );
}
