const HowItWorksSection = () => (
  <section className="py-16">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Simple steps to start selling, buying, or hiring in the AI marketplace
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
            1
          </div>
          <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
          <p className="text-muted-foreground">
            Set up your profile, showcase your skills, and build your reputation
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
            2
          </div>
          <h3 className="text-xl font-semibold mb-2">List or Browse</h3>
          <p className="text-muted-foreground">
            Create listings for your services or browse available opportunities
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
            3
          </div>
          <h3 className="text-xl font-semibold mb-2">Connect & Transact</h3>
          <p className="text-muted-foreground">
            Secure transactions with built-in protection and payment processing
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
