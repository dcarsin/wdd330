export const myFunction = () => {

    console.log("hello from my module");
    console.log("name", name);
    // console.log("active", active);
    // console.log("exclude", exclude);
    // console.log("stormDate", stormDate);


    const fs = require('fs');
    const fileName = 'lista.json';
    const file = require(fileName);
    console.log("file", file);

    // file.key = "new value";

    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(file));
        console.log('writing to ' + fileName);
    });
};

