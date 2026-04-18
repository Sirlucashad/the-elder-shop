
export default function ProductCard({ product }) {
    return (
        <div className="bg-[#112240] rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">

            <div className="h-40 bg-gray-700">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4">
                <h3 className="font-semibold">
                    {product.name}
                </h3>

                <p className="text-yellow-400">
                    ${product.price}
                </p>

                <button className="mt-3 w-full bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-400 transition cursor-pointer">
                    Comprar
                </button>
            </div>

        </div>
    );
}