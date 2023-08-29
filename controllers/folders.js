const fs = require('fs').promises;
const path = require('path');

module.exports.getDirectory = (req, res, next) => {

    const folders = [];
    const otherTypes = [];
    let folderPath = req.params['0'] || '';

    (async function () {
        try {
            const files = await fs.readdir(path.join(__dirname, '../../', folderPath));

            for (let f of files) {
                const stat = await fs.lstat(path.join(__dirname, '../../', folderPath, f));
                if (stat.isDirectory()) folders.push(f);
                else otherTypes.push(f);
            }
            res.render('folders', {
                folders, otherTypes, folderPath
            });
        } catch (err) {
            next({message: 'There is no such path!'})
        }
    })();
};