const isExternalUrl = (url: string) => {
  const siteUrl = process.env.BASE_URL ? process.env.BASE_URL : "";

  // If site url env match or missing protocol, it's an internal url
  return url.includes(siteUrl) || !url.includes("://") ? false : true;
};
export default isExternalUrl;
