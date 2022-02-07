/*
 * this is the main config loading and normalization logic.
 */

import type { Redirect } from "next/dist/lib/load-custom-routes";

import Ajv, { ValidateFunction } from "ajv";
import configFile from "../config";

interface Config {
  versions: {
    name: string;
    branch: string;
    latest?: true;
  }[];
  redirects?: Redirect[];
  allowedMarketoIds: number[];
}

interface NormalizedConfig {
  latest: string;
  versions: string[];
  branches: Record<string, string>;
  redirects?: Redirect[];
  allowedMarketoIds: number[];
}

export const load = () => {
  return configFile as Config;
};

/*
 * JSON schema fragment for site.
 */

const redirectsSchemaFragment = {
  type: "array",
  items: {
    type: "object",
    properties: {
      source: { type: "string" },
      destination: { type: "string" },
      boolean: { type: "boolean", nullable: true },
      basePath: { type: "boolean", nullable: true },
      statusCode: { type: "number", nullable: true },
      permanent: { type: "boolean", nullable: true },
      has: {
        type: "object",
        properties: {
          type: { type: "string" },
          key: { type: "string", nullable: true },
          value: { type: "string", nullable: true },
        },
        nullable: true,
        additionalProperties: false,
      },
    },
    required: ["source", "destination"],
    additionalProperties: false,
  },
};

/*
 * This a JSON schema describing config.json file format, if actual config
 * have wrong fields or don't have something required, it will throw error then we try
 * to start dev or build mode.
 */

const ajv = new Ajv();

const validator = ajv.compile({
  type: "object",
  properties: {
    versions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          branch: { type: "string" },
          latest: { type: "boolean", nullable: true },
        },
        additionalProperties: false,
        required: ["name", "branch"],
      },
      minItems: 1,
      uniqueItems: true,
    },
    redirects: redirectsSchemaFragment,
    allowedMarketoIds: {
      type: "array",
      items: {
        type: "number",
      },
    },
  },
  required: ["versions", "allowedMarketoIds"],
});

/*
 * Config format for storing data and config format for using data not nescessary the same.
 * Storing version data as a singe array is convenient, but for usage, having separate
 * "latest", "versions" and "branches" fileds are easier, so we transform them here.
 */

export const normalize = ({
  versions,
  allowedMarketoIds,
  redirects,
}: Config): NormalizedConfig => {
  const result: NormalizedConfig = {
    latest: (
      versions.find(({ latest }) => latest === true) ||
      versions[versions.length - 1]
    ).name,
    versions: versions.map(({ name }) => name),
    branches: versions.reduce((result, { name, branch }) => {
      return { ...result, [name]: branch };
    }, {}),
    allowedMarketoIds,
  };

  if (redirects) {
    result.redirects = redirects;
  }

  return result;
};

/*
 * If validation return erros, write them to console and exit.
 */

const validateConfig = <T = Record<string, unknown>>(
  validator: ValidateFunction,
  config: T
) => {
  if (!validator(config)) {
    console.error(validator.errors);

    process.exit(1);
  }
};

/* Load, validate and normalize config. */

export const loadConfig = () => {
  const config = load();

  validateConfig<Config>(validator, config);

  return normalize(config);
};
