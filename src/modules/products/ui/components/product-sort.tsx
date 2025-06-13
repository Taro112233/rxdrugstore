"use client";

import { useProductFilters } from "../../hooks/use-product-filters"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react"

export const ProductSort = () => {
  const [filters, setFilters] = useProductFilters();

  const isNameActive = filters.sort === "name_asc" || filters.sort === "name_desc";
  const isPriceActive = filters.sort === "price_asc" || filters.sort === "price_desc";
  
  const handleNameClick = () => {
    if (filters.sort === "name_asc") {
      setFilters({ sort: "name_desc" });
    } else {
      setFilters({ sort: "name_asc" });
    }
  };

  const handlePriceClick = () => {
    if (filters.sort === "price_asc") {
      setFilters({ sort: "price_desc" });
    } else {
      setFilters({ sort: "price_asc" });
    }
  };

  const getNameIcon = () => {
    if (filters.sort === "name_asc") return <ChevronUpIcon className="size-4" />;
    if (filters.sort === "name_desc") return <ChevronDownIcon className="size-4" />;
    return null;
  };

  const getPriceIcon = () => {
    if (filters.sort === "price_asc") return <ChevronUpIcon className="size-4" />;
    if (filters.sort === "price_desc") return <ChevronDownIcon className="size-4" />;
    return null;
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white flex items-center gap-1",
          !isNameActive &&
          "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant="secondary"
        onClick={handleNameClick}
      >
        Name
        {getNameIcon()}
      </Button>
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white flex items-center gap-1",
          !isPriceActive &&
          "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant="secondary"
        onClick={handlePriceClick}
      >
        Price
        {getPriceIcon()}
      </Button>
    </div>
  )
}