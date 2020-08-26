import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {MessageService} from './message.service';
import {HotelsResponse} from '../models/hotelsResponse';
import {HotelResponse} from '../models/hotelResponse';
import {RoomsResponse} from '../models/roomsResponse';
import {ServicesResponse} from '../models/servicesResponse';


@Injectable({providedIn: 'root'})
export class HotelsService {

  private hotelsUrl = 'http://localhost:8080/searcher-api/v1/hotels';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  /** GET heroes from the server */
  search(name: string, categories: number[], services: string[]): Observable<HotelsResponse> {
    const url = `${this.hotelsUrl}?`;
    const params = [];
    if (name != null) {
      params.push(`name=${name}`);
    }
    if (categories != null) {
      categories.forEach(function(value) {
        params.push(`category=${value}`);
      });
    }
    if (services != null) {
      services.forEach(function(value) {
        params.push(`service=${value}`);
      });
    }
    return this.http.get<HotelsResponse>(url + params.join('&'))
      .pipe(
        tap(_ => this.log('searching hotels')),
        catchError(this.handleError<HotelsResponse>('search', null))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHotel(id: string): Observable<HotelResponse> {
    const url = `${this.hotelsUrl}/${id}`;
    return this.http.get<HotelResponse>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<HotelResponse>(`getHero id=${id}`))
    );
  }

  /** GET heroes from the server */
  getRooms(hotelId: string): Observable<RoomsResponse> {
    const url = `${this.hotelsUrl}/${hotelId}/rooms`;
    return this.http.get<RoomsResponse>(url)
      .pipe(
        tap(_ => this.log('fetched getRooms')),
        catchError(this.handleError<RoomsResponse>('getRooms', null))
      );
  }

  getServices(hotelId: string): Observable<ServicesResponse> {
    const url = `${this.hotelsUrl}/${hotelId}/services`;
    return this.http.get<ServicesResponse>(url)
      .pipe(
        tap(_ => this.log('fetched getServices')),
        catchError(this.handleError<ServicesResponse>('getServices', null))
      );
  }

  // /** GET hero by id. Return `undefined` when id not found */
  // getHeroNo404<Data>(id: number): Observable<Hotel> {
  //   const url = `${this.hotelsUrl}/?id=${id}`;
  //   return this.http.get<Hotel[]>(url)
  //     .pipe(
  //       map(heroes => heroes[0]), // returns a {0|1} element array
  //       tap(h => {
  //         const outcome = h ? `fetched` : `did not find`;
  //         this.log(`${outcome} hero id=${id}`);
  //       }),
  //       catchError(this.handleError<Hero>(`getHero id=${id}`))
  //     );
  // }
  //
  //
  // /* GET heroes whose name contains search term */
  // searchHeroes(term: string): Observable<Hero[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.http.get<Hero[]>(`${this.hotelsUrl}/?name=${term}`).pipe(
  //     tap(x => x.length ?
  //        this.log(`found heroes matching "${term}"`) :
  //        this.log(`no heroes matching "${term}"`)),
  //     catchError(this.handleError<Hero[]>('searchHeroes', []))
  //   );
  // }
  //
  // //////// Save methods //////////
  //
  // /** POST: add a new hero to the server */
  // addHero(hero: Hero): Observable<Hero> {
  //   return this.http.post<Hero>(this.hotelsUrl, hero, this.httpOptions).pipe(
  //     tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
  //     catchError(this.handleError<Hero>('addHero'))
  //   );
  // }
  //
  // /** DELETE: delete the hero from the server */
  // deleteHero(hero: Hero | number): Observable<Hero> {
  //   const id = typeof hero === 'number' ? hero : hero.id;
  //   const url = `${this.hotelsUrl}/${id}`;
  //
  //   return this.http.delete<Hero>(url, this.httpOptions).pipe(
  //     tap(_ => this.log(`deleted hero id=${id}`)),
  //     catchError(this.handleError<Hero>('deleteHero'))
  //   );
  // }
  //
  // /** PUT: update the hero on the server */
  // updateHero(hero: Hero): Observable<any> {
  //   return this.http.put(this.hotelsUrl, hero, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${hero.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }
  //
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
