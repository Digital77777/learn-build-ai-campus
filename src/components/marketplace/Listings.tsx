import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Listings = ({ listings }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <Card key={listing.id}>
          <CardHeader>
            <CardTitle>{listing.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{listing.seller}</p>
            <p className="text-lg font-semibold">{listing.price}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge>{listing.type}</Badge>
              <Badge variant="secondary">{listing.category}</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Link to={`/listing/${listing.id}`} className="w-full">
              <Button className="w-full">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default Listings
