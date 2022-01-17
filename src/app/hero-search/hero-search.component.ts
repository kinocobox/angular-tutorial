import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.sass']
})
export class HeroSearchComponent implements OnInit {

  heroes$!: Observable<Hero[]>
  private searchTerms = new Subject<string>()

  constructor(
    private heroService: HeroService
  ) { }

  search(term: string): void {
    this.searchTerms.next(term)
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // 各キーストロークの後、検索前に300ms待機する。
      debounceTime(300),
      // 直前の検索語と同じ場合は、無視する。
      distinctUntilChanged(),
      // 検索語が変わるたびに、新しい検索observableにスイッチする。
      // hero$ は、 ngfor と bind されているObservable のため、Observable を subscribe する必要はない。
      switchMap((term: string) => this.heroService.searchHeroes(term))
    )
  }

}
