import { type SchemaTypeDefinition } from "sanity";
import { heroBannerType } from "./heroBannerType";
import { destinationType } from "./destinationType";
import { tourType } from "./tourType";
import destinationTours from "./destinationTours";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroBannerType, destinationType, tourType, destinationTours],
};
