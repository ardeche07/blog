# blog

# Getting started

## Prerequisites

**Node.js 14+ is installed in the system.**

If you don't have Node.js installed, or its version is smaller than 14, follow
[this guide](https://nodejs.org/en/download/package-manager/) to install it.

**`yarn` is installed in the system as a package manager.**

Yarn in an alternative package manager for Node.js. It needs to be installed separately.
If you already have Node.js installed, run the following command to add Yarn:

```bash
npm install --global yarn
```

## Installation

Clone the repo and init submodules with the actual docs:

```bash
git clone git@github.com:gravitational/blog.git
cd blog
```

Install dependencies with:

```bash
yarn
```

## Running blog

Now run one of the following commands:

- `yarn dev` - will run development server for blog at `localhost:3000/blog` that will autorefresh pages in real time when you edit markdown documents.
- `yarn build` - will build static production version.
- `yarn start` - will display documentation built with `npm run build` at `localhost:3000`.

## Development-related commands

- `yarn test` – runs tests. Used on CI.
- `yarn lint` – checks JS and TS files for errors and automatically fixes them.
- `yarn lint-check` – checks JS and TS files for errors, but doesn't fix them. Checked in CI and on commit.
- `yarn typecheck` – validates TypeScript type-related errors. Used on CI.
- `yarn build-node` – builds configs and plugins for mdx.
- `yarn extract-article-covers` - copy the image for the last five articles of the main page and the tag pages of the blog into a shared folder. This script will automatically run with the `yarn build` or `yarn dev` commands. To see new post cover in `/blog` or `/blog/tags` root page during development you have to restart development server (`yarn dev`).
- `yarn generate-rss` – generates rss-feed for blog.
- `yarn markdown-lint` – lints `*.mdx` files inside `content/**/blog/pages/` folders for syntax errors.
- `yarn markdown-lint-external-links` – same as `yarn markdown-lint` but checks that external links work. Separate command because of slowness.
- `yarn markdown-fix` – fixes syntax automatically in `*.mdx` files inside `content/**/blog/pages/`.
