const router = require("express").Router();
const authenticateToken = require('../middleware/jwt')
const Book = require('../models/books');


    // Create a new book
router.post('/books', authenticateToken, async (req, res) => {
    try {
      const newBook = await Book.create(req.body);
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Get all books
  router.get('/books', authenticateToken, async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Get a specific book by ID
  router.get('/books/:id', authenticateToken, async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Update a book by ID
  router.put('/books/:id', authenticateToken, async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Delete a book by ID
  router.delete('/books/:id', authenticateToken, async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
      if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
 
module.exports = router;