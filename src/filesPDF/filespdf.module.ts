import { Module } from '@nestjs/common';
import { FilesPDFController } from './controllers/pdfFiles.controller';
import { FilesPDFService } from './services/pdfFiles.service';


@Module({
  controllers: [FilesPDFController],
  providers: [FilesPDFService],
})
export class FilesPDFModule{}