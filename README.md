## NestJS Blogs Service

GraphQL blog/posts service built with NestJS, and PostgreSQL.


### Quick start (Docker)
1) Start Postgres and the app:

```bash
docker compose up --build
```

- App: `http://localhost:3000`
- GraphQL (GraphiQL): `http://localhost:3000/graphql`
- Postgres: `postgresql://postgres:postgres@localhost:5432/awesome_blogs`

The database is initialized with `scripts/init-postgres.sql` (tables `blogs`, `posts`).

#### Check data in DB
Open a psql shell into the Postgres container:

```bash
docker compose exec postgres psql -U postgres -d awesome_blogs
```

Then inside psql:

```
\dt
SELECT * FROM blogs;
```

### Local development
1) Install dependencies:
```bash
npm install
```
1) Start only Postgres with Docker:
```bash
docker compose up -d postgres
```
1) Start the server in watch mode:
```bash
npm run start:dev
```
1) Open GraphiQL at `http://localhost:3000/graphql`



### GraphQL schema (excerpt)
Types and operations live under `src/**/*.graphql`. The service exposes:
- Queries: `getBlogbySlug(slug)`, `getBlogbyId(id)`
- Mutations: `createBlogwithPosts(blog)`, `createPost(post)`

Example query:

```graphql
query GetBlog {
  getBlogbySlug(slug: "my-blog") {
    id
    name
    slug
    posts {
      id
      title
      content
    }
  }
}
```

Example mutations:

```graphql
mutation CreateBlogWithPosts {
  createBlogwithPosts(
    blog: {
      name: "My Blog"
      slug: "my-blog"
      posts: [{ title: "Hello", content: "First post" }]
    }
  ) {
    id
    name
    slug
    posts {
      id
      title
      content
    }
  }
}
```

```graphql
mutation CreatePost {
  createPost(post: { title: "Another", content: "More content", blog: "BLOG_ID" }) {
    id
    title
    content
    blog
  }
}
```
