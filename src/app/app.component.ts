import { Component, OnInit } from '@angular/core';
import { RepositoryService } from './repository.service';
import { Observable } from 'rxjs';
import { map, tap, flatMap } from 'rxjs/operators';
import { Repository } from './Models/Repository';
import { ReactionService } from './reaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private repositoryService: RepositoryService,
              private reactionService: ReactionService) { }

  title = 'EmpregosDevHiringClient';

  displayedColumns: string[] = ['position', 'name', 'stars', 'owner', `actions`];
  dataSourceAsync: Observable<any>;
  dataSource: any[];

  resultSuccessful: Observable<boolean>;

  private toListEntry(v: Repository, i: number) {
    return {
      position: i + 1,
      name: v.name,
      stars: v.stargazersCount,
      owner: v.owner.login
    };
  }

  LoadReactions(repositories: { position: number; name: string; stars: number; owner: string; }[]) {
    return this.reactionService
      .fetch()
      .pipe(map(data =>
        repositories.map((r: { [x: string]: any; }) => {
          const foundReaction = data
            ? data.find(reaction => reaction.repository === r[`name`])
            : null;
          r[`reaction`] = foundReaction ? foundReaction.reaction : null;
          return r;
        })
      ));
  }

  EditReaction(repositoryName: string, newReaction: string, currentReaction: string) {
    if (!currentReaction || currentReaction !== newReaction) {
      this.AddReaction(repositoryName, newReaction);
    } else {
      this.RemoveReaction(repositoryName);
    }
  }

  AddReaction(repositoryName: string, reaction: string) {
    this.reactionService
      .remove(repositoryName)
      .pipe(flatMap(_ =>
        this.reactionService.add(repositoryName, reaction)
      )).subscribe(_ => this.dataSourceAsync = this.LoadReactions(this.dataSource));
  }

  RemoveReaction(repositoryName: string) {
    this.reactionService.remove(repositoryName).subscribe(_ => this.dataSourceAsync = this.LoadReactions(this.dataSource));
  }

  ngOnInit(): void {
    this.repositoryService
      .getRepositories()
      .pipe(map(response => response.content
        .items
        .map(this.toListEntry)))
      .pipe(tap(data => {
        this.dataSource = data;
      })).subscribe(() => this.dataSourceAsync = this.LoadReactions(this.dataSource));

  }

}
