import { Utilities } from "../helpers/Utilities";

export class Parameter {
    name: string;
    value: string | null;
    private defaultValue: string | null = null;

    constructor(name: string, value: any) {
        this.name = name;

        this.value = this.LoadValue(value);
    }

    //Load value
    private LoadValue(value: any): string | null {

        //Value validation
        var newValue = Utilities.IfIsUndefinedOrNullThen(value, this.defaultValue);

        // Default if no characters found in the string
       
        if (typeof newValue == 'string' && newValue.trim().length <= 0) return this.defaultValue;

        if (typeof newValue == "number") return newValue.toString();

        //on the contrary we send the value as is
        return newValue;
    }
}