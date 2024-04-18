const { google } = require('googleapis');

/**
 * Lists the names and IDs of folders and files.
 * @param {String} folderId the id of the drive folder.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function getFolderContents(folderId, authClient) {
    const drive = google.drive({version: 'v3', auth: authClient});
    const res = await drive.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        fields: 'files(id, name, mimeType)',
    });
    
    const files = res.data.files;
    return files;
}

module.exports = { getFolderContents };