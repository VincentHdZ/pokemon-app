import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Pokemon } from './pokemon';

import { PokemonsService } from './pokemons.service';

@Component({
    selector: 'detail-pokemon',
    templateUrl: './detail-pokemon.component.html',
})
export class DetailPokemonComponent implements OnInit {
    pokemon: Pokemon = null;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private pokemonsService: PokemonsService) { }

    ngOnInit(): void {
        this.pokemonsService.getPokemon(+this.route.snapshot.params['id'])
        .subscribe(pokemon => this.pokemon = pokemon);
    }

    delete(pokemon: Pokemon): void {
        this.pokemonsService.deletePokemon(pokemon)
        .subscribe(_ => this.router.navigate(['/pokemons']));
    }

    goBack(): void {
        this.router.navigate(['/pokemons']);
    }
    
    goEdit(pokemon: Pokemon): void {
        const link= ["/pokemon/edit", pokemon.id];
        this.router.navigate(link);
    }
}
