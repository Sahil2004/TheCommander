import mongoose from "mongoose";

const numberPattern: RegExp = /[0-9]/g;
const validate = (input: string): boolean => {
    return numberPattern.test(input);
};

const message = (props: any, name: string): string => {
    return `${props.value} is not an id passed into ${name}`;
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
        type: String
    }
});

export interface IWarnModel extends mongoose.Document {
    ServerId: string,
    User: string,
    Reason: string
}

export const Warns = mongoose.model<IWarnModel>("Warns", warnsSchema);