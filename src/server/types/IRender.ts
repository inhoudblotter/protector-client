export type IRender = ({
  url,
  context,
}: {
  url: string;
  context?: object;
}) => Promise<string>;
