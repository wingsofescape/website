import { type SchemaTypeDefinition } from "sanity";
import { heroBannerType } from "./heroBannerType";
import { destinationType } from "./destinationType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroBannerType, destinationType],
};
