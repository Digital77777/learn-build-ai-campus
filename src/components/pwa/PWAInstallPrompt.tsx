
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';

export const PWAInstallPrompt = () => {
  const { installPrompt, handleInstall } = usePWAInstall();

  if (!installPrompt) return null;

  return (
    <>
      <Toaster />
      <div className="fixed bottom-4 right-4 z-50">
        {toast('Install App', {
          description: 'Get the full experience. Install our app on your device.',
          action: (
            <Button onClick={handleInstall} size="sm">
              Install
            </Button>
          ),
        })}
      </div>
    </>
  );
};
