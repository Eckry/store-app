import products from "../products.json";

export default function CheckBox({
  category,
  setSearchedCategories,
  setFilteredProducts,
  searchedCategories,
}) {
  function handleOnChange(event) {
    searchedCategories[event.target.value] =
      !searchedCategories[event.target.value];
    setSearchedCategories(searchedCategories);
    setFilteredProducts(() => {
      if (Object.values(searchedCategories).some((boolean) => !boolean))
        return products.filter(
          (product) => !searchedCategories[product.category]
        );
      return products;
    });
  }
  return (
    <div>
      <input onChange={handleOnChange} type="checkbox" value={category} />
      <label>{category}</label>
    </div>
  );
}
