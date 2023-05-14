
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

function getData() {
  return fetch(`data.json`)
    .then(convertToJson)
    .then((data) => data);
}

async function findProductById() {
  const id = "total";
  try {
    const products = await getData();
    console.log("products", products);
    document.getElementById(id).innerText = products.total;
    MakePayment(products);
  } catch (err) {
    console.log("There is no id found: " + id);
  }
}

function MakePayment(paymentPack) {
  const date = new Date();
  const min = date.getHours() + date.getMinutes() + date.getSeconds();
  const card = paymentPack.selectedCard;
  const cvv = paymentPack.cvv;
  const xApiKey = "500fbdc8A5f34A4b09A8236Aa604dee33fb3";
  const organisation = "edfb0e33Ae190A4ad6A8a76A7b1d51e2f87a";
  const refId = paymentPack.refId;
  this.header = '{ "Content-type": "application/json", "accept":"application/json", "X-APIKEY": "' + xApiKey + '"}';
  this.payload = JSON.stringify({
    "organisation": organisation,
    "currency": "GBP",
    "amount": paymentPack.total.split(".")[0],
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
}