import { bucket } from "./storage";

const vpc = new sst.aws.Vpc("MyVpc");
const cluster = new sst.aws.Cluster("MyCluster", { vpc });

export const backend = new sst.aws.Service("MyBackend", {
  cluster,
  loadBalancer: {
    ports: [{ listen: "80/http" }],
  },
  image: {
    dockerfile: "packages/backend/Dockerfile",
    context: "packages/backend",
  },

  link: [bucket],
  dev: {
    command: "node --watch index.mjs",
    url: "http://localhost:80",
  },
  serviceRegistry: {
    port: 80,
  },
});

export const api = new sst.aws.ApiGatewayV2("MyApiGateway", {
  vpc,
});

if (!$dev) {
  api.routePrivate("$default", backend.nodes.cloudmapService.arn);
}
