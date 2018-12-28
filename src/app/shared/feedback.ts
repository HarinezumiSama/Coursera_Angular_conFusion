export class Feedback
{
    public firstName: string;
    public lastName: string;
    public telNum: number;
    public email: string;
    public agree: boolean;
    public contactType: string;
    public message: string;
}

export const ContactTypes = ['None', 'Tel', 'Email'];