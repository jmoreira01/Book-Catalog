import Joi from "joi";

export class AuthorEditDTO {
    id: number = 0;
    name: string = "";
    country: string = "";
}

export const EditAuthorDTOSchema = Joi.object({
    name: Joi.string().messages({"string.empty": "Fill the Author Name" }),
    country: Joi.string().messages({"string.empty": "Fill the Author Country" }),
});