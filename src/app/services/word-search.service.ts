import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DictionaryWordObject,
  MeaningObject,
} from '../models/common.interface';
import { Subject, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordSearchService {
  _wordResponse: Subject<DictionaryWordObject | undefined> = new Subject<
    DictionaryWordObject | undefined
  >();

  errorData: { [key: string]: string } | undefined;

  constructor(private http: HttpClient) {}

  get wordResponse() {
    return this._wordResponse.asObservable();
  }

  searchFortext(word: string) {
    this.errorData = undefined;
    this.http
      .get<DictionaryWordObject[]>(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      )
      .pipe(
        map((data) => {
          const newResultMap = new Map<string, MeaningObject>();
          const wordResult = data[0];
          wordResult.meanings.forEach((meaning) => {
            const partOfSpeech = meaning.partOfSpeech;
            if (newResultMap.has(partOfSpeech)) {
              newResultMap
                .get(partOfSpeech)!
                .definitions.push(...meaning.definitions);
              newResultMap
                .get(partOfSpeech)!
                .synonyms.push(...meaning.synonyms);
            } else {
              newResultMap.set(partOfSpeech, { ...meaning });
            }
          });
          wordResult.meanings = Array.from(newResultMap.values());
          return wordResult;
        })
      )
      .subscribe({
        next: (response) => this._wordResponse.next(response),
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.errorData = error.error;
        },
      });
  }

  reset() {
    this.errorData = undefined;
    this._wordResponse.next(undefined);
  }
}
