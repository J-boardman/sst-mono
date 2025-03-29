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
  },
});
