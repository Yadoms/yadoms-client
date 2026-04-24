import { KeywordEntity } from '../slices/keywords.slice';

export interface Paging {
  currentPage: number;
  totalPage: number;
  pageSize: number;
}
export interface KeywordsResponse {
  keywords: KeywordEntity[];
  paging: Paging;
}

export interface Acquisition {
  value: unknown;
  date: string; //TODO existe-t-il un format de date plus adapté ? (ex: timestamp)
}

export interface keywordAcquisitions {
  keywordId: number;
  acquisitions: Acquisition[];
}

export interface AcquisitionsResponse {
  acquisitions: keywordAcquisitions[];
}
