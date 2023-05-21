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

async function MakePayment() {
  const date = new Date();
  const min = date.getHours() + date.getMinutes() + date.getSeconds();
  const card = 4111111111111111;
  const cvv = 110;
  const xApiKey = "500fbdc8A5f34A4b09A8236Aa604dee33fb3";
  const organisation = "edfb0e33Ae190A4ad6A8a76A7b1d51e2f87a";
  const refId = "1234567890";
  const header = '{ "Content-type": "application/json", "X-APIKEY": "' + xApiKey + '"}';
  const payload = JSON.stringify({
    "organisation": organisation,
    "currency": "GBP",
    "amount": document.getElementById('total').textContent,
    "capture_now": false,
    "card": {
      "card_number": card,
      "cvv": cvv,
      "expiry_month": 10,
      "expiry_year": 25
    },
    "merchant_reference": refId + date + min,
    "shopper_interaction": "moto",
    "three_ds": {
      "three_ds_required": false
    }
  });
  console.log("payload",payload);

  fetch('https://sandbox.apexx.global/atomic/v1/api/payment', {
    method: "POST",
    body: payload,
    headers: header
  })
    .then(response => console.log(response))
    .then(json => console.log(json));

  console.log("response", response);
}
