"use client";

import React, { useState, useCallback } from "react";
import { Search, Compass, Library} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./ui/command";
import { DialogTitle } from "./ui/Dialog";
import { VisuallyHidden } from "./ui/VisuallyHidden";
import { useRouter } from "next/navigation";

interface CommandSearchProps {
  triggerClassName?: string;
}

export function CommandSearch({ triggerClassName }: CommandSearchProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = useCallback(async (value: string) => {
    setSearchQuery(value);
  }, []);

  const navigateTo = useCallback((path: string) => {
    router.push(path);
    setOpen(false);
  }, [router]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          triggerClassName ||
          "flex items-center w-64 pl-10 pr-4 py-2 bg-gray-50 border-0 hover:bg-white focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all duration-200 rounded-lg text-sm text-gray-500 relative"
        }
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <span>Search...</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle asChild>
          <VisuallyHidden>Search</VisuallyHidden>
        </DialogTitle>
        <CommandInput
          placeholder="Type to search..."
          value={searchQuery}
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Quick Actions">
            <CommandItem
              onSelect={() => navigateTo("/workspace/explore")}
            >
              <Compass className="mr-2" />
              <span>Explore decks</span>
            </CommandItem>
            <CommandItem
              onSelect={() => navigateTo("/workspace/library")}
            >
              <Library className="mr-2" />
              <span>My library</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Search">
            <CommandItem
              onSelect={() =>
                navigateTo(`/workspace/explore/search/${encodeURIComponent(searchQuery)}`)
              }
            >
              <Search className="mr-2" />
              <span>Search for "{searchQuery || "..."}"</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
