import Joi, { TopLevelDomainOptions } from "joi";

export const QuantitySchema = () => Joi.number().integer().min(1).required().messages({
    'any.required': "Quantity required",
    'number.base': "Quantity must be a number",
    'number.integer': "Quantity must be a whole number",
    'number.min': "Quantity must be greater than or equal to 1",

});

export const GenericNotEmptySchema = (fieldName: string) => {
    var requiredMessage = `Field ${fieldName} required`;
    var emptyMessage = `Field ${fieldName} must not be empty`;


    return Joi.string().empty().required().messages({
        'any.required': requiredMessage,
        'string.base': requiredMessage,
        'string.empty': emptyMessage,
    })
}

export const EmailSchema = (checkTLD: false | TopLevelDomainOptions | undefined) => Joi.string().empty().required().email({ tlds: checkTLD }).messages({
    "any.required": "Fill email",
    "string.base": "Email required",
    "string.empty": "Email can't be empty",
    "string.email": "Email should be valid",

})

export const HiddenFieldGenericNotEmptySchema = () => {
    var requiredMessage = `Missing required field`;
    var emptyMessage = `Missing required field`;

    return Joi.string().empty().required().messages({
        'any.required': requiredMessage,
        'string.base': requiredMessage,
        'string.empty': emptyMessage,
    })
}