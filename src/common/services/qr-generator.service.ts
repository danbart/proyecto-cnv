import { Injectable } from '@nestjs/common';
import { toDataURL } from 'qrcode';

@Injectable()
export class QrGeneratorService {
    async url(text: string): Promise<string> {
        return toDataURL(text, { margin: 1, width: 300 });  // devuelve data:image/png;base64
    }
}

