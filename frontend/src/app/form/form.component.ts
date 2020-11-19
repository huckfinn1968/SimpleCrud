import { Component, OnInit } from '@angular/core';
import {Movie} from '../interfaces/movie';
import {MoviesService} from '../services/movies.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  movie: Movie = {
    name: null,
    year: null,
    description: null,
    duration: null,
    genre: null
  };
  id: any;
  editing: boolean = false;
  movies: Movie[];

  constructor(
    private moviesServices: MoviesService,
    private activateRoute: ActivatedRoute
  ) {
    this.id = this.activateRoute.snapshot.params.id;
    if (this.id){
      this.editing = true;
      this.moviesServices.get().subscribe( (data: Movie[]) => {
        console.log(this.id);
        this.movies = data;
        this.movie = this.movies.find( (m) => { return m.id == this.id});
        console.log(this.movie);
      }, (error) => {
        console.log(error);
      });
    }
    else {
      this.editing = false;
    }
  }

  ngOnInit(): void {
  }

  saveMovie() {
    if(this.editing){
      this.moviesServices.put(this.movie).subscribe((data) => {
        alert('Pelicula actualizada');
        console.log(data);
      }, (error) => {
        console.log('Ocurrio un error');
      });
    }else{
      this.moviesServices.save(this.movie).subscribe((data) => {
        alert('Pelicula almacenada');
        console.log(data);
      }, (error) => {
        console.log('Ocurrio un error');
      });
    }
  }

}
