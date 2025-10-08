import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) => {
  return (
    <section className="py-8 border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};
