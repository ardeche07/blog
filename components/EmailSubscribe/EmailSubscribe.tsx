import { Fragment } from "react";
import styled from "styled-components";
import { css, all, transition } from "components/system";
import Box from "components/Box";
import Flex, { FlexProps } from "components/Flex";
import Section from "components/Section";
import { RecaptchaTOC } from "components/MarketoForm";
import { useNewsletter } from "./useNewsletter";

const labelObject = {
  as: "label",
  htmlFor: "email",
  textTransform: "uppercase",
  width: "100%",
  text: "text-xs",
};
interface SubscriptionFormProps {
  isViolet?: boolean;
  callbackName?: string;
}

const SubscriptionForm = ({
  isViolet,
  callbackName,
}: SubscriptionFormProps) => {
  const {
    disabled,
    UID,
    buttonLabel,
    error,
    value,
    submitting,
    submitted,
    onChange,
    onSubmit,
  } = useNewsletter(callbackName);
  const WrapperInput = isViolet ? Box : Fragment;
  const wrapperProps = isViolet ? labelObject : undefined;

  return disabled ? null : (
    <>
      <Flex
        as="form"
        onSubmit={onSubmit}
        mt={isViolet ? [3, "19px"] : [0, "19px"]}
      >
        <WrapperInput {...wrapperProps}>
          {isViolet && "Email address"}
          <StyledInput
            as="input"
            type="email"
            id="email"
            aria-required="true"
            value={value}
            placeholder="Email address"
            disabled={submitting}
            onChange={onChange}
            borderWidth={isViolet ? 0 : "1px"}
            borderRightWidth={0}
          />
        </WrapperInput>
        <StyledButton
          as="button"
          type="submit"
          disabled={submitting}
          color={isViolet ? "dark-purple" : "gray"}
          ml={isViolet ? 2 : 0}
          px={isViolet ? [3, 5] : 5}
          bg={isViolet ? "white" : "lightest-gray"}
          alignSelf={isViolet ? "flex-end" : "auto"}
          borderWidth={isViolet ? 0 : "1px"}
        >
          {buttonLabel}
        </StyledButton>
      </Flex>
      <Box
        color="gray"
        fontSize="text-sm"
        lineHeight="12px"
        textAlign="center"
        mt={1}
        minHeight="15px"
      >
        {!submitted && !error && (
          <Box
            visibility={value.length > 0 ? "visible" : "hidden"}
            textAlign={isViolet ? "left" : "center"}
          >
            <RecaptchaTOC />
          </Box>
        )}
        {!!submitted && <Box color="green">Submitted successfully!</Box>}
        {!!error && <Box color="red">{error}</Box>}
      </Box>
      <Box
        id={UID}
        css={css({
          ".grecaptcha-badge": { visibility: "hidden" },
        })}
      ></Box>
    </>
  );
};

export function EmailSubscribe({ ...props }: FlexProps) {
  return (
    <Flex
      backgroundColor="white"
      justifyContent="center"
      alignItems={["stretch", "center"]}
      flexDirection={["column", "row"]}
      py={2}
      {...props}
    >
      <Box as="p" text={["text-xl", "header-4"]} color="darkest">
        Get the latest product updates and engineering blog posts
      </Box>
      <Box
        ml={[0, 4]}
        mt={[2, 0]}
        minHeight="40px"
        minWidth={["auto", "500px"]}
      >
        <SubscriptionForm />
      </Box>
    </Flex>
  );
}

export function EmailSubscribeViolet({ ...props }: FlexProps) {
  return (
    <StyledSection bg="purple" {...props}>
      <Box as="h2" text={["text-xl", "header-3"]}>
        Teleport cybersecurity blog posts and tech news
      </Box>
      <Box as="p" text="text-md">
        {
          "Every other week we'll send a newsletter with the latest cybersecurity news and Teleport updates."
        }
      </Box>
      <Box minHeight="40px">
        <SubscriptionForm callbackName="violetSubscription" isViolet />
      </Box>
    </StyledSection>
  );
}

const StyledInput = styled(Box)(
  css({
    boxSizing: "border-box",
    minHeight: "40px",
    width: "100%",
    fontSize: "text-xl",
    px: 2,
    borderTopLeftRadius: "default",
    borderBottomLeftRadius: "default",
    borderStyle: " solid",
    borderColor: "light-gray",
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      fontSize: ["14px", "18px"],
    },
    "&:disabled": {
      opacity: 0.5,
    },
  })
);

const StyledButton = styled(Box)(
  css({
    borderStyle: "solid",
    borderColor: "light-gray",
    borderTopRightRadius: "default",
    borderBottomRightRadius: "default",
    minHeight: "40px",
    textTransform: "uppercase",
    cursor: "pointer",
    flex: "0 0 auto",
    transition: transition([["backgroundColor", "interaction"]]),
    "&:focus, &:hover": {
      outline: "none",
      backgroundColor: "light-gray",
    },
    "&::disabled": {
      opacity: 0.5,
      pointerEvents: "none",
    },
  })
);

const StyledSection = styled(Section)(
  css({
    display: "flex",
    flexDirection: "column",
    color: "white",
    pt: [4, 3],
    pb: [3, 4],
    px: [4, 5],
    mt: 6,
    mb: 5,
    borderRadius: "16px",
    boxShadow: "0 0 12px rgba(0, 0, 0, 0.32)",
  }),
  all
);
