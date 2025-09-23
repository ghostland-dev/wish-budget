import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterBarProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  showPurchased: boolean;
  onShowPurchasedChange: (show: boolean) => void;
}

export const FilterBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  showPurchased,
  onShowPurchasedChange
}: FilterBarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card/60 backdrop-blur-sm rounded-lg border border-border/50 animate-fade-in">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Filtres:</span>
      </div>
      
      <Select
        value={selectedCategory || "all"}
        onValueChange={(value) => onCategoryChange(value === "all" ? null : value)}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Toutes les catégories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les catégories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Button
          variant={!showPurchased ? "default" : "outline"}
          size="sm"
          onClick={() => onShowPurchasedChange(false)}
        >
          Non achetés
        </Button>
        <Button
          variant={showPurchased ? "default" : "outline"}
          size="sm"
          onClick={() => onShowPurchasedChange(true)}
        >
          Achetés
        </Button>
      </div>

      {(selectedCategory || showPurchased) && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtres actifs:</span>
          {selectedCategory && (
            <Badge variant="secondary" className="gap-1">
              {selectedCategory}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 hover:bg-transparent"
                onClick={() => onCategoryChange(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {showPurchased && (
            <Badge variant="secondary" className="gap-1">
              Achetés uniquement
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 hover:bg-transparent"
                onClick={() => onShowPurchasedChange(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};