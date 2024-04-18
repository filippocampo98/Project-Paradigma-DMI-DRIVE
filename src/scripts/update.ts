import { folders } from "./folder";
import { files } from "./file";
import { DriveResource } from "./resource";

const FOLDERMIME = "application/vnd.google-apps.folder";

export function update_content(folderId: string) {
    fetch(`http://localhost:3001/drive/folder?folderId=${folderId}`)
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            folders.setContent(
                data.content.filter((res: DriveResource) => res.mimeType == FOLDERMIME),
            );
            
            files.setContent(
                data.content.filter((res: DriveResource) => res.mimeType != FOLDERMIME),
            );
        }
    });
}
