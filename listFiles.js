const client = require('./googleAuth');
const { google } = require('googleapis');

client(listFiles);

function listFiles(auth) {
    const drive = google.drive({ version: 'v3', auth });
    drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
        if(err) console.error(err);
        const { data: { files } } = res;
        files.forEach(file => console.log(file))
    })
};
