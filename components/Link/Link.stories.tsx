import Link, { LinkProps } from "./Link";
import { Meta, Story } from "@storybook/react";

const generateStoryComponent = () => {
  const StoryComponent: Story<LinkProps> = (args) => <Link {...args} />;

  return StoryComponent;
};

const meta: Meta = {
  component: Link,
  title: "Link",
};

export default meta;

export const Default = generateStoryComponent();

Default.args = {
  passthrough: false,
  href: "/",
  children: "Teleport",
};
