import { type SchemaTypeDefinition } from "sanity";
import { heroBannerType } from "./heroBannerType";
import { destinationType } from "./destinationType";
import { tourType } from "./tourType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroBannerType, destinationType, tourType],
};
