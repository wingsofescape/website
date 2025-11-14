import { type SchemaTypeDefinition } from "sanity";
import { destinationType } from "./destinationType";
import { tourType } from "./tourType";
import { HomePageType } from "./homePageType";
import { blogType } from "./blogType";
import { top10Types } from "./top10Types";
import { byMonthTypes } from "./byMonthTypes";
import { aboutUsTypes } from "./aboutUsTypes";
import { ContactUsTypes } from "./contactUsTypes";
import { TestemonialsTypes } from "./testemonialsTypes";
import { privacyPolicyTypes } from "./privecyPolicyTypes";
import { termsAndConditionsTypes } from "./tncTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [HomePageType, destinationType, tourType, blogType, top10Types, byMonthTypes, aboutUsTypes, ContactUsTypes, TestemonialsTypes, termsAndConditionsTypes, privacyPolicyTypes],
};
