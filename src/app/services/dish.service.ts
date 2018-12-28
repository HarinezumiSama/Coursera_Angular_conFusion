import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable(
    {
        providedIn: 'root'
    })
export class DishService
{
    public getDishes(): Promise<Dish[]>
    {
        return new Promise(
            resolve =>
            {
                // Simulate server latency with 2 second delay
                setTimeout(() => resolve(DISHES), 2000);
            });
    }

    public getDish(id: string): Promise<Dish>
    {
        return this.getDishes().then(value => value.filter(dish => dish.id === id)[0]);
    }

    public getFeaturedDish(): Promise<Dish>
    {
        return this.getDishes().then(value => value.filter(dish => dish.featured)[0]);
    }
}