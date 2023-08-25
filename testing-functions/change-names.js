const fs = require('fs').promises;
const path = require('path');

let folderPath = path.join(__dirname, 'music');

(async function () {
    try {
        const files = await fs.readdir(folderPath);

        let idx = 1;
        for (const song of files) {
            const fileInfo = path.parse(song);
            const oldPath = path.join(folderPath, song);
            const newPath = path.join(folderPath, idx +  ' Track ' + fileInfo.ext);

            await fs.rename(oldPath, newPath);
            console.log('<<--->>')
            idx++
        }

    } catch (error) {
        console.log('SOMETHING WENT WRONG');
    }
})();