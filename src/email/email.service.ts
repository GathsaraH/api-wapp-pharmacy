import { MailerService } from "@nestjs-modules/mailer";
import { HttpException, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
  private logger: Logger = new Logger(EmailService.name);
  constructor(
    private mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  async sendRegistrationEmail(
    email: string,
    name: string,
    userName: string,
    password: string,
    role
  ): Promise<void> {
    try {
      this.logger.debug(`Send Registration Email: ${email}`);
      await this.mailerService.sendMail({
        from: "dev.gathsara@gmail.com",
        to: `${email}`,
        subject: "Registration Confirmation with Wapp Pharmacy",
        template: "registration",
        context: {
          name,
          password,
          email,
          userName,
          noSpace: true,
          role,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error?.status ?? 400);
    }
  }
}
