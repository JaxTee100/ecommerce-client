import { Suspense } from "react";
import ProductDetailsSkeleton from "./productSkeleton";
import ProductDetailsContent from "./productDetails";


type Params = Promise<{ id: string}>;

async function  ProductDetailsPage({ params }: { params: Params }) {
  const { id } = await params;
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsContent id={id} />
    </Suspense>
  );
}

export default ProductDetailsPage;

