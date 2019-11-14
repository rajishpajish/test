import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';

import { Observable } from 'rxjs';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { map } from "rxjs/operators"; 
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular) { }

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable<Leader> {
    return  this.restangular.one('leaders',id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({featured: true})
      .map(leaders => leaders[0]);
  }
}
