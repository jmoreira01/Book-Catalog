import Joi, { TopLevelDomainOptions } from "joi";

export const QuantitySchema = () => Joi.number().integer().min(1).required().messages({
    'any.required': "Quantidade é obrigatória",
    'number.base': "Quantidade deve ser um número",
    'number.integer': "Quantidade deve ser um inteiro",
    'number.min': "Quantidade deve ser no mínimo 1",
});

export const GenericNotEmptySchema = (fieldName: string) => {
    var requiredMessage = `Campo ${fieldName} é obrigatório`;
    var emptyMessage = `Campo ${fieldName} deve estar preenchido`;

    return Joi.string().empty().required().messages({
        'any.required': requiredMessage,
        'string.base': requiredMessage,
        'string.empty': emptyMessage,
    })
}

export const EmailSchema = (checkTLD: false | TopLevelDomainOptions | undefined) => Joi.string().empty().required().email({ tlds: checkTLD }).messages({
    "any.required": "Email deve estar preenchido",
    "string.base": "Email é obrigatório",
    "string.empty": "Email não pode estar vazio",
    "string.email": "Email deve ser válido"
})

export const HiddenFieldGenericNotEmptySchema = () => {
    var requiredMessage = `Campo em falta`;
    var emptyMessage = `Campo em falta`;

    return Joi.string().empty().required().messages({
        'any.required': requiredMessage,
        'string.base': requiredMessage,
        'string.empty': emptyMessage,
    })
}