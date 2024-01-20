import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Preview from "../components/Preview";
import useFilters from "../hooks/useFilters";

export default function PreviewPage() {
  const { filteredProducts } = useFilters();
  const { id } = useParams();

  const previewIndex = filteredProducts.findIndex(
    (product) => product.id === Number(id)
  );

  let prev = filteredProducts[previewIndex - 1];
  let next = filteredProducts[previewIndex + 1];

  const preview = {
    product: filteredProducts[previewIndex],
    prev,
    next,
  };
  return (
    <>
      <Preview
        preview={preview}
      />
      <Footer />
    </>
  );
}
