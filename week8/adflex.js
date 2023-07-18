console.log("adflex.js");
let generatedToken = await getToken();
console.log("generatedToken", generatedToken);

let payload = '{ "Content-Type": "application/json", "Accept": "application/json", "x-request-apgID": "547984307", "x-request-processID": "33350ec6-8fe8-439c-a703-7214f1e3e84d", "Authorization": "Bearer ' + generatedToken + '","x-request-accessKey": "340a96b6-e08f-41b8-bce7-fd2e280ff3ea"}';
let headers = '{"lifeTime": {"reUsable": true,"ttlDays": 2},"cardDetails": {"cardHolderName": "Mr Adflex Ltd","cardNumber": "4012 0010 3627 5556","startDate": {"month": 6,"year": 2019},"expiryDate": {"month": 5,"year": 2025},"addressDetails": {"street1": "12 Randoms Road","street2": "Felpersham","city": "Trumptonshire","region": "Essex","postCode": "NM1 2QS","country": "GBR"}}}';

console.log('payload', payload);
console.log('header', headers);


async function getToken() {
    console.log("entro...");
    var secretKey = "sk_FA0GaZmUt2plfxBhI1i95r3oCgNQzev7";
    var apiUrl = "https://api-dev.adflex.co.uk";
    var header = {
        "typ": "JWT",
        "alg": "HS256"
    };

    var seconds = Math.round((new Date()).getTime() / 1000);
    var randomGuid = uuidv4();
    var CryptoJS = require("crypto-js")
    var data = {
        "jti": randomGuid,
        "aud": apiUrl + "/v2/tokens",
        "iss": "Adflex",
        "iat": seconds
    };

    // encode header
    console.log("JSON.stringify(header)", JSON.stringify(header));
    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    console.log("stringifiedHeader", stringifiedHeader);
    var encodedHeader = base64url(stringifiedHeader);

    // encode data
    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    var encodedData = base64url(stringifiedData);

    // build token
    var token = encodedHeader + "." + encodedData;
    console.log("token", token);

    // sign token
    var signature = CryptoJS.HmacSHA256(token, secretKey);
    signature = base64url(signature);
    console.log("signature", signature);

    var token = token + "." + signature;
    console.log("token", token);

    return token;
}


function uuidv4() {   //this is provided for Adflex Sanbox data for testing
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function base64url(source) {
    var CryptoJS = require("crypto-js")
    // Encode in classical base64
    let encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
}
