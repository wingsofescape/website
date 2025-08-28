import { type SchemaTypeDefinition } from "sanity";
import { LandingPage } from "./LandingPage";
import { destinationType } from "./destinationType";
import { tourType } from "./tourType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [LandingPage, destinationType, tourType],
};
