import { useState } from "react";
import ImageLoading from "./ImageLoading";
import "./styles/Image.css";

export default function Image({ image, alt }) {
  const [isLoading, setIsLoading] = useState(true);

  function handleLoad() {
    setIsLoading(false);
  }

  return (
    <>
      <ImageLoading isLoading={isLoading} />
      <img
        style={{ display: isLoading ? "none" : "block" }}
        src={image}
        alt={alt}
        onLoad={handleLoad}
        className="product-image"
      />
    </>
  );
}
