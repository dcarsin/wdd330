let age, gender, speechType, minutes, listaDiscursantes;

function readSelected(name) {
    var select = document.getElementById(name);
    var option = select.options[select.selectedIndex];
    switch (name) {
        case 'speakerAge':
            age = option.value; console.log("age", age);
            break;
        case 'gender':
            gender = option.value; console.log("gender", gender);
            break;
        case 'speechType':
            speechType = option.value; console.log("speechType", speechType);
            break;
        case 'minutes':
            minutes = option.value; console.log("minutes", minutes);
            break;
        default:
            break;
    }
}

async function fetchMembersJSON() {
    const response = await fetch('lista.json');
    const members = await response.json();
    return members.members;
}

let spk = document.getElementById('speakerAge');
if (spk) {
    document.getElementById('speakerAge').addEventListener('change', (event) => {
        let gen = document.getElementById('gender');
        if (gen) {
            document.getElementById('gender').addEventListener('change', (event) => {
                fetchMembersJSON().then(memberList => {
                    console.log("All members:", memberList);

                    const nowYear = new Date().getFullYear(); console.log("nowYear", nowYear);
                    const nowMonth = new Date().getMonth() + 1; console.log("nowMonth", nowMonth);
                    const nowDay = new Date().getDate(); console.log("nowDay", nowDay);

                    let actives;
                    if (gender == 'both') {
                        actives = memberList.filter(x => x.Active && !x.NotAllowed);
                    } else {
                        actives = memberList.filter(x => x.Active && !x.NotAllowed && x.Sex == gender);
                    }

                    let finalList;

                    if (age == 'adult') {
                        finalList = actives.filter(x => parseInt(x.BornYear) < nowYear - 18 ||
                            parseInt(x.BornYear) == nowYear - 18 && parseInt(x.BornMonth) < nowMonth ||
                            parseInt(x.BornYear) == nowYear - 18 && parseInt(x.BornMonth) == nowMonth && parseInt(x.BornDay) <= nowDay);
                    } else {
                        finalList = actives.filter(x => parseInt(x.BornYear) > nowYear - 17 && parseInt(x.BornYear) < nowYear - 12 ||
                            parseInt(x.BornYear) == nowYear - 17 && parseInt(x.BornMonth) > nowMonth ||
                            parseInt(x.BornYear) == nowYear - 17 && parseInt(x.BornMonth) == nowMonth && parseInt(x.BornDay) >= nowDay ||
                            parseInt(x.BornYear) == nowYear - 12 && parseInt(x.BornMonth) < nowMonth ||
                            parseInt(x.BornYear) == nowYear - 12 && parseInt(x.BornMonth) == nowMonth && parseInt(x.BornDay) <= nowDay);

                    }
                    console.log("finalList", finalList);
                    finalList.forEach(x => {
                        let opt = document.createElement('option');
                        opt.setAttribute('data-value', `${x.LastName}, ${x.Name}`);
                        opt.textContent = `${x.LastName}, ${x.Name}`;
                        if (opt != null) {
                            document.querySelector('#speakersList').appendChild(opt);
                        }
                    })
                })
            })
        }
    });
}
