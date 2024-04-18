import { Container } from "./container";
import { DriveResource } from "./resource";
import { match } from './images';


class File extends HTMLElement {
    data: DriveResource;
    image: HTMLImageElement;
    label: HTMLElement;
    link: HTMLAnchorElement;
    clicked: boolean = false;

    constructor(parent: HTMLElement, i: number) {
        super();
        
        this.image = document.createElement('img') as HTMLImageElement;
        this.label = document.createElement('file-name');
        this.link = document.createElement('a') as HTMLAnchorElement;
        this.link.style.display = 'none';
        this.append(this.image, this.label, this.link);
        this.addEventListener('click', this.onClick.bind(this));
    }

    onClick() {
        if (!this.clicked) {
            this.clicked = true;
            this.link.href = `/drive/file?fileId=${this.data.id}`;
            this.link.download = this.data.name;
            this.link.click();
            this.style.opacity = '50%';
            this.style.cursor = 'default';
        }
    }

    update(data: DriveResource) {
        this.data = data;
        this.label.textContent = this.data.name;
        this.image.src = match(data.mimeType);
        this.style.opacity = '100%';
        this.clicked = false;
        this.style.cursor = 'pointer';
    }

    show() {
        this.classList.remove('hidden');
    }

    hide() {
        this.classList.add('hidden');
    }
};



const filesList = document.getElementById('files-list') as HTMLElement;
export const files = new Container<DriveResource>(filesList, File);
window.customElements.define('drive-file', File);