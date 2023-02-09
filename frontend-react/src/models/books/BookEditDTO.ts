import Joi from "joi";
import { GenericNotEmptySchema } from "../../helpers/JoiValidations";

export class BookEditDTO {
    id: number = 0;
    isbn: number = 0;
    title: string = "";
    price: number = 0;
    authorName: string = "";
}

export const EditBookDTOSchema = Joi.object({
    isbn: Joi.number().min(0).messages({ "number.base": "Isbn must be a number!", "number.min": "Isbn cant be negative" }),
    title: GenericNotEmptySchema("Book Title"),
    authorName: Joi.number().min(0).messages({ "number.base": "Fil with the author name" }),
    price: Joi.number().min(0).messages({ "number.base": "Price must be a number", "number.min": "Price cant be negative" }),
});
