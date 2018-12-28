import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable(
    {
        providedIn: 'root'
    })
export class LeaderService
{
    public getLeaders(): Promise<Leader[]>
    {
        return Promise.resolve(LEADERS);
    }

    public getFeaturedLeader(): Promise<Leader>
    {
        return this.getLeaders().then(value => value.filter(leader => leader.featured)[0]);
    }
}