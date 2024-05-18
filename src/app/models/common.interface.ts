export interface LicenseObject {
  name: string;
  url: string;
}

export interface PhoneticObject {
  text: string;
  audio: string;
  sourceUrl: string;
  license: LicenseObject;
}

export interface DefinitionObject {
  definition: string;
  example: string;
}

export interface MeaningObject {
  partOfSpeech: string;
  synonyms: string[];
  definitions: DefinitionObject[];
}

export interface DictionaryWordObject {
  license: LicenseObject;
  meanings: MeaningObject[];
  phonetic: string;
  phonetics: PhoneticObject[];
  sourceUrls: string[];
  word: string;
}
