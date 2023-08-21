

async function fetchMembersJSON() {
    const response = await fetch("http://localhost:4200/api/members");
    const members = await response.json();
    return members.members;
}

fetchMembersJSON().then(memberList => {
    memberList.forEach(x => {
        let opt = document.createElement('option');
        opt.setAttribute('data-value', `${x.memberLastName}, ${x.memberName}`);
        opt.textContent = `${x.memberLastName}, ${x.memberName}`
        document.querySelector('#speakersList').appendChild(opt);
    })
})

const active = getValue('active');
const exclude = getValue('exclude');
const stormDate = document.getElementById('stormDate').value;

const name = getValue('speakersList');
// console.log("name", name);
// if (name != 'Select name:') {

//     myFunction();

// }

function getValue(name) {
    var select = document.getElementById(name);
    var option = select.options[select.selectedIndex];
    return option.value;
}

function openItems() {
    console.log("llego!");
    document.getElementById("active").removeAttribute("disabled");
    document.getElementById("exclude").removeAttribute("disabled");
    document.getElementById("stormDate").removeAttribute("disabled");
}