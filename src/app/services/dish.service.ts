import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessHttpMessageService } from './process-http-message.service';

@Injectable(
    {
        providedIn: 'root'
    })
export class DishService
{
    constructor(
        @Inject('BaseUrl') private readonly baseUrl,
        private readonly http: HttpClient,
        private readonly processHttpMessageService: ProcessHttpMessageService)
    {
    }

    public getDishes(): Observable<Dish[]>
    {
        return this.http
            .get<Dish[]>(`${this.baseUrl}/dishes`)
            .pipe(catchError(this.processHttpMessageService.handleError));
    }

    public getDish(id: string): Observable<Dish>
    {
        return this.http
            .get<Dish>(`${this.baseUrl}/dishes/${id}`)
            .pipe(catchError(this.processHttpMessageService.handleError));
    }

    public getFeaturedDish(): Observable<Dish>
    {
        return this.http
            .get<Dish[]>(`${this.baseUrl}/dishes?featured=true`)
            .pipe(map(dishes => dishes[0]))
            .pipe(catchError(this.processHttpMessageService.handleError));
    }

    public getDishIds(): Observable<string[] | any>
    {
        return this.getDishes()
            .pipe(map(dishes => dishes.map(dish => dish.id)))
            .pipe(catchError(this.processHttpMessageService.handleError));
    }

    public getDishImageUrl(dish: Dish)
    {
        return `${this.baseUrl}/${dish.image}`;
    }
}