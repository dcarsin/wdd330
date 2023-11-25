let gender, speechType, minutes, listaDiscursantes

function readSelected(name) {
  var select = document.getElementById(name)
  var option = select.options[select.selectedIndex]
  switch (name) {
    case 'speakerAge':
      age = option.value
      console.log('age', age)
      break
    case 'gender':
      gender = option.value
      console.log('gender', gender)
      break
    case 'speechType':
      speechType = option.value
      console.log('speechType', speechType)
      break
    case 'minutes':
      minutes = option.value
      console.log('minutes', minutes)
      break
    default:
      break
  }
}

async function fetchMembersJSON(group, gender, active) {
  if (group && gender) {
    const response = await fetch(
      `http://localhost:4200/api/members?${group ? 'group=' + group : ''}&${
        gender ? 'gender=' + gender : ''
      }&${active ? 'active=' + active : ''}`
    )
    const members = await response.json()
    members.forEach((x) => {
      let opt = document.createElement('option')
      opt.setAttribute('data-value', `${x.memberID}, ${x.memberLastName}, ${x.memberName}`)
      opt.textContent = `${x.memberId}-${x.memberLastName}, ${x.memberName}`
      if (opt != null) {
        document.querySelector('#speakersList').appendChild(opt)
      }
    })
    return members
  } else {
    return []
  }
}

let age = document.getElementById('speakerAge')

let gen = document.getElementById('gender')
document.getElementById('gender').addEventListener('change', async (event) => {
  finalList = await fetchMembersJSON(age, gen.value, true)
})
document.getElementById('speakerAge').addEventListener('change', async (event) => {
  finalList = await fetchMembersJSON(age, gen.value, true)
})
