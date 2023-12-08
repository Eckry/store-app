export default function CheckBox({category, checked, onChange}) {
  return (
    <div>
      <input onChange={onChange} type="checkbox" value={category}/>
      <label>{category}</label>
    </div>
  );
}
