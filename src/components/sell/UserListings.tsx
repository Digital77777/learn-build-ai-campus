import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const UserListings = ({ listings }: { listings: any[] }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Your Listings</h2>
    <div className="space-y-4">
      {listings.map((listing) => (
        <Card key={listing.id}>
          <CardContent className="p-4">
            <h3 className="font-semibold">{listing.title}</h3>
            <p className="text-muted-foreground">{listing.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold text-primary">${listing.price}</span>
              <Badge variant="secondary">{listing.category}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default UserListings;
