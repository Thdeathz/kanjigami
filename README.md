# Next-express starter template

## Tech stacks

### Frontend

<a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next-14.1.3-blue.svg" alt="next" title="Next" /></a><!--
--><a href="https://next-auth.js.org/"><img src="https://img.shields.io/badge/NextAuth-v5Beta-blue.svg" alt="next" title="Next" /></a><!--
--><a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwindcss-3.3.0-blue.svg" alt="next" title="Next" /></a><!--
--><a href="https://www.framer.com/"><img src="https://img.shields.io/badge/FramerMotion-11.0.12-blue.svg" alt="next" title="Next" /></a><!--
--><a href="https://ui.shadcn.com/"><img src="https://img.shields.io/badge/ShadcnUI-0.8.0-blue.svg" alt="next" title="Next" /></a><!--
--><a href="https://react-hook-form.com/"><img src="https://img.shields.io/badge/ReactHookForm-7.51.0-blue.svg" alt="next" title="Next" /></a>

### Backend

<a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-4.18.2-blue.svg" alt="express" title="Express" /></a><!--
--><a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-5.4.2-blue.svg" alt="prisma" title="Prisma" /></a><!--
--><a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/Postgres-11.0.0-blue.svg" alt="postgres" title="Postgres" /></a><!--
--><a href="https://redis.io/"><img src="https://img.shields.io/badge/Redis-7.2.0-blue.svg" alt="redis" title="Redis" /></a><!--
--><a href="https://www.passportjs.org/"><img src="https://img.shields.io/badge/Passport-0.7.0-blue.svg" alt="passport" title="Passport" /></a><!--
--><a href="https://www.nodemailer.com/"><img src="https://img.shields.io/badge/NodeMailer-6.9.5-blue.svg" alt="nodeMailer" title="NodeMailer" /></a>

## System requirements

- Docker >= 20.10
- Docker compose plugin
- Node >= 18.0

## Setup and Configuration

1. Start docker container:

```bash
make devup
```

This will create a `.env` file in the root directory. You can configure environment variables in this file according to your needs.

2. Install dependencies:

```bash
make devinstall
```

3. Migrate and seed dummy data

```bash
make prisma-generate
make prisma-migrate
make prisma-seed
```

## Usage

To start the application locally, use the following command:

```sh
make devrun
```

The application will be accessible at:

- Web: [http://localhost:3000](http://localhost:3000)
- Api: [http://api.localhost:3000/](http://api.localhost:3000/api/)
- Traefik: [http://traefik.localhost:3000](http://traefik.localhost:3000)

Stop application:

```sh
make devdown
```

Production mode:

```sh
make build
make prod-up
```

## License

This project is licensed under the [MIT License](LICENSE).
