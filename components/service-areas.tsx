// Define props type
type ServiceAreasProps = {
  data?: any;
};

export default function ServiceAreas({ data }: ServiceAreasProps = {}) {
  // Use data from Sanity if available, otherwise use default values
  const title = data?.title || "Service Areas";
  const description = data?.description || "1 Stop Pest Control proudly serves the entire Albany Capital Region including:";

  // Use areas from Sanity data if available, otherwise use default list
  const defaultAreas = ["Albany", "Rensselaer", "Troy", "Schenectady", "Colonie", "Clifton Park", "Latham", "Delmar", "Guilderland", "East Greenbush", "Cohoes", "Watervliet", "Saratoga Springs", "Ballston Spa", "Malta", "Glenville"];

  const areas = data?.areas || defaultAreas;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="section-title">{title}</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">{description}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {areas.map((city: string, index: number) => (
            <div key={index} className="bg-gray-light rounded-lg p-3 text-center hover:bg-pest-red hover:text-white transition-colors">
              {city}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
