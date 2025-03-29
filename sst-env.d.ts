/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */

declare module "sst" {
  export interface Resource {
    "MyApi": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "MyApiGateway": {
      "type": "sst.aws.ApiGatewayV2"
      "url": string
    }
    "MyBackend": {
      "service": string
      "type": "sst.aws.Service"
      "url": string
    }
    "MyBucket": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "MyVpc": {
      "type": "sst.aws.Vpc"
    }
    "MyWeb": {
      "type": "sst.aws.StaticSite"
      "url": string
    }
  }
}
/// <reference path="sst-env.d.ts" />

import "sst"
export {}