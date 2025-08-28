import { type SchemaTypeDefinition } from "sanity";
import { LandingPageType } from "./LandingPageType";
import { destinationType } from "./destinationType";
import { tourType } from "./tourType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [LandingPageType, destinationType, tourType],
};
