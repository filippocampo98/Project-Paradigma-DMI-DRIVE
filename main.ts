import express = require('express');
import { getAuthClient } from './module/auth';
import { getFolderContents } from './module/getFolderContents';
import { getFileInfo } from './module/getFileInfo';
import { streamFile } from './module/streamFile';

const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  next();
};

const DEFAULT_FOLDER_ID = "16YGvrGatUcbQixmZ5WR-Kui_XH2oH28M";

const app = express();
const port = 3001;
app.use(express.static('dist'));
app.use(express.json());
app.use(allowCrossDomain);


app.get("/drive/folder", async (req, res) => {
    const folderId = req.query.folderId || DEFAULT_FOLDER_ID;
    const client = await getAuthClient();
    try {
        const content = await getFolderContents(folderId, client);
        res.send({success: true, content: content});
    } catch {
        res.send({success: false, message: 'folder not found.'});
    }
});

app.get("/drive/file", async (req, res) => {
    const fileId = req.query.fileId;
    const client = await getAuthClient();
    const file = await getFileInfo(fileId, client);
    try {
        await streamFile(file, client, res);
    } catch {
        res.send({success: false, message: 'file not found.'});
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});