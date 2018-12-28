export type ContactType = ('None' | 'Tel' | 'Email');

export const CONTACT_TYPES = ['None', 'Tel', 'Email'];

export class Feedback
{
    public firstName: string;
    public lastName: string;
    public telNum: number;
    public email: string;
    public agree: boolean;
    public contactType: ContactType;
    public message: string;
}