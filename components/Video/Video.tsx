import Box, { BoxProps } from "components/Box";

type Props = {
  videoId?: string;
  src?: string;
  width?: number;
  height?: number;
  borderRadius?: "sm" | "md" | "lg" | "default" | "none";
} & BoxProps;

const toSrc = (id: string): string => `https://www.youtube.com/embed/${id}`;

export default function Video({
  src: rawSrc,
  videoId,
  width = 640,
  height = 360,
  borderRadius = "md",
  ...props
}: Props) {
  const src = videoId ? toSrc(videoId) : rawSrc;
  return (
    <Box width="100%" maxWidth={`${width}px`} {...props}>
      <Box
        width="100%"
        position="relative"
        borderRadius={borderRadius}
        overflow="hidden"
        pb={`${(height / width) * 100}%`}
      >
        <Box
          as="iframe"
          width="100%"
          height="100%"
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          src={src}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
    </Box>
  );
}
