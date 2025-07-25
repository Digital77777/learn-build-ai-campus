import { Shield } from "lucide-react";

const SecurityTrustSection = () => (
  <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
    <div className="container mx-auto px-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          <Shield className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Secure & Trusted</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your transactions are protected with secure payment processing, verified profiles, and comprehensive dispute resolution
        </p>
      </div>
    </div>
  </section>
);

export default SecurityTrustSection;
