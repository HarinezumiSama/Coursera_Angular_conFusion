import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactTypes } from '../../shared/feedback';

@Component(
    {
        selector: 'app-contact',
        templateUrl: './contact.component.html',
        styleUrls: ['./contact.component.scss']
    })
export class ContactComponent implements OnInit
{
    public feedbackForm: FormGroup;
    public feedback: Feedback;
    public contactTypes = ContactTypes;

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
                firstName: '',
                lastName: '',
                telNum: 0,
                email: '',
                agree: false,
                contactType: 'None',
                message: ''
            });
    }

    public onSubmit()
    {
        this.feedback = this.feedbackForm.value;
        console.log(this.feedback);
        this.feedbackForm.reset();
    }
}