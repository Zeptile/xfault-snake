import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { XfaultSnakeComponent } from './xfault-snake/xfault-snake.component';

@NgModule({
  declarations: [
    AppComponent,
    XfaultSnakeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
