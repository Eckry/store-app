import "./styles/ImageLoading.css";

export default function ImageLoading({ isLoading, route }) {
  const classNames = {
    productImage: "product-loading",
    previewImage: "preview-loading",
    cartImage: "cart-loading",
    otherImage: "other-loading"
  };
  
  return (
    <div
      style={{ display: isLoading ? "block" : "none" }}
      className={`image-loading ${classNames[route]}`}
    ></div>
  );
}
