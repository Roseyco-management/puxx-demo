interface PageHeaderProps {
  title: string;
  description?: string;
  lastUpdated?: string;
}

export function PageHeader({ title, description, lastUpdated }: PageHeaderProps) {
  return (
    <div className="bg-gradient-emerald text-white py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-heading mb-4">{title}</h1>
        {description && (
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">{description}</p>
        )}
        {lastUpdated && (
          <p className="text-sm text-white/75 mt-4">Last updated: {lastUpdated}</p>
        )}
      </div>
    </div>
  );
}
