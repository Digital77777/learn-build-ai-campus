const HeroStats = () => {
  const stats = [
    { value: "5", label: "AI Tools" },
    { value: "12", label: "Learning Paths" },
    { value: "100%", label: "Free Access" }
  ];

  return (
    <div className="grid grid-cols-3 gap-6 pt-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-2xl font-bold text-primary">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;