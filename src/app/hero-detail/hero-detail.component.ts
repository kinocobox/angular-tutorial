import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { HeroService } from '../hero.service'
import { Hero } from '../hero'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.sass']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero

  constructor(
    private route: ActivatedRoute, // このインスタンスへのルートを示す。
    private heroService: HeroService,  // Service
    private location: Location // ブラウザと対話するためのangular serivce
  ) { }

  ngOnInit(): void {
    this.getHero()
  }

  getHero(): void {
    // snapshot は、コンポーネントが作成された直後のルート情報の静的イメージ
    // route param は常に string.
    //
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.heroService.getHero(id).subscribe(hero => this.hero = hero)
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack())
    }
  }

  goBack(): void {
    this.location.back()
  }
}
