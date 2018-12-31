import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../shared/dish';
import { switchMap } from 'rxjs/operators';

@Component(
    {
        selector: 'app-dishdetail',
        templateUrl: './dishdetail.component.html',
        styleUrls: ['./dishdetail.component.scss']
    })
export class DishdetailComponent implements OnInit
{
    public dish: Dish;
    public dishIds: string[];
    public previous: string;
    public next: string;

    constructor(
        private readonly dishService: DishService,
        private readonly route: ActivatedRoute,
        private readonly location: Location)
    {
    }

    public ngOnInit()
    {
        this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

        this.route.params
            .pipe(switchMap(params => this.dishService.getDish(params['id'])))
            .subscribe(
                dish =>
                {
                    this.dish = dish;
                    this.setPreviousAndNext(dish.id);
                });
    }

    public goBack(): void
    {
        this.location.back();
    }

    public setPreviousAndNext(dishId: string)
    {
        const index = this.dishIds.indexOf(dishId);
        if (index < 0)
        {
            return;
        }

        const length = this.dishIds.length;
        this.previous = this.dishIds[(index - 1 + length) % length];
        this.next = this.dishIds[(index + 1) % length];
    }
}