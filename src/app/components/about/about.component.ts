﻿import { Component, OnInit } from '@angular/core';
import { Leader } from '../../shared/leader';
import { LeaderService } from '../../services/leader.service';

@Component(
    {
        selector: 'app-about',
        templateUrl: './about.component.html',
        styleUrls: ['./about.component.scss']
    })
export class AboutComponent implements OnInit
{
    public leaders: Leader[];

    constructor(private readonly leaderService: LeaderService)
    {
    }

    public ngOnInit()
    {
        this.leaderService.getLeaders().subscribe(value => this.leaders = value);
    }
}