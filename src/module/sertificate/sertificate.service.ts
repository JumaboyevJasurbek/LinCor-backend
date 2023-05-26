import { Injectable } from '@nestjs/common';

@Injectable()
export class SertificateService {
    get(): string{
        return 'get sertificate'
    }
}
