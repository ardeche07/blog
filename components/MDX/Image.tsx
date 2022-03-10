import css from "@styled-system/css";
import { Children, cloneElement, useMemo } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import Box from "components/Box";
import Flex from "components/Flex";

type PositioningValue = "left" | "center" | "right";
type MarginValue = number | number[] | string | string[];

/**
 * This component is substituted in place of <img> by the MDX processor.
 */

// uses the positioningValue prop to return alignment of image on page
const getAlignItems = (align?: PositioningValue) => {
  switch (align) {
    case "right":
      return "flex-end";
    case "left":
      return "flex-start";
    default:
      return align;
  }
};

interface SharedProps {
  align?: PositioningValue;
  bordered?: boolean;
  caption?: string;
  yMargin?: MarginValue;
  xMargin?: MarginValue;
  imagePositioning?: PositioningValue;
}

export type ImageProps = SharedProps & NextImageProps;

// formats the image with the props and returns a next/image
const getImage = (
  imageProps: NextImageProps,
  imagePositioning?: PositioningValue
) => {
  if (imagePositioning) {
    return (
      <Flex justifyContent={imagePositioning} width="100%">
        <NextImage {...imageProps} />
      </Flex>
    );
  }
  return <NextImage {...imageProps} />;
};

// this component passed to the MDX processor and returned by default when using
// md syntax, e.g. ![image](./image.png)
export const Image = ({
  align,
  bordered,
  caption,
  xMargin,
  yMargin = 3,
  imagePositioning,
  ...props
}: ImageProps) => {
  const imageProps = useMemo((): NextImageProps => {
    const imageTemp = {
      ...props,
    };

    return imageTemp as NextImageProps;
  }, [props]);

  return (
    <Flex
      as="span"
      mx={xMargin}
      my={yMargin}
      flexDirection="column"
      alignItems={getAlignItems(align)}
      css={css({
        "&:fisrt-child": {
          mt: 0,
        },
        "&:last-child": {
          mb: 0,
        },
      })}
    >
      {bordered ? (
        <Box as="span" boxShadow="0 1px 4px rgba(0, 0, 0, 0.24)">
          {getImage(imageProps, imagePositioning)}
        </Box>
      ) : (
        getImage(imageProps, imagePositioning)
      )}
      {caption && (
        <Box as="figcaption" mt="2" color="gray" fontStyle="italic">
          {caption}
        </Box>
      )}
    </Flex>
  );
};

Image.defaultProps = {
  align: "left",
};

type ImageComponent = React.ReactElement<typeof Image>;

export type FigureProps = ImageProps & {
  children: ImageComponent;
};

export const Figure = ({ children, ...rest }: FigureProps) => {
  const image = Children.only<ImageComponent>(children);

  return cloneElement(image, rest);
};
