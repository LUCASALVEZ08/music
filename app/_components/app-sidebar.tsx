import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/app/_components/ui/sidebar";
import Image from "next/image";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";

const data = {
  navMain: [
    {
      items: [
        {
          subtitle: "Inicio",
          url: "#",
        },
        {
          subtitle: "Explorar",
          url: "#",
        },
        {
          subtitle: "Bibliotecas",
          url: "#",
        },
      ],
    },
    {
      title: "Suas atividades",
      items: [
        {
          subtitle: "Curtidas",
          url: "#",
        },
        {
          subtitle: "Comentários",
          url: "#",
        },
      ],
    },
    {
      title: "Playlist",
      url: "#",
      items: [
        {
          subtitle: "Components",
          url: "#",
        },
        {
          subtitle: "File Conventions",
          url: "#",
        },
        {
          subtitle: "Functions",
          url: "#",
        },
        {
          subtitle: "next.config.js Options",
          url: "#",
        },
        {
          subtitle: "CLI",
          url: "#",
        },
        {
          subtitle: "Edge Runtime",
          url: "#",
        },
      ],
    },
  ],
};

export default function SidebarComponent({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="h-screen w-56 border-r-1 border-[#8B8282]" collapsible="none" {...props}>
      <SidebarHeader>
        <Image src="/image.png" width={100} height={100} alt="Logo" />
      </SidebarHeader>
      <SidebarContent className="-mt-10">
        {data.navMain.map(item => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-xs font-semibold text-white/24">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {item.items &&
                  item.items.map(subItem => (
                    <SidebarMenuItem key={subItem.subtitle}>
                      <SidebarMenuButton asChild>
                        <a href={subItem.url} className="text-2xl font-semibold text-white">
                          {subItem.subtitle}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <div className="mt-2 flex items-center justify-center">
          <Button
            variant="ghost"
            className="w-3/4 cursor-pointer rounded-3xl border border-solid text-white"
          >
            <PlusIcon />
            Nova Playlist
          </Button>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
