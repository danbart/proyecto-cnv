import { Module } from '@nestjs/common';
import { QrGeneratorService } from './services/qr-generator.service';
import { SesMailerService } from './services/ses-mailer.service';

@Module({
    providers: [SesMailerService, QrGeneratorService],
    exports: [SesMailerService, QrGeneratorService],
})
export class SharedModule { }
