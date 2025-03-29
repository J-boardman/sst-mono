Based on the knowledge sources provided, I can help you set up an Express and Vue 3 app in a monorepo structure using SST v3.

SST provides a monorepo template that you can use as a starting point. Here's how you can set it up:

## Setting up the monorepo

1. First, use the SST monorepo template:

```
# Head over to github.com/sst/monorepo-template
# Click on "Use this template" and create a new repo
# Clone the repo
# Rename it to your app
npx replace-in-file /monorepo-template/g MY_APP **/*.* --verbose
# Install dependencies
npm install
```

The template provides a structure with `packages/` and `infra/` directories:

```
my-sst-app
├─ sst.config.ts
├─ package.json
├─ packages
│  ├─ functions
│  ├─ scripts
│  └─ core
└─ infra
```

[Set up a Monorepo](https://sst.dev/docs/set-up-a-monorepo#_top) explains that you can add additional packages to the `packages/` directory, which is what we'll do for our Express backend and Vue frontend.

## Adding Express backend

For the Express backend, you can create a new package in the `packages/` directory:

1. Create a `packages/backend` directory
2. Set up Express similar to the example in the knowledge sources:

```
mkdir packages/backend
cd packages/backend
npm init -y
npm install express
```

Create an `index.mjs` file:

```javascript
import express from "express";

const PORT = 80;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

## Setting up infrastructure

In your `sst.config.ts`, you'll need to set up the infrastructure for your Express app:

```typescript
async run() {
  const vpc = new sst.aws.Vpc("MyVpc");
  const cluster = new sst.aws.Cluster("MyCluster", { vpc });
  const bucket = new sst.aws.Bucket("MyBucket");

  new sst.aws.Service("MyService", {
    cluster,
    loadBalancer: {
      ports: [{ listen: "80/http" }],
    },
    link: [bucket],
    dev: {
      command: "node --watch packages/backend/index.mjs",
    },
  });
}
```

## Adding Vue 3 frontend

For the Vue frontend, you would:

1. Create a `packages/frontend` directory
2. Set up a Vue 3 app in this directory

While the knowledge sources don't provide specific examples for Vue 3, you can follow a similar pattern to other frontend frameworks. You would need to create a component in your `sst.config.ts` to deploy the Vue app.

## Linking resources

To link resources between your Express backend and Vue frontend:

1. Create resources in your `sst.config.ts`
2. Link them using the `link` property
3. Access them in your code using the SST SDK

```typescript
// In your Express backend
import { Resource } from "sst";
console.log(Resource.MyBucket.name);
```

## Running locally

To run your app locally:

```
npx sst dev
```

This will start SST and your Express app. For the Vue app, you might need to wrap your dev command:

```
sst dev vue-cli-service serve
```

Note that the knowledge sources don't contain specific examples for Vue 3 with Express in a monorepo, so I've provided a general approach based on the available information about SST v3's monorepo setup and Express integration.
