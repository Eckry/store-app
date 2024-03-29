import { useState } from "react";
import ImageLoading from "./ImageLoading";

export default function Image({ image, alt, className, route, onClick }) {
  const [isLoading, setIsLoading] = useState(true);

  function handleLoad() {
    setIsLoading(false);
  }

  function handleOnClick() {
    if (typeof onClick !== "function") return;
    onClick();
  }

  return (
    <>
      <ImageLoading isLoading={isLoading} route={route} />
      <img
        style={{ display: isLoading ? "none" : "block" }}
        src={image}
        alt={alt}
        onLoad={handleLoad}
        onClick={handleOnClick}
        className={className}
      />
    </>
  );
}
