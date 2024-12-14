export declare class CreateUserForm {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    static from(form?: CreateUserForm): CreateUserForm;
    static validate(form: CreateUserForm): Promise<false | import("class-validator").ValidationError[]>;
}
