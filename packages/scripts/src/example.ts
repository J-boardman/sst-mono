import { Resource } from "sst";
import { Example } from "@testrfp-ai/core/example";

console.log(`${Example.hello()} Linked to ${Resource.MyBucket.name}.`);
