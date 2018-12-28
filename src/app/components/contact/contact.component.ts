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
    public feedbackForm: FormGroup;
    public feedback: Feedback;
    public contactTypes = CONTACT_TYPES;

    @ViewChild('fform')
    public feedbackFormDirective;

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
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                telNum: ['', Validators.required],
                email: ['', Validators.required],
                agree: false,
                contactType: 'None',
                message: ''
            });
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
}