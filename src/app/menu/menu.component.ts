import { Component, OnInit, Inject } from '@angular/core';
import { Market } from '../shared/market';
import { MarketService } from '../services/market.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {

  markets: Market[];
  errMess: string;

  constructor(private marketService: MarketService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.marketService.getMarkets()
    .subscribe(markets => this.markets = markets,
      errmess => this.errMess = <any>errmess);
  }

}
