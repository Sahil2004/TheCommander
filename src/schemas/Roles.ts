import mongoose from "mongoose";

const numberPattern: RegExp = /[0-9]/g;

const validate = (input: string): boolean => {
    return numberPattern.test(input);
};

const message = (props: any, name: string): string => {
    return `${props.value} is not an id passed into ${name}`;
};

const rolesSchema = new mongoose.Schema({
    ServerId: {
        type: String,
        require: true,
        unique: true,
        immutable: true,
        validate: {
            validator: (input: string): boolean => validate(input),
            message: (props: any): string => message(props, "ServerId")
        }
    },
    superUserRole: {
        type: String,
        require: true,
        default: "superuser",
        minLength: 1,
        validate: {
            validator: (input: string): boolean => validate(input),
            message: (props: any): string => message(props, "superUserRole")
        }
    },
    sudoersRole: {
        type: String,
        require: true,
        default: "sudoers",
        minLength: 1,
        validate: {
            validator: (input: string): boolean => validate(input),
            message: (props: any): string => message(props, "sudoersRole")
        }
    },
    mutedRole: {
        type: String,
        require: true,
        default: "muted",
        minLength: 1,
        validate: {
            validator: (input: string): boolean => validate(input),
            message: (props: any): string => message(props, "mutedRole")
        }
    },
    logsChannel: {
        type: String,
        require: true,
        default: "the-commander-logs",
        minLength: 1,
        validate: {
            validator: (input: string): boolean => validate(input),
            message: (props: any): string => message(props, "logsChannel")
        }
    }
});

export interface IRolesModel extends mongoose.Document {
    ServerId: string,
    superUserRole: string,
    sudoersRole: string,
    mutedRole: string,
    logsChannel: string
}

export const Roles = mongoose.model<IRolesModel>("Roles", rolesSchema);