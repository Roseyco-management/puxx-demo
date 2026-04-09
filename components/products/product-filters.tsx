'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export interface FilterOptions {
  strength: string | null;
  flavorCategory: string | null;
  featured: boolean;
}

interface ProductFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

const STRENGTH_OPTIONS = [
  { value: 'all', label: 'All Strengths' },
  { value: '6mg', label: '6mg - Mild' },
  { value: '16mg', label: '16mg - Medium' },
  { value: '20mg', label: '20mg - Strong' },
  { value: '22mg', label: '22mg - Extra Strong' },
];

const FLAVOR_CATEGORIES = [
  { value: 'all', label: 'All Flavors' },
  { value: 'mint', label: 'Mint' },
  { value: 'fruit', label: 'Fruit' },
  { value: 'citrus', label: 'Citrus' },
  { value: 'unique', label: 'Unique' },
];

export function ProductFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: ProductFiltersProps) {
  const hasActiveFilters = filters.strength || filters.flavorCategory || filters.featured;

  const handleStrengthChange = (value: string) => {
    onFilterChange({
      ...filters,
      strength: value === 'all' ? null : value,
    });
  };

  const handleFlavorCategoryChange = (value: string) => {
    onFilterChange({
      ...filters,
      flavorCategory: value === 'all' ? null : value,
    });
  };

  const handleFeaturedChange = () => {
    onFilterChange({
      ...filters,
      featured: !filters.featured,
    });
  };

  return (
    <div className="space-y-4">
      {/* Clear filters button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="w-full"
        >
          <X className="mr-2 h-4 w-4" />
          Clear All Filters
        </Button>
      )}

      {/* Featured filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Featured</CardTitle>
        </CardHeader>
        <CardContent>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.featured}
              onChange={handleFeaturedChange}
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm">Show featured only</span>
          </label>
        </CardContent>
      </Card>

      {/* Strength filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Nicotine Strength</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={filters.strength || 'all'}
            onValueChange={handleStrengthChange}
          >
            {STRENGTH_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`strength-${option.value}`} />
                <Label
                  htmlFor={`strength-${option.value}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Flavor category filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Flavor Category</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={filters.flavorCategory || 'all'}
            onValueChange={handleFlavorCategoryChange}
          >
            {FLAVOR_CATEGORIES.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={category.value}
                  id={`flavor-${category.value}`}
                />
                <Label
                  htmlFor={`flavor-${category.value}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
