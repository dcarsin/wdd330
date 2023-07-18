//create the minutes dropdown by +5 min
document.getElementById('stormDate').valueAsDate = new Date();
for (let i = 2; i < 7; i++) {
    let opt = document.createElement('option');
    opt.textContent = i * 5;
    document.querySelector('#minutes').appendChild(opt);
}

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

fetchMembersJSON().then(memberList => {
    document.getElementById('speakerAge').addEventListener('change', (event) => {
        document.getElementById('gender').addEventListener('change', (event) => {
            console.log("All members:", memberList);

            const nowYear = new Date().getFullYear(); console.log("nowYear", nowYear);
            const nowMonth = new Date().getMonth() + 1; console.log("nowMonth", nowMonth);
            const nowDay = new Date().getDate(); console.log("nowDay", nowDay);

            let actives;
            if (gender == 'both') {
                actives = memberList.filter(x => x.Activo && !x.NotAllowed);
            } else {
                actives = memberList.filter(x => x.Activo && !x.NotAllowed && x.Sex == gender);
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
                document.querySelector('#speakersList').appendChild(opt);
            })
        })
    })
});

const copyContent = async () => {
    try {
        let textoDiscurso = `Estimado/a Hno/a: ${listaDiscursantes}\nLe invitamos a participar de la reunión sacramental del ` +
            `día ${stormDate.value} con un ${tipoDiscurso.value} de ${minutos.value} minutos, basado como referencia en: ${tema.value}\n` +
            `Le aconsejamos que enseñe las doctrinas del Evangelio, que relate experiencias que fomenten la fe y que de su testimonio ` +
            `de las verdades divinamente reveladas. Busque inspiración para su discurso en las Escrituras, discursos de las autoridades` +
            ` generales o manuales de la iglesia. No debe hablar de temas que sean especulativos o controvertidos o que no estén en armonía` +
            ` con la doctrina de la Iglesia. Evite repetir o leer los discursos de las autoridades generales, sin embargo puede citarlos. ` +
            `Lo invitamos a sentarse en el estrado 5 minutos antes de comenzar la reunión.\n`;
        console.log(textoDiscurso);
        await navigator.clipboard.writeText(textoDiscurso);
        console.log('Content copied to clipboard');
        alert('stop!');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

