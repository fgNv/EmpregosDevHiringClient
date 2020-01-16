import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';

import { HttpClientModule } from '@angular/common/http';
import { RepositoryService } from './repository.service';
import { ReactionService } from './reaction.service';
import { StorageModule } from '@ngx-pwa/local-storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatTableModule,
    HttpClientModule,
    StorageModule.forRoot({ IDBNoWrap: true })
  ],
  providers: [RepositoryService, ReactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
