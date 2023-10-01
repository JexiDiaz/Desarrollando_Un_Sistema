import { BadRequestException,
      Controller,
      Get,
      Param, 
      Post,
      Res,
      UploadedFile,
      UseInterceptors } from "@nestjs/common";
import { FilesService } from "../services/files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { fileFilter } from "src/helpers/fileFilter.helper";
import { diskStorage } from "multer";
import { fileNamer } from "src/helpers/fileNamer.helper";
import { Response } from  "express";

@Controller('files')
export class FilesController {
    constructor( private readonly filesService: FilesService) {}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
          //Llamamos al fileFilter de Multer y le asignamos nuestro helper
         fileFilter: fileFilter,

         //Este nos sirve para almacenamiento del archivo
          storage: diskStorage({
             destination: './static/products/',
             filename: fileNamer,
           }),
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File ) {
       if(!file){
          throw new BadRequestException('Asegurese que el archivo sea una imagen');
        }

        const url =  `${file.filename}`;

        return { url };
    }

    @Get('product/:imageName')
    findProduct(@Res() res: Response, @Param('imageName') imageName: string) {
      const path = this.filesService .getStaticImageName(imageName);

      //return path;
      res.sendFile(path);
    }
    
    @Get('users/:imageName')
    findUsers(@Res() res: Response, @Param('imageName') imageName: string) {
      const path = this.filesService .getStaticImageName(imageName);

      //return path;
      res.sendFile(path);
    
    }
  }