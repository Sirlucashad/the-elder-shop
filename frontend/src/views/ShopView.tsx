import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import logoElder from "../assets/icons/logoElderShop.png";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/products";

export default function ShopView() {
  const { data: products, isLoading, isError, error } = useProducts();
  const location = useLocation();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 16;

  // 1. LEER FILTROS DE LA URL
  const queryParams = new URLSearchParams(location.search);
  const searchFilter = queryParams.get("search")?.toLowerCase() || "";
  const categoryFilter = queryParams.get("categoria")?.toLowerCase() || "";
  const subCategoryFilter = queryParams.get("subcategoria")?.toLowerCase() || "";

  // MANDATORIO: Resetear a la página 1 siempre que cambie cualquier filtro
  // Esto evita que quedes "atrapado" en una página inexistente al buscar o filtrar
  useEffect(() => {
    setCurrentPage(1);
  }, [searchFilter, categoryFilter, subCategoryFilter]);

  // 2. FILTRADO GLOBAL (Se ejecuta sobre "products", es decir, TODO lo traído de la Base de Datos)
  const filteredProducts = (products || []).filter((product) => {

    // A) Búsqueda por texto en tiempo real (Afecta a todo el catálogo general)
    const cumpleBusqueda =
      !searchFilter ||
      product.nombre.toLowerCase().includes(searchFilter) ||
      (product.descripcion && product.descripcion.toLowerCase().includes(searchFilter));

    // B) Filtro por Categoría Principal (Arreglado para detectar la PS5 Slim)
    let cumpleCategoria = true;
    if (categoryFilter) {
      const nombreMin = product.nombre.toLowerCase();
      const descMin = (product.descripcion || "").toLowerCase();

      // Palabras clave para identificar consolas del ecosistema gaming
      const palabrasConsolas = ["consola", "playstation", "ps5", "ps4", "xbox", "nintendo", "switch", "wii"];
      const esFamiliaConsola = palabrasConsolas.some(palabra => nombreMin.includes(palabra) || descMin.includes(palabra));

      if (categoryFilter === "juegos") {
        cumpleCategoria = !!product.videojuego;
      }
      else if (categoryFilter === "consolas") {
        // Es consola si NO es un juego de software y coincide con las palabras clave de hardware
        cumpleCategoria = !product.videojuego && esFamiliaConsola;
      }
      else if (categoryFilter === "accesorios") {
        // Es accesorio si NO es juego y tampoco pertenece a las consolas principales (mandos, audífonos, etc.)
        cumpleCategoria = !product.videojuego && !esFamiliaConsola;
      }
    }

    // C) Filtro por Subcategoría (Plataformas / Formatos / Componentes)
    let cumpleSubcategoria = true;
    if (subCategoryFilter) {
      const cumpleVariante = product.variantes?.some((v) => {
        const plataformaMatch = v.plataforma?.nombre?.toLowerCase() === subCategoryFilter;
        const formatoMatch = v.formato?.nombre?.toLowerCase() === subCategoryFilter;
        return plataformaMatch || formatoMatch;
      });

      const cumpleNombre = product.nombre.toLowerCase().includes(subCategoryFilter);

      cumpleSubcategoria = !!cumpleVariante || cumpleNombre;
    }

    return cumpleBusqueda && cumpleCategoria && cumpleSubcategoria;
  });

  // 3. CÁLCULOS DE PAGINACIÓN SOBRE EL RESULTADO FILTRADO
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Cortamos el array resultante para mostrar solo los 16 correspondientes
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative z-10 min-h-screen pb-16 text-white bg-linear-to-b from-slate-800 to-black overflow-hidden">
      <section className="py-10 px-6 max-w-7xl mx-auto relative z-30">

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-yellow-500">
            {categoryFilter
              ? `Catálogo: ${categoryFilter.toUpperCase()} ${subCategoryFilter ? ` anisotropy (${subCategoryFilter.toUpperCase()})` : ""}`
              : "Nuestros Productos"
            }
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {searchFilter
              ? `Resultados para la búsqueda: "${searchFilter}" (${totalProducts} encontrados)`
              : `Explora las ${totalProducts} existencias disponibles en nuestra tienda.`
            }
          </p>
        </div>

        {/* ESTADO: CARGANDO */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <p className="text-slate-300 text-lg animate-pulse flex items-center gap-2">
              <span className="w-3 h-3 bg-amber-500 rounded-full animate-ping"></span>
              Cargando catálogo...
            </p>
          </div>
        )}

        {/* ESTADO: ERROR */}
        {isError && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center bg-red-500/10 border border-red-500/20 p-6 rounded-xl max-w-md">
              <p className="text-red-400 font-semibold mb-1">Error al cargar productos</p>
              <p className="text-red-300/70 text-sm">
                {(error as Error)?.message || "No se pudo conectar con el servidor"}
              </p>
            </div>
          </div>
        )}

        {/* ESTADO: DATOS DISPONIBLES */}
        {!isLoading && !isError && (
          <>
            {currentProducts.length > 0 ? (
              <>
                {/* GRILLA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenModal={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>

                {/* PAGINADOR */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12 pt-6 border-t border-slate-800">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium rounded-xl border border-slate-700 bg-slate-900/40 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer"
                    >
                      ← Ant
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => {
                      const pageNumber = index + 1;
                      const isSelected = currentPage === pageNumber;

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`w-10 h-10 text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center ${isSelected
                              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105"
                              : "bg-slate-900/40 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500"
                            }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium rounded-xl border border-slate-700 bg-slate-900/40 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer"
                    >
                      Sig →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col justify-center items-center py-20 text-center">
                <p className="text-slate-400 text-lg font-medium">
                  No se encontraron productos que coincidan con la búsqueda o los filtros aplicados.
                </p>
              </div>
            )}
          </>
        )}
      </section>

      {/* MODAL */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* LOGO DE FONDO */}
      <div className="hidden md:block absolute -right-40 -bottom-50 -rotate-23 size-150 z-20 opacity-10 pointer-events-none">
        <img src={logoElder} alt="Elder Shop" />
      </div>
    </div>
  );
}