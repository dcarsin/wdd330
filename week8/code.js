
//----------------------------------------------------------------------------------------------
//options on Fetch and data json created:
fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(json => console.log(json))

const listProducts = [];
await loadProducts();

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

function changeAction(val) {
  const selected = listProducts.filter(x => x.id == val);
  console.log("selected", selected);
  document.getElementById('total').innerText = selected[0].price;
}

async function loadPrice() {
  let selected = [];
  const listbox = document.querySelector('#product');
  for (let i = 0; i < listbox.options.length; i++) {
    selected[i] = listbox.options[i].selected;
  }
  console.log("selected", selected);
}

async function loadProducts() {
  const select = document.querySelector('select');
  try {
    const products = await fetch("https://dummyjson.com/products")
      .then(convertToJson)
      .then((data) => data.products)

    products.forEach(element => {
      const newOption = document.createElement('option');
      const optionText = document.createTextNode(element.title);
      newOption.appendChild(optionText);
      newOption.setAttribute('value', element.id);
      select.appendChild(newOption);
      listProducts.push({ "id": element.id, "price": element.price })
    })
    console.log("listProducts",listProducts);
  } catch (err) {
    console.log("Data not loaded");
  }
}