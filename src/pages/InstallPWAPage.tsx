import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Download, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InstallPWAPage = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-20 pb-24 px-4">
      <div className="container max-w-2xl mx-auto">
        <Card className="shadow-xl border-2">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-4 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Smartphone className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold mb-2">
              Install Our App
            </CardTitle>
            <CardDescription className="text-base">
              Get the full mobile experience with our Progressive Web App
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {isInstalled ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-4 w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Already Installed!</h3>
                <p className="text-muted-foreground mb-6">
                  You're running the app in standalone mode
                </p>
                <Button onClick={() => navigate('/')} className="w-full max-w-xs">
                  Go to Home
                </Button>
              </div>
            ) : isInstallable ? (
              <div className="space-y-4">
                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Why Install?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Works offline - Access content without internet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Faster loading - Instant app launch</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Home screen icon - Easy access like a native app</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Full screen experience - No browser UI</span>
                    </li>
                  </ul>
                </div>

                <Button 
                  onClick={handleInstallClick}
                  className="w-full h-12 text-base"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Install App Now
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Manual Installation</h3>
                  
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium mb-2">On iPhone/iPad (Safari):</p>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground pl-2">
                        <li>Tap the Share button (square with arrow)</li>
                        <li>Scroll down and tap "Add to Home Screen"</li>
                        <li>Tap "Add" in the top right</li>
                      </ol>
                    </div>

                    <div>
                      <p className="font-medium mb-2">On Android (Chrome):</p>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground pl-2">
                        <li>Tap the menu icon (three dots)</li>
                        <li>Tap "Install app" or "Add to Home screen"</li>
                        <li>Tap "Install"</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="w-full"
                >
                  Continue in Browser
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstallPWAPage;
