import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from '@/components/Navigation';

const StartSellingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Sell Your Tool</CardTitle>
            <CardDescription>Fill out the form below to list your tool on the marketplace.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Tool Name</Label>
                <Input id="name" placeholder="Enter the name of your tool" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your tool" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (in USD)</Label>
                <Input id="price" type="number" placeholder="Enter the price" />
              </div>
              <Button type="submit" className="w-full">
                List My Tool
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StartSellingPage;
