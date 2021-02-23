import { Component, OnInit } from '@angular/core';
import { Pokemon } from './pokemon';
import { Router } from '@angular/router';

import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';

import { PokemonsService } from './pokemons.service';

@Component({
  selector: 'list-pokemon',
  templateUrl: './list-pokemon.component.html',
})
export class ListPokemonComponent implements OnInit {
  title = 'pokemon-app';
  pokemons: Pokemon[];
  color = '#ff9098';
  defaultColor = '#ff9098';
  pokemonTypeColor: PokemonTypeColorPipe;

  constructor(private router: Router, private pokemonsService: PokemonsService) { }

  ngOnInit() {
    this.pokemonsService.getPokemons()
      .subscribe(pokemons => this.pokemons = pokemons);
  }

  selectPokemon(selectedPokemon: Pokemon) {
    const link = ['/pokemon', selectedPokemon.id];
    this.router.navigate(link);
  }
}
