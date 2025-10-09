import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { FilterSidebar, FilterOptions } from "./FilterSidebar";
import { ContentCard, ContentCardData, ContentType } from "./ContentCard";

interface ContentListLayoutProps {
  title: string;
  description: string;
  type: ContentType;
  data: ContentCardData[];
  filters: FilterOptions;
  onCardClick?: (id: string) => void;
}

export function ContentListLayout({
  title,
  description,
  type,
  data,
  filters,
  onCardClick,
}: ContentListLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [showFilters, setShowFilters] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<{
    categories: string[];
    regions: string[];
    statuses: string[];
  }>({
    categories: [],
    regions: [],
    statuses: [],
  });

  const handleFilterChange = (type: keyof FilterOptions, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      categories: [],
      regions: [],
      statuses: [],
    });
  };

  // 필터링 및 검색
  const filteredData = data.filter((item) => {
    // 검색 필터
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // 카테고리 필터
    if (selectedFilters.categories.length > 0 && 
        !selectedFilters.categories.includes(item.category)) {
      return false;
    }

    // 지역 필터
    if (selectedFilters.regions.length > 0 && 
        !selectedFilters.regions.includes(item.region)) {
      return false;
    }

    // 상태 필터
    if (selectedFilters.statuses.length > 0 && 
        !selectedFilters.statuses.includes(item.status)) {
      return false;
    }

    return true;
  });

  // 정렬
  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "popular":
        return (b.participants || 0) - (a.participants || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Sort Bar */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="oldest">오래된순</SelectItem>
              {type === "discussion" && (
                <SelectItem value="popular">참여자 많은순</SelectItem>
              )}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            필터 {showFilters ? "숨기기" : "보기"}
          </Button>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          총 <span className="text-blue-600">{sortedData.length}</span>개의 결과
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          {showFilters && (
            <div className="lg:col-span-1">
              <FilterSidebar
                filters={filters}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearFilters}
              />
            </div>
          )}

          {/* Content List */}
          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedData.map((item) => (
                <ContentCard
                  key={item.id}
                  data={item}
                  type={type}
                  onClick={() => onCardClick?.(item.id)}
                />
              ))}
            </div>

            {sortedData.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}