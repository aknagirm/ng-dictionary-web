import { Component, OnInit } from '@angular/core';
import { DictionaryWordObject } from 'src/app/models/common.interface';
import { WordSearchService } from 'src/app/services/word-search.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  audioAvailable = false;
  audioLink: string | undefined;
  wordResponse: DictionaryWordObject | undefined;
  errorMessage: { [key: string]: string } | undefined;
  searchInProgress = false;

  constructor(private wordSearchService: WordSearchService) {}

  ngOnInit(): void {
    this.wordSearchService.searchInProgress.subscribe(
      (searchInProgress) => (this.searchInProgress = searchInProgress)
    );
    this.wordSearchService.wordResponse.subscribe({
      next: (data) => {
        this.wordResponse = data;
        this.wordResponse?.phonetics.forEach((element) => {
          if (element.audio) {
            this.audioAvailable = true;
            this.audioLink = element.audio;
            return;
          }
        });
      },
      error: (error) => {
        this.errorMessage = error;
        console.log(error);
      },
    });
  }

  get erroData() {
    return this.wordSearchService.errorData;
  }

  playAudio() {
    const audio = new Audio();
    audio.src = this.audioLink!;
    audio.play().catch((error) => console.error('Error playing audio:', error));
  }
}
