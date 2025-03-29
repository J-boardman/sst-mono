export const web = new sst.aws.StaticSite("MyWeb", {
  path: "packages/frontend",
  build: {
    command: "npx quasar build",
    output: "dist/spa",
  },
});
