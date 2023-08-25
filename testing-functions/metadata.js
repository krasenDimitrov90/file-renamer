const NodeID3 = require('node-id3');
const path = require('path');
const filePath = path.join(__dirname, '../music', 'hip - Копие.mp3' );

NodeID3.write({title: 'Mother', 'TRCK': '1', artist: "Kevin Penkin", album: 'Album'}, filePath);
