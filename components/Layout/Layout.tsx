import Header from "components/Header";
import Flex, { FlexProps } from "components/Flex";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children, ...props }: LayoutProps & FlexProps) => {
  return (
    <>
      <Header />
      <Flex as="main" flexDirection="column" {...props}>
        {children}
      </Flex>
    </>
  );
};

export default Layout;
