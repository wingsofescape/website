import { type SchemaTypeDefinition } from "sanity";
import { HomePageType } from "./HomePage";
import { destinationType } from "./destinationType";
import { tourType } from "./tourType";
import destinationTours from "./destinationTours";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [HomePageType, destinationType, tourType, destinationTours],
};
