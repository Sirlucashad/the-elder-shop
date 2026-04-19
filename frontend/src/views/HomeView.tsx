import ProductCard from "../components/ProductCard";
import { productsMock } from "../mocks/products"
import logoElder from "../assets/icons/logoElderShop.png"

export default function HomeView() {


  return (
    <div className="relative z-10 max-h-svh pb-16 text-white bg-linear-to-b from-slate-800 to-black">

    




      {/* PRODUCTOS DESTACADOS */}
      <section className="py-10 px-6 max-w-7xl mx-auto relative z-30">
        <h2 className="text-2xl font-bold mb-6">Destacados</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">

          {productsMock.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>
      </section>

      <div className="hidden md:block absolute -right-40 -bottom-50 -rotate-23  size-150 z-20 opacity-20 ">
        <img className="" src={logoElder} alt="Elder Shop" />
      </div>
      

      

    </div>
  );
}