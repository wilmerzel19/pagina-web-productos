import React from 'react';
import Banner from '../components/ui/Banner';
import FeaturedSection from '../components/ui/FeaturedSection';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Heart } from 'lucide-react';
import { count } from 'firebase/firestore';

const HomePage: React.FC = () => {
  return (
    <div>
      <Banner
        title="Instalamos portones eléctricos EN NICARAGUA"
        subtitle="Descubre la comodidad y seguridad de nuestros portones eléctricos"
        ctaText="Shop Now"
        ctaLink="/store"
        height="large"
      />

      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Colecciones Destacadas</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/store?category=${category.slug}`}
                className="group block"
              >
                <div className="relative rounded-lg overflow-hidden h-64">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                      <p className="text-amber-200 text-sm">{category.count} Productos</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturedSection />

      <section className="py-16 bg-amber-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="bg-amber-700 inline-flex p-4 rounded-full mb-4">
                <ShoppingBag size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Productos de calidad </h3>
              <p className="text-amber-100">Cada producto es cuidadosamente fabricado</p>
            </div>

            <div className="p-6">
              <div className="bg-amber-700 inline-flex p-4 rounded-full mb-4">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Hecho Con amor</h3>
              <p className="text-amber-100"> </p>
            </div>

            <div className="p-6">
              <div className="bg-amber-700 inline-flex p-4 rounded-full mb-4">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Soporte al Cliente</h3>
              <p className="text-amber-100">¿Tienes preguntas? Nuestro equipo está aquí para ayudarte con tu compra.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Historia</h2>
          <p className="text-lg text-gray-700 mb-8">
            Somos Cormetal S.A., una empresa que nace en el año 2003 como un taller de soldadura convencional con dos empleados, nos fuimos abriendo puertas en el mercado con productos nacionales, teniendo una buena aceptación de nuestros clientes. Nos hemos establecido en el mercado nacional, ahora somos una empresa con más de 30 empleados importando nuestros productos de fábrica de dos continentes.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-md transition-colors duration-300"
          >
            Contactanos
          </Link>
        </div>
      </section>
    </div>
  );
};

// Sample category data
const categories = [
  {
    name: 'Portones Eléctricos',
    slug: 'portones-electricos',
    count: 12,

    image: 'https://lirp.cdn-website.com/6e2add9c/dms3rep/multi/opt/8-1920w.jpg'
  },
  {
    name: 'Portones Eléctricos',
    slug: 'portones-electricos',
    count: 8,
    image: 'https://overheaddoorreno.com/images/non-insulated-l-3.jpg'
  },
  {
    name: 'Portones Electricos',
    slug: 'portones-electricos',
    count: 5,

    image: 'https://lirp.cdn-website.com/6e2add9c/dms3rep/multi/opt/3.3-372w.png'
  },
  {
    name: 'Cortinas Metalicas',
    slug: 'cortinas-metalicas',
    count: 10,

    image: 'https://lirp.cdn-website.com/6e2add9c/dms3rep/multi/opt/01-1920w.jpeg'
  }
];

export default HomePage;