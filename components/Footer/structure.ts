const HOST = process.env.NEXT_PUBLIC_TELEPORT_HOST;

const footerNavigation = {
  copyright: [
    {
      title: "Terms of service",
      url: `https://${HOST}/tos/`,
    },
    { title: "Privacy policy", url: `https://${HOST}/privacy/` },
    { title: "Security policy", url: `https://${HOST}/security/` },
    { title: "Site map", url: `https://${HOST}/html-sitemap/` },
  ],

  launchpad: [
    {
      title: "Products",
      items: [
        { title: "Teleport Overview", url: `https://${HOST}/` },
        {
          title: "Teleport Server Access",
          url: `https://${HOST}/ssh-server-access/`,
        },
        {
          title: "Teleport Kubernetes Access",
          url: `https://${HOST}/kubernetes-access/`,
        },
        {
          title: "Teleport Database Access",
          url: `https://${HOST}/database-access/`,
        },
        {
          title: "Teleport Application Access",
          url: `https://${HOST}/application-access/`,
        },
        {
          title: "Teleport Desktop Access",
          url: `https://${HOST}/desktop-access/`,
        },
        {
          title: "Teleport Features",
          url: `https://${HOST}/features/`,
        },
        {
          title: "Teleport Pricing",
          url: `https://${HOST}/pricing/`,
        },
      ],
    },
    {
      title: "Documentation",
      items: [
        {
          title: "Documentation home",
          url: `https://${HOST}/docs/`,
        },
        {
          title: "How Teleport works",
          url: `https://${HOST}/teleport/how-it-works/`,
        },
        {
          title: "GitHub repository",
          url: "https://github.com/gravitational/teleport",
        },
      ],
    },
    {
      title: "Learn",
      items: [
        { title: "Blog", url: `/` },
        { title: "Customers", url: `https://${HOST}/case-study/` },
        { title: "Resources", url: `https://${HOST}/resources/` },
        { title: "Events", url: `https://${HOST}/about/events/` },
      ],
    },
    {
      title: "Company",
      items: [
        { title: "About us", url: `https://${HOST}/about/` },
        { title: "Careers", url: `https://${HOST}/careers/` },
        { title: "News", url: `https://${HOST}/about/press/` },
      ],
    },
    {
      title: "Get in touch",
      items: [
        { title: "(855) 818 9008", url: "tel:855-818-9008" },
        {
          title: "General inquiries",
          url: `https://${HOST}/contact-us/`,
        },
        {
          title: "Customer support",
          url: "https://gravitational.zendesk.com/hc/en-us",
        },
        {
          title: "Connect",
          items: [
            {
              title: "Community forum",
              url: "https://github.com/gravitational/teleport/discussions",
            },
            { title: "Slack", url: `https://${HOST}/slack/` },
            { title: "Github", url: "https://github.com/gravitational" },
            { title: "Twitter", url: "https://twitter.com/goteleport" },
          ],
        },
      ],
    },
  ],
};

export default footerNavigation;
