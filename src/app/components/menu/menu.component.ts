import { Component, OnInit } from '@angular/core';
import { Dish } from '../../shared/dish';
import { DishService } from '../../services/dish.service';

@Component(
    {
        selector: 'app-menu',
        templateUrl: './menu.component.html',
        styleUrls: ['./menu.component.scss']
    })
export class MenuComponent implements OnInit
{
    public dishes: Dish[];
    public errorMessage: string;

    constructor(private readonly dishService: DishService)
    {
    }

    public ngOnInit()
    {
        this.dishService.getDishes()
            .subscribe(
                value =>
                {
                    this.errorMessage = null;
                    this.dishes = value;
                },
                error => this.errorMessage = error);
    }
}