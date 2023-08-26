const fs = require('fs').promises;
const path = require('path');
// const homedir = require('os').homedir();


(async function () {
    const files = await fs.readdir(path.join(__dirname, '../../'));

    for (let f of files) {
        const stat = await fs.lstat(path.join(__dirname, '../../',f));
        if (stat.isDirectory()) {
            console.log(f);

        }

    }
})()