import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterModule } from '@nestjs/platform-express';
import { upload } from './multer-config';
import { join } from 'path';
import { imagePath } from 'src/imagePath';
import * as fs from 'fs';
import * as path from 'path';

@Controller('images')
export class ImageController {

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        console.log(MulterModule)
        return { message: 'Image uploaded successfully', file };
    }
    @Get(':id')
    async getImage(@Param('id') id: string, @Res() res) {
        const files = fs.readdirSync(imagePath).filter(fn =>{
            const ext = path.extname(fn).toLowerCase();
            return (fn.startsWith(id) && (ext == '.jpg' || ext == '.png' || ext == 'jpeg'));
        });
        if (files.length > 0){
            const foundFile = files[0];
            return res.sendFile(foundFile, { root: imagePath });
        } else {
            return res.status(404).send('File not found');
        }
    }
}