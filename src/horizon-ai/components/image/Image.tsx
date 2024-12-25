"use client";
import { Box, BoxProps, ImageProps } from "@chakra-ui/react";

type ChakraNextImageProps = Partial<ImageProps> &
  Partial<BoxProps> & {
    nextProps?: any;
  };

function parseAssetPrefix(image: string) {
  const alreadyHasHttp = image.match("http");
  if (alreadyHasHttp) return image;

  const prefix = "";
  const alreadyHasPrefix = image.match(prefix);

  const finalUrl = alreadyHasPrefix ? image : `${prefix}${image}`;
  return finalUrl;
}

export function Image(props: ChakraNextImageProps) {
  const { src, alt, nextProps = {}, ...rest } = props;

  const imageUrl =
    typeof src === "string" ? src : ((src as any)?.src as string);
  return (
    <Box overflow={"hidden"} position="relative" {...rest}>
      <img src={parseAssetPrefix(imageUrl)} alt={alt} />
    </Box>
  );
}
