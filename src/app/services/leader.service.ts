import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable(
    {
        providedIn: 'root'
    })
export class LeaderService
{
    public getLeaders(): Observable<Leader[]>
    {
        return of(LEADERS).pipe(delay(200));
    }

    public getFeaturedLeader(): Observable<Leader>
    {
        return of(LEADERS.filter(leader => leader.featured)[0]).pipe(delay(200));
    }
}