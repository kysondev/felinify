"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@ui/Input";
import { Button } from "@ui/button";

interface SearchFormProps {
  placeholder?: string;
  className?: string;
}

export const SearchForm = ({
  placeholder = "Search for decks by topic, subject, or creator...",
  className = "",
}: SearchFormProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      router.push(`/explore/search/${encodedQuery}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col lg:flex-row gap-4 ${className}`}
    >
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          placeholder={placeholder}
          className="pl-12 py-3 text-base focus:border-primary transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        className="lg:w-auto"
        disabled={!searchQuery.trim()}
      >
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>
    </form>
  );
};
