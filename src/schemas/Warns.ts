import mongoose from "mongoose";

const numberPattern: RegExp = /[0-9]/g;
const stringPattern: RegExp = /[a-zA-Z0-9.-]/g;
const validate = (input: string): boolean => {
    return numberPattern.test(input);
};

const message = (props: any, name: string): string => {
    return `${props.value} is not an id passed into ${name}`;
};

const validateReason = (input: string): boolean => {
    return stringPattern.test(input);
};

const warnsSchema = new mongoose.Schema({
    ServerId: {
        type: String,
        require: true,
        validate: {
            validator: (input: string): boolean => validate(input),
            message: (props: any): string => message(props, "ServerId")
        }
    },
    User: {
        type: String,
        require: true,
        validate: {
            validator: (input: string): boolean => validate(input),
            message: (props: any): string => message(props, "User")
        }
    },
    Reason: {
        type: String,
        validate: {
            validator: (input: string): boolean => validateReason(input),
            message: (props: any): string => `${props.value} is not a valid string passed into Reason.`
        }
    }
});

export interface IWarnModel extends mongoose.Document {
    ServerId: string,
    User: string,
    Reason: string
}

export const Warns = mongoose.model<IWarnModel>("Warns", warnsSchema);