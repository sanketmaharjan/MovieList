//Movie Class: Represents a Movie

class Movie{
    constructor(title, genre, rating){
        this.title = title;
        this.genre = genre;
        this.rating = rating;
    }
}

//UI Class: handle UI Tasks

class UI{
    static displayMovies(){
        const StoredMovies = [
                {
                title: 'Superman',
                genre: 'Action',
                rating: '4'
            },
            {
                title: 'Batman',
                genre: 'Action',
                rating: '4.5'
            }
        ];

        const movies = StoredMovies;
        movies.forEach((movie) => UI.addMovieToList(movie));
  
    }

    static addMovieToList(movie){

        const list = document.querySelector('#movie-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${movie.title}</td>
        <td>${movie.genre}</td>
        <td>${movie.rating}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

        list.appendChild(row);
    }
}


//Store Class: Handles Storage

//Event: Display Movie

document.addEventListener('DOMContentLoaded', UI.displayMovies);

//Event: Add a Book

//Event: Remove a Book