import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Palette, Globe, Code, Upload, Crown, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function CreatorSuitePage() {
  const { toast } = useToast();
  const [brandName, setBrandName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [logoUrl, setLogoUrl] = useState('');

  const handleSaveBranding = () => {
    toast({
      title: "Branding Updated",
      description: "Your custom branding has been saved successfully.",
    });
  };

  const whitelabelFeatures = [
    'Custom domain mapping',
    'Remove platform branding',
    'Custom email templates',
    'Branded certificates',
    'Custom color schemes',
    'Logo customization'
  ];

  const customizationOptions = [
    {
      title: 'Brand Colors',
      description: 'Set your primary and accent colors',
      icon: Palette
    },
    {
      title: 'Logo & Assets',
      description: 'Upload your logo and brand assets',
      icon: Upload
    },
    {
      title: 'Custom Domain',
      description: 'Use your own domain name',
      icon: Globe
    },
    {
      title: 'API Access',
      description: 'Integrate with your systems',
      icon: Code
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Pro Creator Suite</h1>
          <p className="text-muted-foreground">White-label options and custom branding for your business</p>
        </div>
        <Badge variant="default" className="ml-auto">Career Tier</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="branding" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="branding">Branding</TabsTrigger>
              <TabsTrigger value="domain">Domain</TabsTrigger>
              <TabsTrigger value="api">API Access</TabsTrigger>
            </TabsList>

            <TabsContent value="branding" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Brand Customization</CardTitle>
                  <CardDescription>Customize the look and feel with your brand identity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="brandName">Brand Name</Label>
                    <Input
                      id="brandName"
                      placeholder="Enter your brand name"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-3">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-20 h-10 cursor-pointer"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        placeholder="#6366f1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input
                      id="logo"
                      placeholder="https://your-domain.com/logo.png"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload your logo to a hosting service and paste the URL here
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-muted/30">
                    <h4 className="font-semibold mb-2">Preview</h4>
                    <div className="flex items-center gap-3 p-4 bg-background rounded border" style={{ borderColor: primaryColor }}>
                      {logoUrl ? (
                        <img src={logoUrl} alt="Brand logo" className="h-10" />
                      ) : (
                        <div className="h-10 w-10 rounded bg-gradient-to-br from-primary to-accent" />
                      )}
                      <span className="font-bold" style={{ color: primaryColor }}>
                        {brandName || 'Your Brand Name'}
                      </span>
                    </div>
                  </div>

                  <Button onClick={handleSaveBranding} className="w-full" size="lg">
                    Save Branding
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="domain" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Domain</CardTitle>
                  <CardDescription>Connect your own domain to this platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="domain">Your Domain</Label>
                    <Input
                      id="domain"
                      placeholder="ai.yourdomain.com"
                    />
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-3">
                    <h4 className="font-semibold">DNS Configuration</h4>
                    <p className="text-sm text-muted-foreground">
                      Add these DNS records to your domain provider:
                    </p>
                    <div className="font-mono text-xs bg-background p-3 rounded border">
                      <div>Type: CNAME</div>
                      <div>Name: ai</div>
                      <div>Value: platform.yourdomain.com</div>
                    </div>
                  </div>

                  <Button className="w-full">Connect Domain</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Access</CardTitle>
                  <CardDescription>Integrate our AI tools into your own applications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <div className="flex gap-2">
                      <Input value="sk_live_••••••••••••••••" readOnly />
                      <Button variant="outline">Regenerate</Button>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">API Documentation</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Access our comprehensive API docs to integrate AI tools:
                    </p>
                    <Button variant="outline" className="w-full">
                      View API Docs
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Available Endpoints</h4>
                    <div className="space-y-2">
                      {[
                        '/api/v1/tools/analyze',
                        '/api/v1/tools/generate',
                        '/api/v1/marketplace/listings',
                        '/api/v1/analytics/data'
                      ].map((endpoint) => (
                        <div key={endpoint} className="flex items-center justify-between p-2 border rounded text-sm">
                          <code className="text-primary">{endpoint}</code>
                          <Badge variant="outline">GET/POST</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                White-Label Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {whitelabelFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customization Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {customizationOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div key={option.title} className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{option.title}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Sparkles className="h-8 w-8 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Need Custom Integration?</h3>
              <p className="text-muted-foreground mb-4">
                Our team can help you build custom integrations and white-label solutions tailored to your business needs.
              </p>
              <Button>Contact Integration Team</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
