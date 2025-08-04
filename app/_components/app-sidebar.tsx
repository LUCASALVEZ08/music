import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/app/_components/ui/sidebar";
import Image from "next/image";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { data } from "../_utils/data";
import SidebarMenuButtonComponent from "./sidebar-menu-button";

export default function SidebarComponent({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="h-screen w-56 border-r-1 border-[#8B8282]" collapsible="none" {...props}>
      <SidebarHeader>
        <Image src="/image.png" width={100} height={100} alt="Logo" />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item, index) => (
          <SidebarGroup key={item.title || `group-${index}`}>
            {item.title && (
              <SidebarGroupLabel className="text-xs font-semibold text-white/24">
                {item.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {item.items &&
                  item.items.map(subItem => (
                    <SidebarMenuItem key={subItem.subtitle}>
                      <SidebarMenuButtonComponent subItem={subItem} />
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
