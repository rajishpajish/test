import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';

import { Observable } from 'rxjs';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { map } from "rxjs/operators"; 
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular) { }

  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    return  this.restangular.one('promotions',id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({featured: true})
      .map(promotions => promotions[0]);
  }
}