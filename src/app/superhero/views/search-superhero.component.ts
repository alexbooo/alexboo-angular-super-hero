import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SuperHeroService } from '../services/superhero.service';
import { SuperHero } from '../superhero';

@Component({
    selector: 'search-superhero',
    templateUrl: './search-superhero.component.html'
})
export class SearchSuperHeroComponent implements OnInit {
    private searchTerms = new Subject<string>();
    superHeroes$: Observable<SuperHero[]>;

    constructor(private superHeroService: SuperHeroService) { }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.superHeroes$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),
      
            // ignore new term if same as previous term
            distinctUntilChanged(),
      
            // switch to new search observable each time the term changes
            switchMap((term: string) => this.superHeroService.searchSuperHeroes(term)),
          );
    }

}