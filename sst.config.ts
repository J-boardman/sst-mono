/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "testrfp-ai",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile:
            input.stage === "production" ? "Testing-production" : "Testing-dev",
        },
      },
    };
  },
  console: {
    autodeploy: {
      target(event) {
        if (
          event.type === "branch" &&
          event.branch === "main" &&
          event.action === "pushed"
        ) {
          return { stage: "production" };
        }
      },
    },
  },
  async run() {
    const infra = await import("./infra");

    return {
      MyBucket: infra.bucket.name,
      MyBackend: infra.backend.url,
    };
  },
});
