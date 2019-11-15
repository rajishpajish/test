import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Market } from '../shared/market';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { map } from "rxjs/operators"; 
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MarketService {

  constructor(private restangular: Restangular,
              private processHTTPMsg: ProcessHTTPMsgService) { }

  getMarkets(): Observable<Market[]> {
    return this.restangular.all('markets').getList();
  }

  getMarket(id: number): Observable<Market> {
    return  this.restangular.one('markets',id).get();
  }

  getFeaturedMarket(): Observable<Market> {
    return this.restangular.all('markets').getList({featured: true}).pipe(
      map(markets => markets[0])
    );
  }

  getMarketIds(): Observable<number[]> {
    return this.getMarkets().pipe(
      map(markets => {return markets.map(market => market.id);} )
      ,catchError(error => {return of(error);})
    );
  }
}