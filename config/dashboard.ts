import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Events",
      href: "/dashboard",
      icon: "events",
    },
    { 
      title: "Posts",
      href: "/dashboard/posts",
      icon: "post",
    },
    {
      title: "Staff",
      href: "/dashboard/staff",
      icon: "staff",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Log Out",
      href: "/logout",
      icon: "close",
    }
  ],
}
