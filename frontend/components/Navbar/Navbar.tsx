"use client";

import * as React from "react";
import classes from "./Navbar.module.css";
import { cn } from "@/lib/utils";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className={`mt-12 m-auto flex justify-center ${classes.navbar} w-[60%] h-[3.5rem] rounded-lg`}>
      <NavigationMenu>
        <NavigationMenuList className="flex gap-[70rem]">
          <div>
            <NavigationMenuItem>Request</NavigationMenuItem>
          </div>
          <div className="flex gap-2">
            <NavigationMenuItem>
              <ConnectButton.Custom>
                {({ account, chain, openAccountModal, openConnectModal, authenticationStatus, mounted }) => {
                  const ready = mounted && authenticationStatus !== "loading";
                  const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

                  return (
                    <div
                      {...(!ready && {
                        "aria-hidden": true,
                        style: {
                          opacity: 0,
                          pointerEvents: "none",
                          userSelect: "none",
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return <Button onClick={openConnectModal}>Sign In</Button>;
                        }

                        return (
                          <div style={{ display: "flex", gap: 12 }}>
                            <Button onClick={openAccountModal} type="button">
                              {account.displayName}
                            </Button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
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
