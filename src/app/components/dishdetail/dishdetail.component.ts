import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../shared/dish';

@Component(
    {
        selector: 'app-dishdetail',
        templateUrl: './dishdetail.component.html',
        styleUrls: ['./dishdetail.component.scss']
    })
export class DishdetailComponent implements OnInit
{
    public dish: Dish;

    constructor(
        private readonly dishService: DishService,
        private readonly route: ActivatedRoute,
        private readonly location: Location)
    {
    }

    public ngOnInit()
    {
        const id = this.route.snapshot.params['id'];
        this.dishService.getDish(id).subscribe(value => this.dish = value);
    }

    public goBack(): void
    {
        this.location.back();
    }
}