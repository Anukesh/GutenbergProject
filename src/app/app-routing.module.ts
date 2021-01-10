import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { GenreListComponent } from './genre-list/genre-list.component';

const routes: Routes = [
  {path:'home', component: GenreListComponent},
  {path:'home/book-list/:genre', component:BookListComponent},
  {path:'', redirectTo:'home' , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
