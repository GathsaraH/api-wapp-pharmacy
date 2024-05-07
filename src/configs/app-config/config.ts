// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
export const applicationConfig = {
  port: parseInt(process.env[`APP_PORT`], 10) || 3003,
  nodeEnv: process.env[`NODE_ENV`],
  appName: process.env[`APP_NAME`],
  apiPrefix: process.env[`API_PREFIX`] || "api",
  appFallBackLanguage: process.env[`APP_FALLBACK_LANGUAGE`] || "en",
  appHeaderLanguage: process.env[`APP_HEADER_LANGUAGE`],
  frontendUrl: process.env[`FRONTEND_URL`],
  database: {
    host: process.env[`DATABASE_HOST`],
    post: parseInt(process.env[`DATABASE_PORT`], 10) | 5432,
    username: process.env[`DATABASE_USERNAME`],
    password: process.env[`DATABASE_PASSWORD`],
    name: process.env[`DATABASE_NAME`],
    synchronize: process.env[`DATABASE_SYNCHRONIZE`],
    maxConnection: parseInt(process.env[`DATABASE_MAX_CONNECTIONS`], 10) || 100,
    sslEnabled: process.env[`DATABASE_SSL_ENABLED`],
    rejectUnauthorized: process.env[`DATABASE_REJECT_UNAUTHORIZED`],
    nodeTlsRejectUnauthorized: process.env[`NODE_TLS_REJECT_UNAUTHORIZED`],
  },
  jwt: {
    jwtSecret: process.env[`JWT_SECRET_KEY`],
    jwtExpiresTime: process.env[`JWT_EXPIRATION_TIME`],
    refreshTokenSecret: process.env[`JWT_REFRESH_EXPIRATION_KEY`],
    refreshTokenSecretExpiresTime: process.env[`JWT_REFRESH_EXPIRATION_TIME`],
  },
  email: {
    emailHost: process.env[`EMAIL_HOST`],
    emailPort: process.env[`EMAIL_PORT`],
    emailSecure: process.env[`EMAIL_SECURE`],
    emailUser: process.env[`EMAIL_USER`],
    emailPassword: process.env[`EMAIL_PASSWORD`],
    emailSecureConnection: process.env[`EMAIL_SECURE_CONNECTION`],
    emailRejectUnAuthorized: process.env[`EMAIL_REJECT_UN_AUTHORIZED`],
    adminEmail: process.env[`ADMIN_EMAIL`],
  },
};
