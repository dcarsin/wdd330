const {members} = require('./lista.json')

members.forEach((x)=>{
    console.log(`("${x.Name}","${x.LastName}","${x.Sex}","${x.BornYear}-${x.BornMonth}-${x.BornDay}",${x.Active}),`)
})
