//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//User data link: https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json
import axios from 'axios';

async function getUsers() {
    const { data } = await axios.get('https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json')
    return data; // this will be the array of user objects
}
async function getMovies() {
    const { data } = await axios.get('https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json')
    return data; // this will be the array of user objects
}

export const getUserById = async (id) => {
    const data = await getUsers();
    if (!id) {
        throw new Error("ID needs to exist");
    }
    if (typeof id != 'string') {
        throw new Error("Input is not a string");
    }
    if (id.length === 0) {
        throw new Error('String length is 0');
    }


    const user = data.find((user) => user.id === id); //https://stackoverflow.com/questions/51229193/how-to-find-a-user-by-username-in-the-client-users-collection

    if (!user) {
        throw new Error('User not found');
    }

    return user;

};
export const sameGenre = async (genre) => {
    const users = await getUsers();
    if (typeof genre !== 'string') {
        throw new Error('Genre should be a string');
    }
    if (genre.trim().length === 0) {
        throw new Error('Genre should not be an empty string');
    }
    const matchingUsers = users.filter(user => user.favorite_genre.toLowerCase() === genre.toLowerCase());
    if (matchingUsers.length < 2) {
        throw new Error('There should be at least 2 users with the same favorite genre');
    }
    const sortedUsers = matchingUsers.sort((a, b) => a.last_name.localeCompare(b.last_name));
    // console.log(sortedUsers)
    const userNames = sortedUsers.slice(0, 50).map(user => `${user.first_name} ${user.last_name}`); //https://stackoverflow.com/questions/62521671/how-do-i-sort-slice-then-map-an-array

    return userNames;
};

export const moviesReviewed = async (id) => {
    if (!id) {
        throw new Error("Error enter an ID");
    }
    if (typeof id !== "string") {
        throw new Error("Enter a string as an ID");
    }
    if (id.trim() === "") {
        throw new Error("Invalid id");
    }
    const users = await getUsers();
    const movies = await getMovies();

    const user = users.find((u) => u.id === id);
    if (!user) {
        throw new Error("User not found");
    }

    const reviewedMovies = {};

    for (let movie of movies) {
        if (movie.reviews) {
            const review = movie.reviews.find((rev) => rev.username === user.username); //https://stackoverflow.com/questions/53439456/how-to-return-an-array-as-an-array-of-objects
            if (review) {
                reviewedMovies[movie.title] = {
                    username: review.username,
                    rating: review.rating,
                    review: review.review,
                };
            }
        }
    }

    return [reviewedMovies];
};

export const referMovies = async (id) => {
    if (typeof id !== 'string') {
        throw new Error('id must be a string');
    }
    if (id.trim().length === 0) {
        throw new Error('id cannot be empty');
    }
    const users = await getUsers();
    const movies = await getMovies();
    const user = users.find(u => u.id === id);
    if (!user) {
        throw new Error('User not found');
    }
    const favoriteGenre = user.favorite_genre;
    const recommendedMovies = [];
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        if (movie.genre.includes(favoriteGenre) && !movie.reviews.find(review => review.user_id === user.id)) {
            recommendedMovies.push(movie.title);
        }
    }

    return recommendedMovies;
};
