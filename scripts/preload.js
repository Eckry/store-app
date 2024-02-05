import products from "../src/products.json"
const images = []

for(let i = 0; i < products.length; i++){
  const img = new Image();
  img.src = products[i].image;
  images[i] = img;
}