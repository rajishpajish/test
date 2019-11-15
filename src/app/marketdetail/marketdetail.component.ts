import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {switchMap} from 'rxjs/operators';

import { MarketService } from '../services/market.service';

import { Market } from '../shared/market';
import { Comment } from '../shared/comment';

import { visibility, expand } from '../animations/app.animation';

@Component({
  selector: 'app-marketdetail',
  templateUrl: './marketdetail.component.html',
  styleUrls: ['./marketdetail.component.scss'],
  animations: [
    visibility(),
    expand()
  ]
})
export class MarketDetailComponent implements OnInit {

  market: Market;
  marketcopy = null; // Restangular object
  marketIds: number[];
  prev: number;
  next: number;

  errMess: string;

  commentForm: FormGroup;
  comment: Comment;

  visibility = 'shown';

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 1 characters long.'
    }
  };
  
  constructor(private marketservice: MarketService,
    private route: ActivatedRoute,
    private location: Location,
    private fb:FormBuilder,
    @Inject('BaseURL') private BaseURL) {
      this.createForm();
     }

  ngOnInit() {

    this.marketservice.getMarketIds().subscribe(marketIds => this.marketIds = marketIds);
    this.route.params.pipe(
      switchMap((params: Params) => { this.visibility = 'hidden'; return this.marketservice.getMarket(+params['id']); }) // (+) converts string id to a number
      ).subscribe(market => { this.market = market; this.marketcopy = market; this.setPrevNext(market.id); this.visibility = 'shown'; }, 
        errmess => this.errMess = <any>errmess);
    
  }

  setPrevNext(marketId: number) {
    let index = this.marketIds.indexOf(marketId);
    this.prev = this.marketIds[(this.marketIds.length + index - 1)%this.marketIds.length];
    this.next = this.marketIds[(this.marketIds.length + index + 1)%this.marketIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      comment: ['', [Validators.required, Validators.minLength(1)] ],
      rating: 5
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
    this.comment = form.value;
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.marketcopy.comments.push(this.comment);
    this.marketcopy.save()
      .subscribe(market => { this.market = market; console.log(this.market); });
    console.log(this.comment);
    this.comment = null;
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5
    });
  }

}