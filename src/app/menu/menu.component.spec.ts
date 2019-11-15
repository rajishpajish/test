import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatGridListModule, MatProgressSpinnerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Market } from '../shared/market';
import { MarketService } from '../services/market.service';
import { MARKETS } from '../shared/markets';
import { baseURL } from '../shared/baseurl';
import { Observable } from 'rxjs';
import { of } from 'rxjs'

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {

    let marketServiceStub = {
      getMarkets: function(): Observable<Market[]> {
        return of(MARKETS);
      }
    };

    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule,
        MatGridListModule, MatProgressSpinnerModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([{ path: 'menu', component: MenuComponent }])
      ],
      declarations: [ MenuComponent ],
      providers: [
        { provide: MarketService, useValue: marketServiceStub },
        { provide: 'BaseURL', useValue: baseURL },
      ]
    })
    .compileComponents();

    let marketservice = TestBed.get(MarketService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('markets items should be 4', () => {
    expect(component.markets.length).toBe(4);
    expect(component.markets[1].name).toBe('plan2');
    expect(component.markets[3].featured).toBeFalsy();
  });

  it('should use markets in the template', () => {
    fixture.detectChanges();

    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
    
    expect(el.textContent).toContain(MARKETS[0].name.toUpperCase());

  });

});
