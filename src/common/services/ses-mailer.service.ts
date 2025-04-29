import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SesMailerService {
    private ses: SESv2Client;

    constructor(
        private cfg: ConfigService,                          // @nestjs/config
    ) {
        this.ses = new SESv2Client({
            region: this.cfg.getOrThrow('AWS_REGION'),
            credentials: {
                accessKeyId: this.cfg.getOrThrow('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.cfg.getOrThrow('AWS_SECRET_ACCESS_KEY'),
            },
        });
    }

    async send(opts: { to: string; subject: string; html: string }) {
        const { to, subject, html } = opts;

        await this.ses.send(new SendEmailCommand({
            Destination: { ToAddresses: [to] },
            Content: {
                Simple: {
                    Subject: { Data: subject, Charset: 'UTF-8' },
                    Body: { Html: { Data: html, Charset: 'UTF-8' } },
                },
            },
            FromEmailAddress: this.cfg.getOrThrow('MAIL_FROM'),
        }));
    }
}
