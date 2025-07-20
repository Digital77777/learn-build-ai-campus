import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory = "All", onCategorySelect }: CategoryFilterProps) => {
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
              onClick={() => onCategorySelect?.(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;