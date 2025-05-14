export default function ServiceAreas() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="section-title">Service Areas</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          1 Stop Pest Control proudly serves the entire Albany Capital Region including:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            "Albany",
            "Rensselaer",
            "Troy",
            "Schenectady",
            "Colonie",
            "Clifton Park",
            "Latham",
            "Delmar",
            "Guilderland",
            "East Greenbush",
            "Cohoes",
            "Watervliet",
            "Saratoga Springs",
            "Ballston Spa",
            "Malta",
            "Glenville",
          ].map((city, index) => (
            <div
              key={index}
              className="bg-gray-light rounded-lg p-3 text-center hover:bg-pest-red hover:text-white transition-colors"
            >
              {city}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
