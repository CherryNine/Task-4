export declare class LoginForm {
    email: string;
    password: string;
    static from(form?: LoginForm): LoginForm;
    static validate(form: LoginForm): Promise<false | import("class-validator").ValidationError[]>;
}
