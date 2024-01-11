import { useState } from "react";

export default function (products) {
  const [preview, setPreview] = useState({});

  function setCurrentPreview(id) {
    const previewIndex = products.findIndex((product) => product.id === id);
    if (id == undefined) return setPreview({});
    setPreview({
      product: products[previewIndex],
      next:
        previewIndex < products.length - 1
          ? products[previewIndex + 1].id
          : -1,
      prev: previewIndex >= 1 ? products[previewIndex - 1].id : -1,
    });
  }

  return { preview, setCurrentPreview };
}
