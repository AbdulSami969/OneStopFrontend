export default function StaticTestimonials() {
  return (
    <section className="py-10 md:py-16 bg-gray-light">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">What Our Customers Say</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-4">
              "1 Stop Pest Control provided excellent service! They were prompt, professional, and completely eliminated
              our pest problem. Highly recommended for anyone in the Albany area."
            </p>
            <p className="font-medium">- Sarah M., Albany</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-4">
              "Great experience with 1 Stop Pest Control. They took care of our ant problem quickly and efficiently. The
              technician was knowledgeable and explained everything thoroughly."
            </p>
            <p className="font-medium">- John D., Schenectady</p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-4">
              "We had a serious bed bug issue and 1 Stop Pest Control's heat treatment worked perfectly. No chemicals
              and no bugs! Worth every penny for the peace of mind."
            </p>
            <p className="font-medium">- Lisa T., Troy</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.google.com/search?q=1+stop+pest+control+albany+ny+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-pest-red rounded-md shadow-md hover:bg-red-700 transition-colors duration-300"
          >
            Read More Google Reviews
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
