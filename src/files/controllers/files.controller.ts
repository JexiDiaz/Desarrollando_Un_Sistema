import { Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FilesService } from "../services/files.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('files')
export class FilesController {
    constructor( private readonly filesService: FilesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File ) {
     console.log(file);
    }

    @Get('product/:imageId')
    getIamge() {
        return 'Hola mundo';
   }
}
