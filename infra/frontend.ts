import { api, backend } from "./backend";

export const web = new sst.aws.StaticSite("MyWeb", {
  path: "packages/frontend",
  build: {
    command: "npx quasar build",
    output: "dist/spa",
  },
  dev: {
    command: `npx quasar dev -m pwa`,
  },
  environment: {
    VITE_API_URL: $dev ? backend.url : api.url,
  },
});
