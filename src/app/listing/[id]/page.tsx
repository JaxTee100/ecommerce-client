
import ProductDetailsContent from "./productDetails";

type ProductDetailsPageProps = {
  params: { id: string };
};

export default  function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  
  return (
      <ProductDetailsContent id={params.id} />
  );
}
