const fs = require('fs').promises;
const path = require('path');

module.exports.getDirectory = (req, res, next) => {

    console.log(req.params)
    const folders = [];
    const otherTypes = [];
    let folderPath = req.params['0'] || '';
    // folderPath = folderPath.replace('/folders/', '');

    (async function () {
        console.log(folderPath)
        const files = await fs.readdir(path.join(__dirname, '../../', folderPath));

        for (let f of files) {
            const stat = await fs.lstat(path.join(__dirname, '../../',folderPath, f));
            if (stat.isDirectory()) folders.push(f);
            else otherTypes.push(f);
        }
        res.render('folders', {
            folders, otherTypes, folderPath
            // folders, otherTypes, folderPath: folderPath === '' ? '' : folderPath + '/'
        });
    })();
};

module.exports.openDirectory = (req, res, next) => {
    const folders = [];
    const otherTypes = [];
    const folderPath = req.params['folderPath'] || '';

    (async function () {
        console.log(folderPath)
        const files = await fs.readdir(path.join(__dirname, '../../'));

        for (let f of files) {
            const stat = await fs.lstat(path.join(__dirname, '../../', f));
            if (stat.isDirectory()) folders.push(f);
            else otherTypes.push(f);
        }
        res.render('folders', {
            folders, otherTypes, folderPath
        });
    })();
};