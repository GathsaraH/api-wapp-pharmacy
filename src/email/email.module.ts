import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "./email.service";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: "gmail",
          auth: {
            user: configService.get("app.emailUser"),
            pass: configService.get("app.emailPassword"),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get("app.emailUser")}>`,
        },
        template: {
          dir: join(__dirname, "..", "email", "templates"),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
