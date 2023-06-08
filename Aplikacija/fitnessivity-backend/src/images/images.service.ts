import { Injectable } from '@nestjs/common';
import * as mimeTypes from 'mime-types';
import { imagePath } from 'src/imagePath';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImagesService {
    getImage(id: string, res: any){
        const files = fs.readdirSync(imagePath).filter(fn =>{
            const ext = path.extname(fn).toLowerCase();
            return (fn.startsWith(id) && (ext == '.jpg' || ext == '.png' || ext == '.jpeg'));
        });
        if (files.length > 0){
            const foundFile = files[0];
            return res.sendFile(foundFile, { root: imagePath });
        } else {
            return res.status(404).send('File not found');
        }
    }
    async uploadImage(file: Express.Multer.File) {
        const files = fs.readdirSync(imagePath).filter(fn => {
            const ext = path.extname(fn).toLowerCase();
            return (fn.startsWith(file.originalname) && (ext === '.jpg' || ext === '.png' || ext === '.jpeg'));
        });

        for (const existingFile of files) {
            await fs.promises.unlink(path.join(imagePath, existingFile));
        }
        const fileExtension = mimeTypes.extension(file.mimetype) || 'jpg';
        const filePath = path.join(imagePath, `${file.originalname}.${fileExtension}`);
        await fs.promises.writeFile(filePath, file.buffer);

        return { message: 'Image uploaded successfully', file };
    }
}
