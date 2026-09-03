# Wings of Escape

The Wings of Escape website is a Next.js travel platform backed by Sanity CMS. It contains public destination, tour, blog, itinerary, testimonial, and contact pages, plus an embedded Sanity Studio for content management.

## Requirements

- Node.js 20 or later
- npm
- A Sanity project with the required schemas and dataset
- Access to the configured Neon database if database-backed features are used

## Local setup

Install dependencies:

```bash
npm install
```

Create a local `.env` file. Do not commit this file or place credentials in this README.

```env
NEXT_PUBLIC_APP_NAME=Wings of Escape
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_API_VERSION=2025-08-19
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-sanity-read-token
DATABASE_URL=your-database-connection-string
RESEND_KEY=your-resend-api-key

# Required for the deployed admin itinerary inventory
ADMIN_ROUTE_USERNAME=your-admin-username
ADMIN_ROUTE_PASSWORD=your-admin-password
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If port 3000 is already in use, Next.js will select another available port and print it in the terminal.

## Useful commands

```bash
npm run dev          # Start the development server with Turbopack
npm run build        # Create a production build
npm run start        # Serve the production build
npm run postinstall  # Generate the Prisma client
```

## Sanity CMS

The Sanity Studio is available at:

```text
http://localhost:3000/studio
```

The schemas are in `sanity/schemaTypes`. After creating and publishing content in Sanity, the public website reads it through the queries in `lib/constants/index.ts`.

### Blogs

1. Create and publish a blog in Sanity Studio.
2. The blog appears on `/blogs`.
3. Its published slug links to `/blogs/{slug}`.

### Itineraries

1. Create and publish an itinerary in Sanity Studio.
2. Use its published slug with `/itinerary/{slug}`.
3. New itinerary slugs are generated at runtime and revalidated periodically, so a full website rebuild is not normally required. Sanity/CDN caching can delay a new record briefly.

The base `/itinerary` path displays the local fallback itinerary data from `data/itinerary.json` when no custom data is passed to the component. Published customer itineraries use the slug route above.

## Admin itinerary inventory

The admin-only itinerary list is available at:

```text
/itinerary/listAll-adminonly
```

In local development, the route is available without credentials. In deployed environments, it is protected by HTTP Basic Authentication using `ADMIN_ROUTE_USERNAME` and `ADMIN_ROUTE_PASSWORD`.

The middleware fails closed and returns `404` when those production credentials are missing. Keep the route URL and credentials private because the page lists customer and itinerary information.

## Project structure

```text
app/                 Next.js routes and layouts
components/          Reusable UI components
data/                Local fallback and static content data
lib/                 Queries, constants, and server actions
prisma/              Prisma schema and migrations
sanity/              Sanity client, schemas, and Studio configuration
public/              Images, logos, and videos
utils/               Shared utility functions
middleware.ts        Admin itinerary route protection
```

## Production deployment

Run the production build locally before deploying:

```bash
npm run build
npm run start
```

Set all required environment variables in the deployment platform. In particular, configure the Sanity read token, database connection string, email API key, and admin route credentials through the platform's secret/environment-variable settings rather than committing them to the repository.
