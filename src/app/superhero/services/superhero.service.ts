import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SUPERHEROES } from "../mock-superheroes";
import { SuperHero } from "./../superhero";
import { SuperHeroPower } from "./../superheropower";

// https://angular.io/tutorial/toh-pt6#search-by-name
@Injectable()
export class SuperHeroService { 

    constructor(private http: HttpClient) { }

    private superHeroesUrl = 'api/superHeroes';
    
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    // getSuperHeroes(): SuperHero[] {
    //     return SUPERHEROES;
    // }
    getSuperHeroes(): Observable<SuperHero[]> {
        return this.http.get<SuperHero[]>(this.superHeroesUrl)
        .pipe(
			tap(_ => this.log(`fetched super heroes`)),
			catchError(this.handleError('getSuperHeroes', []))
		);
    }
    

    // getSuperHero(id: number) {
    //     const url = `${this.superHerosUrl}/${id}`;
    //     let superHeroes = this.getSuperHeroes();
    //     for (let superHero of superHeroes) {
    //         if (id == superHero.id) {
    //             return superHero;
    //         }
    //     }
    //     return null;
    // }

    getSuperHero(id: number): Observable<SuperHero> {
		const url = `${this.superHeroesUrl}/${id}`;

        return this.http.get<SuperHero>(url)
        .pipe(
			tap(_ => this.log(`fetched superhero id=${id}`)),
			catchError(this.handleError<SuperHero>(`getSuperHero id=${id}`))
		);
    }
    
    updateSuperHero(superHero: SuperHero): Observable<SuperHero> {
        return this.http.put(this.superHeroesUrl, superHero, this.httpOptions)
        .pipe(
			tap(_ => this.log(`updated superHero id=${superHero.id}`)),
			catchError(this.handleError<any>('updateSuperHero'))
		);
    }
    
    deleteSuperHero(superHero: SuperHero | number): Observable<SuperHero> {
        const id = typeof superHero === 'number' ? superHero : superHero.id;
        const url = `${this.superHeroesUrl}/${id}`;
        
        return this.http.delete<SuperHero>(url, this.httpOptions)
        .pipe(
            tap(_ => this.log(`deleted superHero id=${id}`)),
            catchError(this.handleError<SuperHero>('deleteHero'))
        );
    }

    searchSuperHeroes(term: string): Observable<SuperHero[]> {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<SuperHero[]>(`${this.superHeroesUrl}/?name=${term}`)
        .pipe(
            tap(x => x.length ?
                this.log(`found heroes matching "${term}"`) :
                this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<SuperHero[]>('searchHeroes', []))
        );
    }


    getSuperHeroPowers(): Array<SuperHeroPower> {
        let powers = new Array<SuperHeroPower>();
        let power = new SuperHeroPower();
        power.id = 1;
        power.name = 'fly';
        powers.push(power);

        power = new SuperHeroPower();
        power.id = 2;
        power.name = 'wall crawling';
        powers.push(power);

        power = new SuperHeroPower();
        power.id = 3;
        power.name = 'breathe underwater';
        powers.push(power);

        return powers;
    }

    private log(msg : string) {
        console.info(msg);
    }

    private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);

			return of(result as T);
		};
	}
}