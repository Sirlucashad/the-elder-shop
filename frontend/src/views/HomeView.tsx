import ProductCard from "../components/ProductCard";
import { productsMock } from "../mocks/products"

export default function HomeView() {


  return (
    <div className="max-h-svh pb-16 text-white bg-linear-to-b from-blue-950 to-black">

    




      {/* PRODUCTOS DESTACADOS */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Destacados</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {productsMock.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>
      </section>

      

    </div>
  );
}