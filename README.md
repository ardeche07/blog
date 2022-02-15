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
- `yarn generate-sitemap` - generates sitemap for blog.

## Creating a new article

1. Create a new folder in the pages folder. The name of this folder will be part of the uri address for this article. That is, if you named the folder `ssh-config`, the address of this article will be `goteleport.com/blog/ssg-config`.
2. If you have pictures in your article, then create a new folder inside the folder you created and name it `assets`. Inside it put all the pictures that relate to this article.
3. For the article itself create a folder (p.1) file `index.mdx`.
4. At the beginning of the article in the file `index.mdx` must be filled `frontmatter`. These fields are needed for further work and display the new article in the blog.
5. On the first line of the file `index.mdx` write `---`. This will be the beginning of `frontmatter`. Next, write the following lines:
