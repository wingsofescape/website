export const createBreadcrumbs = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  const breadCrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return {
      label:
        segment.charAt(0).toUpperCase() + segment.slice(1) === "Destination"
          ? "Home"
          : segment.charAt(0).toUpperCase() + segment.slice(1),
      ref:
        segment.charAt(0).toUpperCase() + segment.slice(1) === "Destination"
          ? "/"
          : href,
    };
  });
  return breadCrumbs;
};
