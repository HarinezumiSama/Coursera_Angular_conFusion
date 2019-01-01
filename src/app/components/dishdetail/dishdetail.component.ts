import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';

@Component(
    {
        selector: 'app-dishdetail',
        templateUrl: './dishdetail.component.html',
        styleUrls: ['./dishdetail.component.scss']
    })
export class DishDetailComponent implements OnInit
{
    private static readonly minAuthorLength = 2;

    private static readonly minStarCount = 1;
    private static readonly maxStarCount = 5;
    private static readonly defaultStarCount = DishDetailComponent.maxStarCount;

    public dish: Dish;
    public dishIds: string[];
    public previous: string;
    public next: string;
    public commentForm: FormGroup;

    public errorMessage: string;

    private readonly formErrors =
    {
        'author': '',
        'comment': ''
    };

    private readonly validationMessages =
    {
        'author':
        {
            'required': 'Name is required.',
            'minlength': `Name must be at least ${DishDetailComponent.minAuthorLength} characters long.`
        },
        'comment':
        {
            'required': 'Comment text cannot be empty.'
        },
    };

    private previewedComment: Comment;

    constructor(
        private readonly dishService: DishService,
        private readonly route: ActivatedRoute,
        private readonly location: Location,
        private readonly formBuilder: FormBuilder)
    {
        this.commentForm = this.createCommentForm();
    }

    public ngOnInit()
    {
        this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

        this.route.paramMap
            .pipe(switchMap((params: ParamMap) => this.dishService.getDish(params.get('id'))))
            .subscribe(
                dish =>
                {
                    this.errorMessage = null;
                    this.dish = dish;
                    this.setPreviousAndNext(dish.id);
                },
                error => this.errorMessage = error);
    }

    public goBack(): void
    {
        this.location.back();
    }

    public isPreviewComment(comment: Comment): boolean
    {
        return comment != null && (comment.date == null || comment.date === '');
    }

    public getCommentClass(comment: Comment)
    {
        return { 'comment-preview': this.isPreviewComment(comment) };
    }

    public getCommentsIncludingPreview(): Comment[]
    {
        if (this.dish == null)
        {
            return new Array<Comment>(0);
        }

        const result = Array.from(this.dish.comments);
        if (this.previewedComment != null)
        {
            result.push(this.previewedComment);
        }

        return result;
    }

    public onSubmit()
    {
        if (this.commentForm.invalid)
        {
            return;
        }

        const newComment = this.commentForm.value as Comment;
        newComment.date = new Date().toISOString();
        console.log(newComment);
        this.dish.comments.push(newComment);

        this.previewedComment = null;

        this.commentForm.reset(
            {
                author: '',
                rating: DishDetailComponent.defaultStarCount,
                comment: ''
            });
    }

    private setPreviousAndNext(dishId: string)
    {
        const index = this.dishIds.indexOf(dishId);
        if (index < 0)
        {
            return;
        }

        const length = this.dishIds.length;
        this.previous = this.dishIds[(index - 1 + length) % length];
        this.next = this.dishIds[(index + 1) % length];
    }

    private createCommentForm()
    {
        const commentForm = this.formBuilder.group(
            {
                author: ['', [Validators.required, Validators.minLength(DishDetailComponent.minAuthorLength)]],
                rating: [
                    DishDetailComponent.defaultStarCount,
                    [
                        Validators.min(DishDetailComponent.minStarCount),
                        Validators.max(DishDetailComponent.maxStarCount)
                    ]
                ],
                comment: ['', [Validators.required]]
            });

        commentForm.valueChanges.subscribe(value => this.onValueChanged(value));

        return commentForm;
    }

    private onValueChanged(value?: Comment): void
    {
        if (this.commentForm == null)
        {
            this.previewedComment = null;
            return;
        }

        for (const field in this.formErrors)
        {
            if (!this.formErrors.hasOwnProperty(field))
            {
                continue;
            }

            this.formErrors[field] = '';

            const control = this.commentForm.get(field);
            if (control == null || !control.dirty || !control.invalid)
            {
                continue;
            }

            const messages = this.validationMessages[field];
            for (const key in control.errors)
            {
                if (control.errors.hasOwnProperty(key))
                {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }

        if (this.commentForm.invalid)
        {
            this.previewedComment = null;
            return;
        }

        this.previewedComment = value;
    }
}