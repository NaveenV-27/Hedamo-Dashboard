"use client";
import { useParams } from "next/navigation";
import data from "../../../data/products.json";
import ProductAnalytics from "../../components/analytics/ProductAnalytics"

const ProductDetail = () => {
  const params = useParams();
  console.log("Params:", params);
  const product = data.find(p => p.id === Number(params.id));

  if (!product) return <p>Product not found</p>

  return (
    <div className="flex items-center justify-center w-full">
        {/* <div className="bg-slate-900 border-b border-slate-700 rounded shadow p-6 space-y-4 text-gray-100 w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold">{product.productName}</h2>
        <RadialChart score={product.score} />
        <p className="text-gray-300">{product.explanation}</p>
        <ul className="list-disc ml-5">
            {product.suggestions.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
        <div className="flex gap-2">
            {product.flags.map((f, i) => (
                <span key={i} className="bg-red-500 text-white px-2 py-1 rounded">{f}</span>
            ))}
        </div>
        </div> */}
        <ProductAnalytics product={product}/>
    </div>
  )
}
export default ProductDetail;