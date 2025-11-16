## NestJS Blogs Service

GraphQL blog/posts service built with NestJS, and PostgreSQL.


### Quick start (Docker)
1) Start Postgres and the app:

```bash
docker compose up -d
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

## Questions Section 

1. **What were some of the reasons you chose the technology stack that you did?**

Javascript + Node.js – the language I am most familiar with.

TypeScript – for type safety.

 NestJS – for its modular architecture. It already provides a clear structure you can follow and saves time compared to frameworks like Express. It also comes with a solid boilerplate project and built-in Typescript support. My personal preference and familiarity with it helped me complete the assignment faster.

 Docker and Docker Compose – for consistent development and to remove the “it works on my machine” issues when working in a team.

 Knex – as a query builder to simplify the process and add some safety.

 PostgreSQL – it fits the data structure well and supports transactions, which were required. I’m also familiar with it.

 GraphQL – it fits the style of queries described and leaves room for improvements in the future.

Based on the requirements in the Bonus and one of the questions below, I considered it important to keep the business logic and data layer separated, that led me to use the repository pattern. 


---

2. **What were some of the trade-offs you made when building this application? Why were these acceptable trade-offs?**

I chose not to implement any tests or error handling. Given the limited time frame and the purpose of the assignment, I focused on delivering the core functionality rather than full production-grade code.

 I removed some Typescript checks in order to speed up development. This helped me work faster, even though it slightly reduced type safety in a few areas.

 The repository interface added more time and extra complexity, but it was acceptable because it works towards the bonus requirement and keeps the codebase flexible in case multiple databases need to be supported later.

 I left the .env example file with the actual values from the environment. All the values are defaults, and this choice simplifies running and testing the project without requiring additional configuration steps.

All the trade-offs were acceptable to me at this stage because the purpose of this exercise was to create a POC for multiple databases, and the assignment had a time limit.


---

3. **Given more time, what improvements or optimizations would you want to add? When would you add them?**

Immediate changes would include taking a closer look at the Typescript setup. I would also create a proper mapper between the database object structure and the GraphQL representation. For the sake of speed I created the database tables to match the GraphQL types directly, but that is not ideal. For example, fields like createdAt should actually be stored as created_at in Postgres to follow proper naming conventions. I also set createdAt and updatedAt as Strings because handling them as datetimes in GraphQL was more complex than expected within the time constraints. This definitely needs to be corrected going forward.

Future changes would include adding the full set of CRUD operations together with a soft delete, especially adding queries based on ID, not slug. I would also add pagination for the posts as the number of records grows and authentication and authorization.

Another important improvement relates to the slug. For simplicity I allowed the client to send the slug directly, but this can become a scaling problem. The slug needs to be unique and it is tied to the blog title in a way an ID is not. Ideally the slug should be generated inside the service based on the title, checked against the database for uniqueness, and automatically incremented or adjusted if it already exists. We would also need to consider what happens when a blog title changes or when localisation is introduced.

I would also have implemented a Nest dynamic module to select the database based on an environment variable in the database module. This would allow switching between the Postgres and MongoDB repositories without changing application code. I would only do this once the bonus part becomes a real requirement, but the current project structure makes that transition easy.

---

4. **What would you need to do to make this application scale to hundreds of thousands of users?**

I would approach this from two separate angles: **Application Logic** and **Infrastructure**.

**Application Logic**

I would ensure that the separation between business logic and the data layer is strictly maintained. Monitoring and logging would be added, along with authentication, pagination, and potentially an ORM. 
Prisma, for example, would make it easier to transition between database entities and application entities. 

I would also consider whether it makes sense to separate posts and blogs into distinct microservices, though in this case they are closely related, so keeping them together may be more practical. 

Database indexing would be necessary to speed up queries, and we would need to consider any differences between web and mobile requirements.

Maintaining operational excellence is key: small, frequent releases, thorough testing, and regular reviews of requirements help ensure the design remains flexible and able to evolve. Communication with product teams is essential to understand the long-term vision. Once the product reaches hundreds of thousands of users, logging, metrics, and automation become essential. 

**Infrastructure**

For scaling we have vertical versus horizontal approaches. Horizontal scaling is generally preferable here, since we are talking about microservices. We would evaluate whether the application needs to serve users globally. 

Separating application and database tiers allows independent scaling of each. 

Load balancing across multiple availability zones, caching, and database replication for read-heavy workloads would improve performance. 

For a blog platform, static content could be served via a CDN to reduce latency, and this approach can extend to images stored in something like S3. 

Rate limiting could be implemented via an API Gateway, and Shield or similar services could protect against DDoS attacks while enforcing other security best practices.

It would be important to understand usage patterns, including read/write ratios, and to establish a tested disaster recovery strategy. If the database grows too large, sharding (horizontal scaling) may be required.

All of these considerations must be balanced carefully between business needs and cost efficiency.

---

5. **How would you change the architecture to allow for models that are stored in different databases? E.g. posts are stored in Cassandra and blogs are stored in Postgres.**

It could very well be the case that posts are stored in a NoSQL database, which is more suited for large amounts of unstructured data.

I would keep the repository pattern so that services depend on interfaces rather than implementations. Each module would use the appropriate repository, for example, posts would use a Cassandra repository and blogs would use a Postgres repository. This is already supported in the current project structure, so the architecture can accommodate this change.

The main challenge becomes transactions, such as creating a blog with posts. In this case, each database operation would need to be executed sequentially, tracking state and implementing rollback if any step fails. For example, if the blog creation succeeds but the post creation fails, the blog should be deleted to maintain consistency. 

Cross database operations mean eventual consistency, we must accept this as a trade off. If we need strong consistency then we should add the related data in the same DB. 

---

6. **How would you deploy the Architecture you designed in a production ready way?**

I would ensure proper logging and observability across all services to monitor performance and detect issues quickly.

 GraphQL validation would be added to enforce input correctness and prevent invalid requests.

 A CI/CD pipeline would be implemented to automate testing, building, and deployment. Additionally, I would maintain multiple environments, like dev - qa - preprod - prod, with a plan and process for promoting changes safely from one environment to the next.

I would also make sure we have Database backups set in place  and a disaster recovery plan before we make it to production.
