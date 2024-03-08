//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Movie data link: https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json
import axios from 'axios';

async function getUsers() {
    const { data } = await axios.get('https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json')
    return data; // this will be the array of user objects
}
async function getMovies() {
    const { data } = await axios.get('https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json')
    return data; // this will be the array of user objects
}


export const findMoviesByDirector = async (directorName) => {
    if (typeof directorName !== 'string' || directorName.trim().length === 0) {
        throw new Error('Invalid director name');
    }
    const movies = await getMovies();
    const listDirectorMovies = [];

    for (let i = 0; i < movies.length; i++) {
        if (movies[i].director === directorName) {
            listDirectorMovies.push(movies[i]);
        }
    }

    return listDirectorMovies;
};

export const findMoviesByCastMember = async (castMemberName) => {
    if (typeof castMemberName !== "string") {
        throw new Error("castMemberName must be a string");
    }

    if (castMemberName.trim().length === 0) {
        throw new Error("castMemberName cannot be empty");
    }

    const movies = await getMovies();
    const moviesListWithCast = movies.filter(movie => movie.cast.includes(castMemberName)); //https://stackoverflow.com/questions/44312924/filter-array-of-objects-whose-any-properties-contains-a-value

    if (moviesListWithCast.length === 0) {
        throw new Error(`No movies found for cast member "${castMemberName}"`);
    }

    return moviesListWithCast;
};

export const getOverallRating = async (title) => {
    if (!title || typeof title !== 'string') {
        throw new Error('Please provide a valid movie title');
    }

    if (!title.trim()) {
        throw new Error('Please provide a valid movie title');
    }

    const movies = await getMovies();
    const movie = movies.find((m) => m.title === title);

    if (!movie) {
        throw new Error(`No movie with the title '${title}' was found`);
    }

    let sum = 0;
    for (let review of movie.reviews) {
        sum = sum + review.rating;
    }

    const overallRating = Math.floor((sum / movie.reviews.length) * 10) / 10;
    return overallRating;
};

export const getMovieById = async (id) => {
    if (!id || typeof id !== 'string') {
        throw new Error('id must be a non-empty string');
    }
    if (id.trim().length === 0) {
        throw new Error('id must be a non-empty string');
    }
    const movies = await getMovies();
    const movie = movies.find((mov) => mov.id === id);
    if (!movie) {
        throw new Error('Error: movie not found');
    }
    return movie;

};
