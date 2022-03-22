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

## Creating a new blog post

1. Create a new folder in the `pages` folder. We will refer to this folder as the "article" folder; each blog post will have its own article folder. The name of this folder will be part of the URI address for this article _(slug)_. For example, if you named the article folder `ssh-config`, the address of this article will be `goteleport.com/blog/ssh-config/`. Good practice is to give the article folder a shortened version of the title of blog post itself.
2. If you have images in your article, then create a new folder inside the article folder and name it `assets`. All images that will exist in the blog post should be placed in the `assets` folder.
3. In the article folder, create an `index.mdx` file. This will contain the main content of the blog post.
4. At the very top of `index.mdx` add `frontmatter`, which is our blog post meta-information. `Frontmatter` is delimited with `---`, that is, all `frontmatter` is placed between two lines of `---`. `Frontmatter` is made up of variables called `fields`. They must be followed by a colon `:`. The following fields are required:

   - `title` is the text that appears in the browser tab (see image below), as well as what appears as the title on the search results page. If the title of the article (`articleTitle`) and the name of the tab are the same, you can specify only the title of the article.
     ![title](./resources/title.png)
   - `description` - a short and clear summary of the page content. It lets search engines and users know what content is waiting for them on the page. Often search engines use the `description` as a short description (snippet) - which is visible in the search results page. Among other things, `description` appears in the list of articles on the main page of the blog and on pages filtered by tag (here and below - the list of articles).
     ![description](./resources/description.png)
   - `articleTitle` is the title of the article (the blog post itself). Also `articleTitle` is displayed as the title in the list of articles.
     ![frontmatter](./resources/frontmatter.png)
   - `date` - is specified in the format "YYYYY-MM-DD". Subsequently, this format is transformed into the desired format for the article card in the list of articles and for the page of the article itself. It _must_ be placed in doule quotation marks!
   - `author` - the author of the article.
   - `logo` - the logo field should have the structure below:
     ```
     logo:
      image: ./assets/passwordless@2x.png
      alt: Passwordless SSH
     ```
     `image` - a path to the image. Which will be displayed in the list of articles and under the title in the article.
     `alt` - alternative text for screen readers or when the image cannot be displayed.
   - `tags` - subject tags which can be associated with the article. Blog posts can be filtered by tags. Each tag is written on a new line and preceded by a dash `-` like so:
     ```
     tags:
      - teleport
      - security
      - engineering
     ```
   - `layout: blogArticle` - this specifies the proper layout for blog articles and should not be changed.
5. A final `---` closes out the `frontmatter`. 
6. Here is a model `frontmatter` example: 
    ```
    ---
    articleTitle: Low Latency Identity-aware Access Prox in Multiple Regions
    description: Access proxy is an important tool for securing access to infrastructure.
    title: Low latency access proxy | Teleport
    date: "2021-10-01"
    author: Kevin Nisbet
    logo:
      image: .assets/access-proxy-latency.png
      alt: access proxy latency
    tags:
      - teleport
      - security
      - engineering
    layout: blogArticle
    ---
    ```
7. You may need to import components for images, quotes, etc. These imports are specified after `frontmatter`. Just leave a line after the concluding `---` and then start import statements.

8. If the article contains images other than the one specified in `logo`, import an image component called `BlogImage` with the following code: 
    ```
    import BlogImage from "components/BlogImage";
    ```

    The `BlogImage` component is then used where appropriate like this:
     ```
     <BlogImage
       src="./assets/architecture-for-aws-iam-multiple-accounts.png"
       alt="architecture for aws iam multiple accounts"
     />
     ```
     If you need a picture with a caption, use the component with `figure` and `figcaption` elements:
     ```
     <figure>
      <BlogImage alt="Cluster management screen" src="./assets/teleport-clusters-4.3.png"/>
      <figcaption>
        A new clusters management screen that allows users to search and manage clusters at scale. Previously this was a dropdown menu causing major UX issues
      </figcaption>
     </figure>
     ```
9. To import a quote component use: 
    ```
    import Quote from "components/Quote";
    ```
     Use it like so where appropriate:
     ```
     <Quote>
      Can we host the ACME Net platform inside our customers’ AWS accounts?
     </Quote>
     ```
     This is how it appears on the page:
     ![quote](./resources/quote.png)
10. An email subscription component should appear somewhere in the body of the article at an appropriate break:
    ```
    import { EmailSubscribeViolet } from "components/EmailSubscribe";
    ```
    It is used like this:
     ```
      <EmailSubscribeViolet />
     ```
    It appears on the page like this:
    ![email-subscribe](./resources/email-subscribe.png)

11. Here are what imports look like on the page:
  ```
  import BlogImage from "components/BlogImage";
  import { EmailSubscribeViolet } from "components/EmailSubscribe";
  import (any further imports...)
  ```
12. Next comes the actual content of the blog post, written in `.md` / `.mdx` format. 

13. Finally, don't hesitate to look at the `index.mdx` files in other article folders for complete examples. 

14. To learn more about basic `.md`/`.mdx` syntax read these nice articles:

- [Basic Syntax | Markdown Guide](https://www.markdownguide.org/basic-syntax/)
- [Basic writing and formatting syntax GitHub](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
