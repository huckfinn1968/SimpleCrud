import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {Movie} from '../interfaces/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: Movie[];

  constructor(
    private moviesService: MoviesService
  ) {
    this.getMovies();
  }

  ngOnInit(): void {
  }

  getMovies() {
    this.moviesService.get().subscribe((data: Movie[]) => {
      this.movies = data;
    }, (error) => {
      console.log(error);
    });
  }

  delete(id) {
    if (confirm('¿Estas Seguro que deseas eliminar esta pelicula?')){
      this.moviesService.delete(id).subscribe( (data) => {
        alert('Eliminación exitosa.');
        console.log(data);
        this.getMovies();
      }, (error) => {
        console.log(error);
      });
    }
  }

}
