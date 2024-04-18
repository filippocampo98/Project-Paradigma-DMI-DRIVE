const { google } = require('googleapis');

/**
 * Returns info on a file
 * @param {String} fileId the id of the drive file.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function getFileInfo(fileId, authClient) {
    const drive = google.drive({version: 'v3', auth: authClient});
    const res = await drive.files.get({
        fileId: fileId,
        fields: 'id, name, mimeType',
    });
    
    const file = res.data;
    return file;
}

module.exports = { getFileInfo };