type StrategySectionProps = {
    title: string;
    imageSrc: string;
    description?: string;
  };
  
  const StrategySection = ({ title, imageSrc, description }: StrategySectionProps) => {
    return (
      <div className="bg-gray-700 text-white p-4 m-4 rounded-lg hover:scale-105 transition-transform">
        <h2 className="text-xl font-bold">{title}</h2>
        <img src={imageSrc} alt={title} className="rounded-lg" />
        {description && <p className="mt-2">{description}</p>}
      </div>
    );
  };
  
  export default StrategySection;
  