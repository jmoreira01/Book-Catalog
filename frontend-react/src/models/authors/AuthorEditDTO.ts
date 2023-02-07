import Joi from "joi";

export class AuthorEditDTO {
    id: number = 0;
    name: string = "";
    nacionality: string = "";
    image: string = "";
}

export const EditAuthorDTOSchema = Joi.object({
    name: Joi.string().messages({"string.empty": "Fill with the Author name" }),
    nacionality: Joi.string().messages({"string.empty": "Fill with the Country name" }),
});