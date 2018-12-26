import { Pipe, PipeTransform } from '@angular/core';

@Pipe(
    {
        name: 'numberToArray'
    })
export class NumberToArrayPipe implements PipeTransform
{
    public transform(value: number): number[]
    {
        const result = new Array<number>(value <= 0 ? 0 : value);
        for (let index = 0; index < value; index++)
        {
            result[index] = index;
        }

        return result;
    }
}