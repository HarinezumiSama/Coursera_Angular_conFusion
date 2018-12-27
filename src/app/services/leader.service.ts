import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable(
    {
        providedIn: 'root'
    })
export class LeaderService
{
    public getLeaders(): Leader[]
    {
        return LEADERS;
    }

    public getFeaturedLeader(): Leader
    {
        return this.getLeaders().filter(leader => leader.featured)[0];
    }
}