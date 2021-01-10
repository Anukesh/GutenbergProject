import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {
  genres: string[];

  constructor(
    private router : Router
  ) {
    this.genres = ['fiction','drama','history','humour','philosophy','adventure','politics']

   }

  ngOnInit(): void {
  }
  
  private redirectToBooks(genre){
    console.log(genre);
    this.router.navigate(['home/book-list']);
  }
}
