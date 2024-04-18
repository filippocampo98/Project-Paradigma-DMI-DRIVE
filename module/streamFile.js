const { google } = require('googleapis');

async function streamFile(file, authClient, dest) {
    const drive = google.drive({ version: 'v3', auth: authClient });
    try {
        const res = await drive.files.get(
            {fileId: file.id, alt: 'media'},
            {responseType: 'stream'}
        );

        dest.setHeader("Content-Type", file.mimeType);
        dest.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);
        const stream = res.data;
        stream.pipe(dest);
        return new Promise((resolve, reject) => {
            dest.on('finish', resolve);
            dest.on('error', reject);
        });
    } catch (err) {
        console.error('Error downloading file:', err);
    }
}

module.exports = { streamFile };