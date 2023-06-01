import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterModule } from '@nestjs/platform-express';
import { upload } from './multer-config';
import { join } from 'path';
import { imagePath } from 'src/imagePath';

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
        const path = join(imagePath, id);
        return res.sendFile(id, { root: imagePath });
    }
}