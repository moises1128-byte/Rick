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
    url: "/user",
    icon: Home,
  },
  {
    title: "Consulta de Personaje",
    url: "/user/consultation-character",
    icon: UserRoundSearch,
  },
  {
    title: "Creacion de Personaje",
    url: "/user/character-creation",
    icon: UserRoundPlus,
  },
  {
    title: "Consulta de Episodio",
    url: "/user/consultation-episodes",
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
    <Sidebar>
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
                      {item.title === "Logout" ? (
                        <span className="hover:text-[#00B5CC]">{item.title}</span>
                      ) : (
                        <span>{item.title}</span>
                      )}
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
