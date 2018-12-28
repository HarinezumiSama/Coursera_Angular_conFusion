import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable(
    {
        providedIn: 'root'
    })
export class PromotionService
{
    public getPromotions(): Promise<Promotion[]>
    {
        return new Promise(
            resolve =>
            {
                // Simulate server latency with 2 second delay
                setTimeout(() => resolve(PROMOTIONS), 2000);
            });
    }

    public getPromotion(id: string): Promise<Promotion>
    {
        return this.getPromotions().then(value => value.filter(promotion => promotion.id === id)[0]);
    }

    public getFeaturedPromotion(): Promise<Promotion>
    {
        return this.getPromotions().then(value => value.filter(promotion => promotion.featured)[0]);
    }
}