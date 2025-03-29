import { backend } from "./backend";

export const web = new sst.aws.StaticSite("MyWeb", {
  path: "packages/frontend",
  build: {
    command: "npx quasar build",
    output: "dist/spa",
  },
  dev: {
    command: `npx quasar dev`,
  },
  environment: {
    VITE_API_URL: backend.url,
  },
});
