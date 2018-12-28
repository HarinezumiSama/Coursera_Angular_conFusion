import { Component, OnInit } from '@angular/core';
import { Dish } from '../../shared/dish';
import { DishService } from '../../services/dish.service';
import { Promotion } from '../../shared/promotion';
import { Leader } from '../../shared/leader';
import { PromotionService } from '../../services/promotion.service';
import { LeaderService } from '../../services/leader.service';

@Component(
    {
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss']
    })
export class HomeComponent implements OnInit
{
    public dish: Dish;
    public promotion: Promotion;
    public leader: Leader;

    constructor(
        private readonly dishService: DishService,
        private readonly promotionService: PromotionService,
        private readonly leaderService: LeaderService)
    {
    }

    public ngOnInit()
    {
        this.dishService.getFeaturedDish().then(value => this.dish = value);
        this.promotionService.getFeaturedPromotion().then(value => this.promotion = value);
        this.leaderService.getFeaturedLeader().then(value => this.leader = value);
    }
}