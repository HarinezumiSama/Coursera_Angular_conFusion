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
        return new Promise(
            resolve =>
            {
                // Simulate server latency with 2 second delay
                setTimeout(() => resolve(LEADERS), 2000);
            });
    }

    public getFeaturedLeader(): Promise<Leader>
    {
        return this.getLeaders().then(value => value.filter(leader => leader.featured)[0]);
    }
}