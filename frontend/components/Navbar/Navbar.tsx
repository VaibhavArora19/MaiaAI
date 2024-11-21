"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import classes from "./Navbar.module.css";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className={`mt-12 m-auto flex justify-center ${classes.navbar} w-[35%] h-[3.5rem] rounded-lg`}>
      <NavigationMenu>
        <NavigationMenuList className="flex gap-[32rem]">
          <div>
            <NavigationMenuItem>Request</NavigationMenuItem>
          </div>
          <div className="flex gap-2">
            <NavigationMenuItem>
              <Button variant={"outline"} className="h-8 w-20">
                Signup
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button className="h-8 w-20">Login</Button>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
