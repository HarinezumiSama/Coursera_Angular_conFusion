import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable(
    {
        providedIn: 'root'
    })
export class DishService
{
    constructor(@Inject('BaseUrl') private readonly baseUrl, private readonly http: HttpClient)
    {
    }

    public getDishes(): Observable<Dish[]>
    {
        return this.http.get<Dish[]>(`${this.baseUrl}/dishes`);
    }

    public getDish(id: string): Observable<Dish>
    {
        return this.http.get<Dish>(`${this.baseUrl}/dishes/${id}`);
    }

    public getFeaturedDish(): Observable<Dish>
    {
        return this.http.get<Dish[]>(`${this.baseUrl}/dishes?featured=true`).pipe(map(dishes => dishes[0]));
    }

    public getDishIds(): Observable<string[] | any>
    {
        return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
    }

    public getDishImageUrl(dish: Dish)
    {
        return `${this.baseUrl}/${dish.image}`;
    }
}