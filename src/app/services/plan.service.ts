import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Plan } from '../shared/plan';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { map } from "rxjs/operators"; 
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class PlanService {

  constructor(private restangular: Restangular,
              private processHTTPMsg: ProcessHTTPMsgService) { }

  getPlans(): Observable<Plan[]> {
    return this.restangular.all('plans').getList();
  }

  getPlan(id: number): Observable<Plan> {
    return  this.restangular.one('plans',id).get();
  }

  getFeaturedPlan(): Observable<Plan> {
    return this.restangular.all('plans').getList({featured: true}).pipe(
      map(plans => plans[0])
    );
  }

  getPlanIds(): Observable<number[]> {
    return this.getPlans().pipe(
      map(plans => {return plans.map(plan => plan.id);} )
      ,catchError(error => {return of(error);})
    );
  }
}