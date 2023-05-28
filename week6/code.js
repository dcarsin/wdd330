//options on Fetch and data json created:
fetch('https://dummyjson.com/products')     //example of list 100 products
  // .then(res => res.text())                 // – read the response and return as text,
  .then(res => res.json())                    // – parse the response as JSON,
  // .then(res => res.blob())                 // – return the response as Blob (binary data with type),
  // .blob(res => res.arrayBuffer())
  .then(json => console.log(json))

const listProducts = [];

console.log("listProducts", listProducts);
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
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
  } catch (err) {
    console.log("Data not loaded");
  }
}

