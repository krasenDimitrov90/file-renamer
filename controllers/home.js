const fs = require('fs').promises;
const path = require('path');

module.exports.getDirectory = (req, res, next) => {

    const folders = [];
    const otherTypes = [];

    (async function () {
        const files = await fs.readdir(path.join(__dirname, '../../'));
    
        for (let f of files) {
            const stat = await fs.lstat(path.join(__dirname, '../../',f));
            if (stat.isDirectory()) folders.push(f);
            else otherTypes.push(f);
        }
        res.render('home', {
            folders, otherTypes
        });
    })();

    
};