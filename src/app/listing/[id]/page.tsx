
import ProductDetailsContent from "./productDetails";

export default  function ProductDetailsPage({ params }: { params: { id: string } }) {
  
  return (
      <ProductDetailsContent id={params.id} />
  );
}
