import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Checkbox } from "@/components/ui/checkbox"
  import { Label } from "@/components/ui/label"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  const FiltersSidebar = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Refine your search</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="multiple" defaultValue={["category", "price"]}>
            <AccordionItem value="category">
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="templates" />
                  <Label htmlFor="templates">Templates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="consulting" />
                  <Label htmlFor="consulting">Consulting</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="full-time" />
                  <Label htmlFor="full-time">Full-time</Label>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="price">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="Min" />
                  <span>-</span>
                  <Input type="number" placeholder="Max" />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Apply Filters</Button>
        </CardFooter>
      </Card>
    )
  }

  export default FiltersSidebar
