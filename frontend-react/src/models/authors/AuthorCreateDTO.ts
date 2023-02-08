import Joi from "joi";

export class AuthorCreateDTO {
    id: number = 0;
    name: string = "";
    country: string = "";
}

export const CreateAuthorDTOSchema = Joi.object({
    name: Joi.string().messages({"string.empty": "Fill with the author name" }),
    country: Joi.string().messages({"string.empty": "Fill with the author country" })
});