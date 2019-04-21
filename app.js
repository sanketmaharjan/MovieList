//Movie Class: Represents a Movie

class Movie{
    constructor(title, genre, rating){
        // this.sn = sn;
        this.title = title;
        this.genre = genre;
        this.rating = rating;
    }
}

//UI Class: handle UI Tasks

class UI{
    static displayMovies(){
        const movies = Store.getMovies();
        movies.forEach((movie) => UI.addMovieToList(movie));
    }
 
    static addMovieToList(movie){
        const list = document.querySelector('#movie-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${movie.sn}</td>
        <td>${movie.title}</td>
        <td>${movie.genre}</td>
        <td>${movie.rating}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

        list.appendChild(row);
    }


    static deleteMovie(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#movie-form');
        container.insertBefore(div, form);

        //vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#genre').value = '';
        document.querySelector('#rating').value = '';
    }
}


//Store Class: Handles Storage

class Store{
   static getMovies(){
    let movies;
    if(localStorage.getItem('movies') === null){
        movies = [];
    }else{
        movies = JSON.parse(localStorage.getItem('movies'));
    }

    return movies;
    }

   static addMovie(movie){
    const movies = Store.getMovies();
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
    }

   static removeMovie(rating){
       const movies = Store.getMovies();
       movies.forEach((movie, index) => {
           
           if(movie.rating === rating ){
               movies.splice(index, 1);
           }
       });
       localStorage.setItem('movies', JSON.stringify(movies));

    }
}

//Event: Display Movie
document.addEventListener('DOMContentLoaded', UI.displayMovies);

//Event: Add a Movie
document.querySelector('#movie-form').addEventListener('submit',(e) => {

    //prevent actual sumbit
    e.preventDefault();
    // const sn = document.querySelector('sn').nodeValue;
    const title = document.querySelector('#title').nodeValue;
    const genre = document.querySelector('#genre').nodeValue;
    const rating = document.querySelector('#rating').nodeValue;

    //validate
    if(title === '' || genre === '' || rating === ''){
        UI.showAlert('Please enter all the fields', 'danger');
    }else{
    //instantiate movie
    const movie = new Movie(title, genre, rating);

    //add movie to ui
    UI.addMovieToList(movie);

    //add movie to store
    Store.addMovie(movie);

    //show sucess message
    UI.showAlert('Movie Added', 'success');

    //clear fields
    UI.clearFields();
    }
});

    //Event: Remove a Movie
    document.querySelector('#movie-list').addEventListener('click', (e)=>{

    //remove movie form UI
    UI.deleteMovie(e.target);

    //remove movie form store
    Store.removeMovie(e.target.parentElement.previousElementSibling.textContent);

    // show delete message
    UI.showAlert('Book Removed', 'success');
});
