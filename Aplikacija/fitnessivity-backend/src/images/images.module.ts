import { Module } from '@nestjs/common';
import { ImageController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
    controllers: [ImageController],
    providers: [ImagesService]
})
export class ImagesModule {
    
}
