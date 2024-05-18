import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DictionaryWordObject } from 'src/app/models/common.interface';
import { WordSearchService } from 'src/app/services/word-search.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  emptValueError = false;
  constructor(private wordSearchService: WordSearchService) {}

  enterPressAlert(event: KeyboardEvent, element: string) {
    console.log(event);
    this.emptValueError = false;
    this.wordSearchService.reset();
    if (event.key === 'Enter') {
      this.searchFortext(element);
    }
  }

  searchFortext(word: string) {
    word
      ? this.wordSearchService.searchFortext(word)
      : (this.emptValueError = true);
  }
  reset() {}
}
