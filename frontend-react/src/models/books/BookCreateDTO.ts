import Joi from "joi";
import { GenericNotEmptySchema } from "../../helpers/JoiValidations";

export class BookCreateDTO {
    id: number = 0;
    isbn: number = 0;
    title: string = "";
    author: number = 0;
    price: number = 0;
    //image: string = "";
}

export const CreateBookDTOSchema = Joi.object({
    isbn: Joi.number().min(0).messages({ "number.base": "Isbn must be a number!", "number.min": "Isbn cant be negative" }),
    title: GenericNotEmptySchema("Book Title"),
    author: Joi.number().min(0).messages({ "number.base": "Fil with the author name" }),
    price: Joi.number().min(0).messages({ "number.base": "Price must be a number", "number.min": "Price cant be negative" }),
});