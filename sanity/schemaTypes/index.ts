import { type SchemaTypeDefinition } from "sanity";
import { heroBannerType } from "./heroBannerType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroBannerType],
};
