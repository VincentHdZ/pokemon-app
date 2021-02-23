import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Pokemon } from './pokemon';

@Injectable()
export class PokemonsService {
    private pokemonUrl = 'api/pokemons';

    constructor(private http: HttpClient) { }

    getPokemons(): Observable<Pokemon[]> {
        return this.http.get<Pokemon[]>(this.pokemonUrl).pipe(
            tap(_ => this.log(`getPokemons`)),
            catchError(this.handleError(`getPokemons`, []))
        );
    }

    getPokemon(id: number): Observable<Pokemon> {
        const url = `${this.pokemonUrl}/${id}`;
        return this.http.get<Pokemon>(url).pipe(
            tap(_ => this.log(`getPokemons ${id}`)),
            catchError(this.handleError<Pokemon>(`getPokemon`))
        );
    }

    getPokemonTypes(): string[] {
        return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
            'Poison', 'Fée', 'Vol'];
    }

    deletePokemon(pokemon: Pokemon): Observable<Pokemon> {
        const url = `${this.pokemonUrl}/${pokemon.id}`;
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-type': 'application/json' })
        };

        return this.http.delete<Pokemon>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted pokemon ${pokemon.id}`)),
            catchError(this.handleError<Pokemon>(`deletePokemon`))
        );
    }

    updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http.put(this.pokemonUrl, pokemon, httpOptions).pipe(
            tap(_ => this.log(`updated pokemon ${pokemon.id}`)),
            catchError(this.handleError<any>(`updatePokemon`))
        );
    }

    searchPokemons(term: string): Observable<Pokemon[]> {
        if (!term.trim()) {
            return of([]);
        }
        return this.http.get<Pokemon[]>(`${this.pokemonUrl}/?name=${term}`).pipe(
            tap(_ => this.log("searchPokemon")),
            catchError(this.handleError<Pokemon[]>("error", []))
        );
    }

    private log(log: string): void {
        console.info(log);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(error);
            console.log(`${operation} failed ${error.message}`);
            return of(result as T)
        }
    }
}