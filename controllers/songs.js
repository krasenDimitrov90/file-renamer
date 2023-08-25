const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');
const NodeID3 = require('node-id3');

module.exports.getCurrentSongs = (req, res, next) => {
    const folderPath = path.join(__dirname, '../', 'music');

    const files = fs.readdirSync(folderPath)
        .map(function (v) {
            return {
                name: v,
                time: fs.statSync(folderPath + '/' + v).mtime.getTime()
            };
        })
        .sort(function (a, b) { return a.time - b.time; })
        .map(function (v) { return v.name; });

    res.render('current-songs', { songs: files, newSongs: [] });
};

module.exports.checkSongs = (req, res, next) => {
    const songs = req.body['songs-text'].split('\n');

    res.render('check-songs', {
        newSongs: songs
    });
};

module.exports.saveChanges = (req, res, next) => {
    const songs = [...new Set(req.body.songs.split('\n').map(s => s.replace('\r', '')))];
    const album = songs.shift();

    (async function () {

        const folderPath = path.join(__dirname, '../', 'music');

        try {
            const files = await fsPromise.readdir(folderPath);

            console.log(files.length, songs.length)
            if (files.length !== songs.length || songs.some(s => s === '')) {
                const error = {
                    statusCode: 404,
                    message: 'The track list you provided is a different length than the original list, or it has duplicate names!'
                };
                throw error;
            }

            let idx = 0;
            for (const song of files) {
                const fileInfo = path.parse(song);
                const oldPath = path.join(folderPath, song);
                const newPath = path.join(folderPath, songs[idx] + fileInfo.ext);

                await fsPromise.rename(oldPath, newPath);

                const metaData = songs[idx].split(' - ');
                const artist = metaData[0].slice(metaData[0].indexOf(' '));
                const title = metaData[1];
                const tags = { album, title, artist, TRCK: (idx + 1).toString() };
                NodeID3.write(tags, newPath);

                idx++;
            }
            res.redirect('/');

        } catch (err) {
            next(err);
        }

    })();
};

module.exports.discardChanges = (req, res, next) => {
    res.redirect('/');
};