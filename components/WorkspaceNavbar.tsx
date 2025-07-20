import React from "react";
import {
  CircleFadingArrowUp,
  Compass,
  Library,
  LogOut,
  Menu,
  Settings2,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/Accordion";
import { Button } from "components/ui/Button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "components/ui/Navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "components/ui/Sheet";
import { Badge } from "components/ui/Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/Dropdown-menu";
import { getUser } from "services/user.service";
import Link from "next/link";
import Form from "next/form";
import { signOut } from "actions/auth.action";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
}

const WorkspaceNavbar = async ({
  logo = {
    url: "/workspace/library",
    alt: "logo",
    title: "Lumix",
  },
  menu = [
    {
      title: "Library",
      url: "/workspace/library",
      icon: <Library className="size-4 shrink-0" />,
    },
    {
      title: "Explore",
      url: "/workspace/explore",
      icon: <Compass className="size-4 shrink-0" />,
    },
  ],
}: Navbar1Props) => {
  const { data: user } = await getUser();
  return (
    <section className="py-4 px-6 flex justify-center fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="w-full">
        <nav className="hidden justify-between w-full lg:flex">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                src={user?.image || "/default-avatar.png"}
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <img
                    src={user?.image || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">@{user?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/workspace/settings" className="w-full h-full">
                  <DropdownMenuItem className="cursor-pointer w-full h-full">
                    <Settings2 className="size-4 shrink-0" />
                    Settings
                  </DropdownMenuItem>
                </Link>
                <Link href="/workspace/upgrade" className="w-full h-full">
                  <DropdownMenuItem className="cursor-pointer w-full h-full">
                    <CircleFadingArrowUp className="size-4 shrink-0" />
                    Upgrade Plan
                  </DropdownMenuItem>
                </Link>
                <Form action={signOut}>
                  <button type="submit" className="w-full h-full text-left">
                    <DropdownMenuItem className="cursor-pointer w-full h-full">
                      <LogOut className="size-4 shrink-0" />
                      Log out
                    </DropdownMenuItem>
                  </button>
                </Form>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url} className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Menu className="size-5 cursor-pointer" color="#292929" />
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href={logo.url} className="flex items-center gap-2">
                        <span className="text-lg font-semibold tracking-tighter">
                          {logo.title}
                        </span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    <div className="flex flex-col gap-3">
                      <Button asChild variant="outline"></Button>
                      <Button asChild></Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img
                    src={user?.image || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2">
                      <img
                        src={user?.image || "/default-avatar.png"}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold">@{user?.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {user?.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/workspace/settings" className="w-full h-full">
                      <DropdownMenuItem className="cursor-pointer w-full h-full">
                        <Settings2 className="size-4 shrink-0" />
                        Settings
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/workspace/upgrade" className="w-full h-full">
                      <DropdownMenuItem className="cursor-pointer w-full h-full">
                        <CircleFadingArrowUp className="size-4 shrink-0" />
                        Upgrade Plan
                      </DropdownMenuItem>
                    </Link>
                    <Form action={signOut}>
                      <button type="submit" className="w-full h-full text-left">
                        <DropdownMenuItem className="cursor-pointer w-full h-full">
                          <LogOut className="size-4 shrink-0" />
                          Log out
                        </DropdownMenuItem>
                      </button>
                    </Form>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>
          <div className="flex items-center gap-[5px]">
            {item.icon && (
              <span className="flex items-center justify-center w-4 h-4 text-foreground">
                {React.isValidElement(item.icon)
                  ? React.cloneElement(
                      item.icon as React.ReactElement<{ className?: string }>,
                      {
                        className: "w-4 h-4",
                      }
                    )
                  : item.icon}
              </span>
            )}
            <span>{item.title}</span>
          </div>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <Link href={item.url} legacyBehavior passHref>
        <NavigationMenuLink className="group flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground">
          <div className="flex items-center gap-[5px]">
            {item.icon && (
              <span className="flex items-center justify-center w-4 h-4 text-foreground">
                {React.isValidElement(item.icon)
                  ? React.cloneElement(
                      item.icon as React.ReactElement<{ className?: string }>,
                      {
                        className: "w-4 h-4",
                      }
                    )
                  : item.icon}
              </span>
            )}
            <span>{item.title}</span>
          </div>
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  const isSmartReview = item.title === "Adaptive Quiz";
  return (
    <Link
      key={item.title}
      href={item.url}
      className="text-md font-semibold flex items-center gap-1"
    >
      {item.title}
      {isSmartReview && (
        <Badge variant="secondary" className="bg-primary text-white ml-1">
          AI
        </Badge>
      )}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  const isSmartReview = item.title === "Adaptive Quiz";
  return (
    <Link
      href={item.url}
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
    >
      <div className="flex items-center justify-center w-4 h-4 text-foreground flex-shrink-0">
        {item.icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold flex items-center gap-1">
          {item.title}
          {isSmartReview && (
            <Badge variant="secondary" className="bg-primary text-white ml-1">
              AI
            </Badge>
          )}
        </div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { WorkspaceNavbar };
