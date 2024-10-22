import {
  UserRoundPlus,
  Home,
  UserRoundSearch,
  FileSearch2,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Consulta de Personaje",
    url: "/user/consultation-character",
    icon: UserRoundSearch,
  },
  {
    title: "Creacion de Personaje",
    url: "#",
    icon: UserRoundPlus,
  },
  {
    title: "Consulta de Episodio",
    url: "#",
    icon: FileSearch2,
  },
  {
    title: "Logout",
    url: "/",
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar style={{ backgroundColor: "#FAFAFA" }}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
