const client = require('./googleAuth');
const fs = require('fs');
const { google } = require('googleapis');
const readline = require('readline');

const fileName = './foo.txt';
client(uploadFile);

async function uploadFile(auth) {
    const drive = google.drive({
        version: 'v3',
        auth
    });

    const fileSize = fs.statSync(fileName).size;
    const res = await drive.files.create({
        requestBody: {
            name: 'foo.txt',
            mimeType: 'text/plain'
        },
        media: {
            body: fs.createReadStream(fileName),
        }
    },
    {
        onUploadProgress: evt => {
            const progress = ( evt.bytesRead / fileSize ) * 100;
            readline.clearLine();
            readline.cursorTo(0);
            process.stdout.write(`${Math.round(progress)}% complete`);
        }
    });

    console.log(res.data);
    return res.data;
}