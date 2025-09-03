export const createDestinationList = (
  data: { slug: string; destinationHeading: string }[],
  label: string
) => {
  const destinations: {
    label: string;
    items: { name: string; href: string }[];
  } = {
    label: label,
    items: [],
  };
  data.forEach((dest) => {
    destinations.items.push({
      name: dest.destinationHeading,
      href: `/destination/${dest.slug}`,
    });
  });
  return destinations;
};
