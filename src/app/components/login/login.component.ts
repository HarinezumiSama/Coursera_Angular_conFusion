import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component(
    {
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
export class LoginComponent implements OnInit
{
    public user = { userName: '', password: '', remember: false };

    constructor(private readonly dialogRef: MatDialogRef<LoginComponent>)
    {
    }

    public ngOnInit()
    {
    }

    public onSubmit()
    {
        console.log('User:', this.user);
        this.dialogRef.close();
    }
}