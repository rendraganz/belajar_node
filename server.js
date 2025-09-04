const express = require('express');
const cors = require('cors');
const app = express();
const port = 3100;

let idSeq = 3;

let movies = [
    {id: 1, title: 'Suami Takut Istri', director: 'Suami First', year: 2015},
    {id: 2, title: 'Second Choice', director: 'Suami Second', year: 2015},
    {id: 3, title: 'Tukang Haji Naik Pajero', director: 'Rendra', year: 2025}
];

let directors = [
    {id: 1, name: 'Suami First', birthYear: 1945},
    {id: 2, name: 'Suami Second', birthYear: 1967},
    {id: 3, name: 'Rendra', birthYear: 2006}
];

// Middleware to parse JSON bodies
app.use(cors());

app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.json({
        ok: true,
        service: 'film API',
        time: new Date().toISOString()
    });
});

app.get('/directors', (req, res) => {
    res.json(directors);
});

app.get('/directors/:id', (req, res) => {
    const id = Number(req.params.id);
    const director = directors.find(d => d.id === id);
    if (!director)
        return res.status(404).json({ error: 'Director tidak ditemukan' }
    );
    res.json(director);
});

app.post('/directors', (req, res) => {
    const { name, birthYear } = req.body;
    if (!name || !birthYear) {
        return res.status(400).json({ error: 'Data director tidak lengkap' });
    }
    const newDirector = { id: movies.length + 1, name, birthYear };
    directors.push(newDirector);
    res.status(201).json(newDirector);
});

app.put('/directors/:id', (req, res) => {
    const id = Number(req.params.id);
    const directorIndex = directors.findIndex(m => m.id === id);
    if (directorIndex === -1)
        return res.status(404).json({ error: 'Director tidak ditemukan' }
    )
    const { name, birthYear } = req.body || {};
    const updatedDirector = { id, name, birthYear };
    directors[directorIndex] = updatedDirector;
    res.json(updatedDirector);
});

app.delete('/directors/:id', (req, res) => {
    const id = Number(req.params.id);
    const directorIndex = directors.findIndex(m => m.id === id);
    if (directorIndex === -1)
        return res.status(404).json({ error: 'Director tidak ditemukan' }
    )
    directors.splice(directorIndex, 1);
    res.status(204).end();
});
app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/movies/:id', (req, res) => {
    const id = Number(req.params.id);
    const movie = movies.find(m => m.id === id);
    if (!movie) return res.status(404).json({ error: 'Movie tidak ditemukan' });
    res.json(movie);
});

app.post('/movies', (req, res) => {
    const { title, director, year } = req.body;
    if (!title || !director || !year) {
        return res.status(400).json({ error: 'Data film tidak lengkap' });
    }
    const newMovie = { id: movies.length + 1, title, director, year };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.put('/movies/:id', (req, res) => {
    const id = Number(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1)
        return res.status(404).json({ error: 'Movie tidak ditemukan' }
    )
    const { title, director, year } = req.body || {};
    const updatedMovie = { id, title, director, year };
    movies[movieIndex] = updatedMovie;
    res.json(updatedMovie);
});

app.delete('/movies/:id', (req, res) => {
    const id = Number(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1)
        return res.status(404).json({ error: 'Movie tidak ditemukan' }
    )
    movies.splice(movieIndex, 1);
    res.status(204).end();
});

// Middleware fallback for 404 Not Found
app.use((req, res, next) => {
    res.status(404).json({ error: 'Rute tidak ditemukan' });
});

// error handling middleware
app.use((err, req, res, _next) => {
    console.error('[ERROR]', err);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server aktif di http://localhost:${port}`);
});