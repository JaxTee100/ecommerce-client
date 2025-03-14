import { Suspense } from "react";
import ProductDetailsSkeleton from "./productSkeleton";
import ProductDetailsContent from "./productDetails";

export default  function ProductDetailsPage({ params }: { params: { id: string } }) {
  
  return (
      <ProductDetailsContent id={params.id} />
  );
}
