import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
  
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
  
import { PokemonsService } from './pokemons.service';

import { Pokemon } from './pokemon';
   
@Component({
    selector: 'pokemon-search',
    templateUrl: './search-pokemon.component.html'
})
export class PokemonSearchComponent implements OnInit {
   
    private searchTerms = new Subject<string>();
    pokemons$: Observable<Pokemon[]>;
   
    constructor(
        private pokemonsService: PokemonsService,
        private router: Router) { }
   
    search(term: string): void {
        this.searchTerms.next(term);
    }
   
    ngOnInit(): void {
        this.pokemons$ = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => this.pokemonsService.searchPokemons(term)),
        );
    }
   
    gotoDetail(pokemon: Pokemon): void {
        let link = ['/pokemon', pokemon.id];
        this.router.navigate(link);
    }
}