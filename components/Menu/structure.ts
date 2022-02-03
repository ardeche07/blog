import { MenuCategoryProps } from "./Category";
import databaseSvgPath from "./assets/database.svg";
import applicationSvgPath from "./assets/application.svg";
import kubernetesSvgPath from "./assets/kubernetes.svg";
import serverSvgPath from "./assets/server.svg";
import desktopSvgPath from "./assets/desktop.svg";
import featuresSvgPath from "./assets/features.svg";

const HOST = process.env.NEXT_PUBLIC_TELEPORT_HOST;

const menu: MenuCategoryProps[] = [
  {
    title: "Products",
    description: "Teleport Products",
    href: `${HOST}/teleport/`,
    children: [
      {
        image: serverSvgPath,
        title: "Teleport Server Access",
        description:
          "SSH securely into Linux servers and smart devices with a complete audit trail",
        href: `https://${HOST}/ssh-server-access/`,
      },
      {
        image: kubernetesSvgPath,
        title: "Teleport Kubernetes Access",
        description:
          "Access Kubernetes clusters securely with complete visibility to access and behavior",
        href: `https://${HOST}/kubernetes-access/`,
      },
      {
        image: applicationSvgPath,
        title: "Teleport Application Access",
        description:
          "Access web applications running behind NAT and firewalls with security and compliance",
        href: `https://${HOST}/application-access/`,
      },
      {
        image: databaseSvgPath,
        title: "Teleport Database Access",
        description:
          "For PostgreSQL and MySQL databases behind NAT in multiple environments",
        href: `https://${HOST}/database-access/`,
      },
      {
        image: desktopSvgPath,
        title: "Teleport Desktop Access",
        description:
          "Securely access Windows servers and desktops in multiple environments.",
        href: `https://${HOST}/desktop-access/`,
      },
      {
        image: featuresSvgPath,
        title: "Teleport Features",
        description:
          "An overview of Teleport Access Plane features, capabilities and more...",
        href: `https://${HOST}/features/`,
      },
    ],
  },
  {
    title: "Use Cases",
    description: "Teleport Use Cases",
    href: `/`,
    children: [
      {
        icon: "building",
        title: "Financial Services",
        description: "Learn how Financial Services companies use Teleport",
        href: `https://${HOST}/use-cases/finance/`,
      },
      {
        icon: "window",
        title: "Software-as-a-service (SaaS) Providers",
        description: "Learn how SaaS providers use Teleport",
        href: `https://${HOST}/use-cases/saas/`,
      },
      {
        icon: "gamepad",
        title: "E-commerce & Entertainment",
        description:
          "Learn how E-commerce & Entertainment companies use Teleport",
        href: `https://${HOST}/use-cases/ecommerce-entertainment/`,
      },
      {
        icon: "server",
        title: "Infrastructure Access for AWS",
        description:
          "Easily control who can provision and access your critical AWS resources",
        href: `https://${HOST}/use-cases/aws/`,
      },
    ],
  },
  {
    title: "Documentation",
    description: "Teleport documentation",
    href: `/docs/`,
    children: [
      {
        icon: "stack",
        title: "Documentation",
        description: "Developer documentation for using Teleport",
        href: `https://${HOST}/docs/`,
      },
      {
        icon: "gamepad",
        title: "How it Works",
        description: "Learn the fundamentals of how Teleport works",
        href: `https://${HOST}/teleport/how-it-works/`,
      },
      {
        icon: "question",
        title: "Community Forum",
        description:
          "Ask us a setup question, post your tutorial, feedback or idea on our forum",
        href: `https://github.com/gravitational/teleport/discussions`,
      },
      {
        icon: "window",
        title: "Teleport Slack Channel",
        description: "Need help with set-up? Ping us in Slack channel",
        href: `https://${HOST}/slack`,
      },
      {
        icon: "code",
        title: "Github",
        description: "View the open source repository on Github",
        href: `https://github.com/gravitational/teleport`,
      },
    ],
  },
  {
    title: "Learn",
    description: "Learn more about teleport",
    href: `/resources/`,
    children: [
      {
        icon: "note",
        title: "The blog",
        description: "Technical articles, news, and product announcements",
        href: `/`,
      },
      {
        icon: "building",
        title: "Our customers",
        description:
          "Learn how companies use Teleport to secure their environments",
        href: `https://${HOST}/case-study/`,
      },
      {
        icon: "presentation",
        title: "Resources",
        description:
          "A collection of whitepapers, webinars, demos, and more...",
        href: `https://${HOST}/resources/`,
      },
      {
        icon: "calendar",
        title: "Events",
        description: "View our upcoming events",
        href: `https://${HOST}/about/events/`,
      },
    ],
  },
  {
    title: "Pricing",
    description: "Pricing",
    href: `https://${HOST}/pricing/`,
  },
  {
    title: "Company",
    description: "Company",
    href: `https://${HOST}/about/`,
    children: [
      {
        icon: "building",
        title: "About us",
        description: "Our missions and vision for the future",
        href: `https://${HOST}/about/`,
      },
      {
        icon: "flag",
        title: "Careers",
        description: "View our available career opportunities",
        href: `https://${HOST}/careers`,
      },
      {
        icon: "earth",
        title: "News",
        description: "Featured publication from around the web",
        href: `https://${HOST}/about/press/`,
      },
    ],
  },
];

export default menu;
