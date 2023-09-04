import { BadRequestException, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { fileNamer } from "src/helpers/fileNamer.helper";
import { FilesPDFService } from "../services/pdfFiles.service";
import { fileFilterpdf } from "src/helpers/fileFilterpdf.helper";

@Controller('pdfFiles')
export class FilesPDFController {
    constructor( private readonly filespdfService: FilesPDFService) {}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('pdffile', {
          //Llamamos al fileFilter de Multer y le asignamos nuestro helper
         fileFilter: fileFilterpdf,

         //Este nos sirve para almacenamiento del archivo
          storage: diskStorage({
             destination: './files/pdf/archivos',
             filename: fileNamer,
           }),
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File ) {
       if(!file){
          throw new BadRequestException('Asegurese que el archivo sea un archivo pdf');
        }

        return {
            fileName: file.filename,
        };
    }
}
