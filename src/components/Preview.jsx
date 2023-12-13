import "./styles/Preview.css"

export default function Preview({product}){
  return (
    <div className="preview-container">
      <div className="description-container">
        <img className="preview-image" src={product.image} alt="product image" />
        <div className="title-container">
          <h1 className="title">{product.title}</h1>
          <p className="description">{product.description}</p>
          <p className="category">{product.category}</p>
        </div>
      </div>
      <div className="rating-container">
        <h1>{product.price}</h1>
        <p>{product.rating.rate} {product.rating.count}</p>
      </div>
    </div>
  )
}