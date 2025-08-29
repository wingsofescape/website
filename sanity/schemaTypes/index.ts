import { type SchemaTypeDefinition } from "sanity";
import { destinationType } from "./destinationType";
import { tourType } from "./tourType";
import { HomePageType } from "./homePageType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [HomePageType, destinationType, tourType],
};
