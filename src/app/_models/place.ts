export class Place {
    name: string;
    description: string;
    address: string;
    // imageFile = new ImageFile();
    imageFile: File;
    userId: number;
}

export class ImageFile {
    data: string;
    fileName: string;
}
