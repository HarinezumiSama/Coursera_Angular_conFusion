import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, CONTACT_TYPES } from '../../shared/feedback';

@Component(
    {
        selector: 'app-contact',
        templateUrl: './contact.component.html',
        styleUrls: ['./contact.component.scss']
    })
export class ContactComponent implements OnInit
{
    private static readonly minNameLength = 2;
    private static readonly maxNameLength = 40;

    public feedbackForm: FormGroup;
    public feedback: Feedback;
    public contactTypes = CONTACT_TYPES;

    @ViewChild('fform')
    public feedbackFormDirective;

    private readonly formErrors =
    {
        'firstName': '',
        'lastName': '',
        'telNum': '',
        'email': ''
    };

    private readonly validationMessages =
    {
        'firstName':
        {
            'required': 'First Name is required.',
            'minlength': `First Name must be at least ${ContactComponent.minNameLength} characters long.`,
            'maxlength': `First Name cannot be more than ${ContactComponent.maxNameLength} characters long.`
        },
        'lastName':
        {
            'required': 'Last Name is required.',
            'minlength': `Last Name must be at least ${ContactComponent.minNameLength} characters long.`,
            'maxlength': `Last Name cannot be more than ${ContactComponent.maxNameLength} characters long.`
        },
        'telNum':
        {
            'required': 'Telephone number is required.',
            'pattern': 'Telephone number may only contain digits.'
        },
        'email':
        {
            'required': 'Email is required.',
            'email': 'Email format is invalid.'
        },
    };

    constructor(private readonly formBuilder: FormBuilder)
    {
        this.createForm();
    }

    public ngOnInit()
    {
    }

    public createForm()
    {
        this.feedbackForm = this.formBuilder.group(
            {
                firstName: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(ContactComponent.minNameLength),
                        Validators.maxLength(ContactComponent.maxNameLength)
                    ]
                ],
                lastName: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(ContactComponent.minNameLength),
                        Validators.maxLength(ContactComponent.maxNameLength)
                    ]
                ],
                telNum: ['', [Validators.required, Validators.pattern('[0-9]*')]],
                email: ['', [Validators.required, Validators.email]],
                agree: false,
                contactType: 'None',
                message: ''
            });

        this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // Reset form validation messages
    }

    public onSubmit()
    {
        this.feedback = this.feedbackForm.value;
        console.log(this.feedback);

        this.feedbackForm.reset(
            {
                firstName: '',
                lastName: '',
                telNum: '',
                email: '',
                agree: false,
                contactType: 'None',
                message: ''
            });

        this.feedbackFormDirective.resetForm();
    }

    private onValueChanged(data?: any): void
    {
        if (this.feedbackForm == null)
        {
            return;
        }

        for (const field in this.formErrors)
        {
            if (!this.formErrors.hasOwnProperty(field))
            {
                continue;
            }

            this.formErrors[field] = '';

            const control = this.feedbackForm.get(field);
            if (control == null || !control.dirty || !control.invalid)
            {
                continue;
            }

            const messages = this.validationMessages[field];
            for (const key in control.errors)
            {
                if (control.errors.hasOwnProperty(key))
                {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
}