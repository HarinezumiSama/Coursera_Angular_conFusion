import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Component(
    {
        selector: 'app-menu',
        templateUrl: './menu.component.html',
        styleUrls: ['./menu.component.scss']
    })
export class MenuComponent implements OnInit
{
    public dishes = DISHES;
    public selectedDish: Dish;

    public ngOnInit()
    {
    }

    public onSelect(dish: Dish)
    {
        this.selectedDish = dish;
    }
}