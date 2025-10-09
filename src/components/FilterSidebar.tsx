import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export interface FilterOptions {
  categories: string[];
  regions: string[];
  statuses: string[];
}

interface FilterSidebarProps {
  filters: FilterOptions;
  selectedFilters: {
    categories: string[];
    regions: string[];
    statuses: string[];
  };
  onFilterChange: (type: keyof FilterOptions, value: string) => void;
  onClearAll: () => void;
}

export function FilterSidebar({ 
  filters, 
  selectedFilters, 
  onFilterChange,
  onClearAll 
}: FilterSidebarProps) {
  const hasActiveFilters = 
    selectedFilters.categories.length > 0 ||
    selectedFilters.regions.length > 0 ||
    selectedFilters.statuses.length > 0;

  return (
    <Card className="p-6 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">필터</h3>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearAll}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="w-4 h-4 mr-1" />
            초기화
          </Button>
        )}
      </div>

      {/* 카테고리 필터 */}
      <div className="mb-6">
        <h4 className="mb-3 text-gray-900">카테고리</h4>
        <div className="space-y-2">
          {filters.categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedFilters.categories.includes(category)}
                onCheckedChange={() => onFilterChange("categories", category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="cursor-pointer text-gray-700"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* 지역 필터 */}
      <div className="mb-6">
        <h4 className="mb-3 text-gray-900">지역</h4>
        <div className="space-y-2">
          {filters.regions.map((region) => (
            <div key={region} className="flex items-center space-x-2">
              <Checkbox
                id={`region-${region}`}
                checked={selectedFilters.regions.includes(region)}
                onCheckedChange={() => onFilterChange("regions", region)}
              />
              <Label
                htmlFor={`region-${region}`}
                className="cursor-pointer text-gray-700"
              >
                {region}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* 상태 필터 */}
      <div>
        <h4 className="mb-3 text-gray-900">상태</h4>
        <div className="space-y-2">
          {filters.statuses.map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={`status-${status}`}
                checked={selectedFilters.statuses.includes(status)}
                onCheckedChange={() => onFilterChange("statuses", status)}
              />
              <Label
                htmlFor={`status-${status}`}
                className="cursor-pointer text-gray-700"
              >
                {status}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}