import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main style={{ width: "100%" }}>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
