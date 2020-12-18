const addMovieModal = document.getElementById('add-modal')
const startAddMovieButton = document.querySelector('header button')
const backdrop = document.getElementById('backdrop')
const cancelMovieButton = addMovieModal.querySelector('.btn--passive')
const confirmAddMovieButton = cancelMovieButton.nextElementSibling
const inputs = addMovieModal.querySelectorAll('input')
const entryTextSection = document.getElementById('entry-text')
const listRoot = document.getElementById('movie-list')
const deleteMovieModal = document.getElementById('delete-modal')


const movies = []

function upadateUI () {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block'
    } else {
        entryTextSection.style.display = 'none'
    }
}

function cancelMovieDeletion () {
    toggleBackdrop()
    deleteMovieModal.classList.remove('visible')
}

function deleteMovie (movieId) {
    let movieIndex = 0
    for (const movie of movies) {
        if (movie.id === movieId) {
            break
        }
        movieIndex++
    }
    movies.splice(movieIndex, 1)
    listRoot.children[movieIndex].remove()
    cancelMovieDeletion()
    upadateUI()
}

function deleteMovieHandler (movieId) {
    deleteMovieModal.classList.add('visible')
    toggleBackdrop()
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive')
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger')

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true))

    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger')

    cancelDeletionButton.removeEventListener('click', cancelMovieDeletion)

    cancelDeletionButton.addEventListener('click', cancelMovieDeletion)
    confirmDeletionButton.addEventListener('click', deleteMovie.bind(null, movieId))
}

function renderNewMovieElement (id, title, imageUrl, rating) {
    const newMovieElement = document.createElement('li')
    newMovieElement.className = 'movie-element'
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt"${title}">
        </div>
        <div clas="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
    listRoot.append(newMovieElement)
}

function toggleBackdrop () {
    backdrop.classList.toggle('visible')
}

function closeMovieModal () {
    addMovieModal.classList.remove('visible')
}

function showMovieModal () {
    addMovieModal.classList.add('visible')
    toggleBackdrop()
}

function clearMovieInput () {
    for (const input of inputs) {
        input.value = ''
    }
}

function cancelAddMovieHandler () {
    closeMovieModal()
    toggleBackdrop()
    clearMovieInput()
}

function addMovieHandler () {
    const titleValue = inputs[0].value
    const imageUrlValue = inputs[1].value
    const ratingValue = inputs[2].value

    if (
        titleValue.trim() === '' ||
        imageUrlValue.trim() === '' || 
        ratingValue.trim() === '' ||
        +ratingValue < 1 || 
        +ratingValue > 5
        ) {
            alert('Please enter valid values (rating between 1 and 5).')
            return
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    }

    movies.push(newMovie)
    console.log(movies);
    closeMovieModal()
    toggleBackdrop()
    clearMovieInput()
    renderNewMovieElement(
        newMovie.id, 
        newMovie.title, 
        newMovie.image, 
        newMovie.rating
        )
    upadateUI()
}

function backdropClickHandler () {
    closeMovieModal()
    cancelMovieDeletion()
    clearMovieInput()
}

startAddMovieButton.addEventListener('click', showMovieModal)
backdrop.addEventListener('click', backdropClickHandler)
cancelMovieButton.addEventListener('click', cancelAddMovieHandler)
confirmAddMovieButton.addEventListener('click', addMovieHandler)