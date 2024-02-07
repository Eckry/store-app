import { useState } from "react";
import ImageLoading from "./ImageLoading";
import "./styles/Image.css";

export default function Image({ image, alt, className, route, onClick }) {
  const [isLoading, setIsLoading] = useState(true);

  function handleLoad() {
    setIsLoading(false);
  }

  function handleOnClick(){
    if(typeof onClick !== "function") return;
    onClick();
  }

  return (
    <>
      <ImageLoading isLoading={isLoading} route={route} />
      <img
        style={{ display: isLoading ? "none" : "block" }}
        src={image}
        alt={alt}
        onClick={handleOnClick}
        className={className}
      />
    </>
  );
}
