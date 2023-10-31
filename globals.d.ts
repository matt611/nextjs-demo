declare namespace NodeJS {
  interface ProcessEnv {
    AUTH_GITHUB_ID: string;
    AUTH_GITHUB_SECRET: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    POSTGRES_URL: string
    POSTGRES_PRISMA_URL: string
    POSTGRES_URL_NON_POOLING: string
    POSTGRES_USER: string
    POSTGRES_HOST: string
    POSTGRES_PASSWORD: string
    POSTGRES_DATABASE: string
  }
}
