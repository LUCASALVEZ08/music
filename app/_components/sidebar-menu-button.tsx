"use client";

import Link from "next/link";
import { NavGroup } from "../_utils/data";
import { SidebarMenuButton } from "./ui/sidebar";
import { usePathname } from "next/navigation";

interface SidebarMenuButtonComponentProps {
  subItem: Pick<NavGroup, "url" | "subtitle">;
}

const SidebarMenuButtonComponent = ({ subItem }: SidebarMenuButtonComponentProps) => {
  const usePathName = usePathname();
  return (
    <SidebarMenuButton
      asChild
      isActive={usePathName === subItem.url}
      variant={usePathName === subItem.url ? "outline" : "default"}
    >
      <Link href={subItem.url || "#"} className="text-2xl font-semibold text-white">
        {subItem.subtitle}
      </Link>
    </SidebarMenuButton>
  );
};

export default SidebarMenuButtonComponent;
