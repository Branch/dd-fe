const isExternalUrl = (url: string) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "";

  // If site url env match or missing protocol, it's an internal url
  return url.includes(siteUrl) || !url.includes("://") ? false : true;
};
export default isExternalUrl;
