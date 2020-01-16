import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { tap, map, concatMap, switchMap, mergeMap, flatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  constructor(private storage: StorageMap) { }

  add(repository: string, reaction: string) {
    return this.storage.get<[{repository: string, reaction: string}]>('reactions')
                .pipe(flatMap(data => {
                  const castedData = data
                                     ? data as [{repository: string, reaction: string}]
                                     : [];
                  castedData.push({repository, reaction});
                  return this.storage.set('reactions', castedData);
                }));
  }

  remove(repositoryName: string) {
    return this.storage.get<[{repository: string, reaction: string}]>('reactions')
                .pipe(flatMap(data => {
                  const castedData = data
                                     ? data as [{repository: string, reaction: string}]
                                     : [];
                  const filteredData = castedData.filter(d => d.repository !== repositoryName);
                  return this.storage.set('reactions', filteredData);
                }));
  }

  fetch() {
    return this.storage.get<[{repository: string, reaction: string}]>('reactions')
               .pipe(map(data => data as [{repository: string, reaction: string}]));
  }
}
