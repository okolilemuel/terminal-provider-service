## Terminal Back-End Assignment

#### How would you separate both services so they don’t use the same database?
The producer and Provider services are built using microservice aproach. This means that each of the services exist in isolation of each other. They are designed to be hosted on different servers/containers  while having their own databases([https://12factor.net/backing-services](https://12factor.net/backing-services)). 


#### Would you change anything if transactions are now coming at thousands every second?
The producer service publishes the transactions produced to a GCP PubSub topic, from where the transactions are picked, and made available for request over the api by the provider service.

If a situation arises where transactions are now coming at thousands every second, it will be taken care of by creating more instances of the Provider service to process the transactions in the PubSub topic .

```I used GCP PubSub in this assignment because i was not able to setup a kafka cluster within the time provided```

#### Suddenly your application starts getting thousands of requests per second. Would you change anything to better serve the users?
My response to this kind of situation will be to scale out the Provider service (more instances behind a load balancer).

#### How would you deploy this app? What would be the CI workflow?
Since Kubernetes is used in at Terminal, i will have to deploy the services using GCP Kubernetes CI/CD practices. 
CI workflow will majorly invlove seting rules to check for passing unit tests and lint tests before any new code push is allowed into the code repo.

#### Language used
- I used Node js because that is the language requirment for the job

### Libraries used
- I used PostGraphile([https://www.graphile.org/postgraphile/](https://www.graphile.org/postgraphile/)) for the graphql api because it makes it possible to rapidly develop lightning-fast powerful applications. PostGraphile automatically detects tables, columns, indexes, relationships, views, types, functions, comments, and more — providing a GraphQL server that is highly intelligent about your data, and that automatically updates itself without restarting when you modify your database.

- I used Express js framework, because it works very well with PostGraphile. Express makes it possible to use things like auth handlers with PostGraphile

#### Database used
- I used PostgreSQL because that is the database requirment for the job, and it works perfectly with PostGraphile.