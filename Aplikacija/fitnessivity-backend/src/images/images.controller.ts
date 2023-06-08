import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImageController {

    constructor(private readonly imagesService: ImagesService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        return this.imagesService.uploadImage(file);
    }
    @Get(':id')
    async getImage(@Param('id') id: string, @Res() res) {
        this.imagesService.getImage(id, res);
    }
}