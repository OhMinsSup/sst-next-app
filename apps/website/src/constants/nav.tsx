import type { LucideIcon } from "lucide-react";

import { cn } from "@thread/ui";

import { Icons } from "~/components/icons";
import { PAGE_ENDPOINTS } from "./constants";

export interface NavItem {
  id:
    | "home"
    | "search"
    | "thread"
    | "activity"
    | "myPage"
    | "all"
    | "follow"
    | "replies"
    | "mentions"
    | "reposts";

  type: "link" | "myPage" | "home" | "thread";
  title: string;
  href?: string;
  relationHrefs?: string[];
  disabled?: boolean;
  icon: LucideIcon;
  relationIcons?: Record<string, LucideIcon>;
}

export type ScrollNavItem = Pick<NavItem, "id" | "type" | "title"> & {
  href: string;
};

export const NAV_CONFIG = {
  mainNav: [
    {
      id: "home",
      type: "home",
      title: "Home",
      href: PAGE_ENDPOINTS.ROOT,
      icon: Icons.home,
      relationHrefs: [PAGE_ENDPOINTS.ROOT, PAGE_ENDPOINTS.FOLLOWING],
      relationIcons: {
        [PAGE_ENDPOINTS.FOLLOWING]: Icons.users,
        [PAGE_ENDPOINTS.ROOT]: Icons.home,
      },
    },
    {
      id: "search",
      type: "link",
      title: "Search",
      href: PAGE_ENDPOINTS.SEARCH,
      icon: Icons.search,
    },
    {
      id: "thread",
      type: "link",
      title: "New Thread",
      href: PAGE_ENDPOINTS.THREADS.ROOT,
      icon: Icons.pen,
    },
    {
      id: "activity",
      type: "link",
      title: "Activity",
      href: PAGE_ENDPOINTS.ACTIVITY.ROOT,
      icon: Icons.heart,
      relationHrefs: Object.values(PAGE_ENDPOINTS.ACTIVITY),
    },
    {
      id: "myPage",
      type: "myPage",
      title: "My Page",
      icon: Icons.user,
    },
  ] as NavItem[],
  scrollNav: [
    {
      id: "all",
      type: "like",
      title: "모두",
      href: PAGE_ENDPOINTS.ACTIVITY.ROOT,
    },
    {
      id: "follow",
      type: "link",
      title: "팔로우",
      href: PAGE_ENDPOINTS.ACTIVITY.FOLLOWS,
    },
    {
      id: "replies",
      type: "link",
      title: "답글",
      href: PAGE_ENDPOINTS.ACTIVITY.REPLIES,
    },
    {
      id: "mentions",
      type: "link",
      title: "언급",
      href: PAGE_ENDPOINTS.ACTIVITY.MENTIONS,
    },
    {
      id: "reposts",
      type: "link",
      title: "리포스트",
      href: PAGE_ENDPOINTS.ACTIVITY.REPOSTS,
    },
  ] as ScrollNavItem[],
};

interface MainNavbuttonVariantsParams {
  item: NavItem;
  type: "footer" | "header";
  isActive?: boolean;
  isPending?: boolean;
  isTransitioning?: boolean;
}

export const mainNavbuttonVariants = ({
  item,
  type,
  isActive,
}: MainNavbuttonVariantsParams) => {
  return cn(
    type === "header"
      ? "mx-[2px] my-1 flex items-center px-6 py-3 text-lg font-medium transition-colors hover:rounded-md hover:bg-foreground/5 sm:text-sm lg:px-8 lg:py-5"
      : undefined,
    type === "footer"
      ? "flex h-10 items-center p-4 text-lg font-medium transition-colors hover:rounded-md hover:bg-foreground/5 sm:text-sm"
      : undefined,
    isActive ? "text-foreground" : "text-foreground/60",
    item.disabled && "cursor-not-allowed opacity-80",
  );
};
