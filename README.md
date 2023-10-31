## NextJS Demo App
This is a demo app using NextJS.  It includes role based user authentication and registration.  It uses prisma to model a postgresql database.

### Local Dev
Add env variables to .env.local:
```bash
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="i1zANLTUxy9fXgc6EPUEvy3VDECX1+7pOd130Jjo+M0="
AUTH_GITHUB_ID= "";
AUTH_GITHUB_SECRET= "";
```

Run a local postgresql instance in Docker:
```bash
docker run --name <instance name goes here>  -p 5455:5432 -e POSTGRES_USER=<db username> -e POSTGRES_PASSWORD=<db password> -e POSTGRES_DB=<db name> -d postgres
```

Run the app locally:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.