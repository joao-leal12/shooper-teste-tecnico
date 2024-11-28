import * as yup from 'yup'

export const mainTextMatchedSubstringsSchema = yup.object({
    offset: yup.number().required(),
    length: yup.number().required(),
  });
  
export const structuredFormattingSchema = yup.object({
main_text: yup.string().required(),
secondary_text: yup.string().required(),
main_text_matched_substrings: yup
    .array(mainTextMatchedSubstringsSchema)
    .notRequired(),
});
  
export const placeTypeSchema = yup.object({
    description: yup.string().required(),
    structured_formatting: structuredFormattingSchema.required(),
});