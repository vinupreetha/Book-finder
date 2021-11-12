import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

function App() {
const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState({ items: [] });
  const onInputChange = e => {
    setSearchTerm(e.target.value);
  };

  let API_URL = `https://www.googleapis.com/books/v1/volumes`;

  const fetchBooks = async () => {
    const result = await axios.get(`${API_URL}?q=${searchTerm}`);
    setBooks(result.data);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    fetchBooks();
  };

  const bookAuthors = authors => {
    /*if (authors.length <= 2) {
      authors = authors.join(" and ");
    } else if (authors.length > 2) {
      let lastAuthor = " and " + authors.slice(-1);
      authors.pop();
      authors = authors.join(", ");
      authors += lastAuthor;
    }
*/    return authors;
  };

  return (
    <section >
      <form onSubmit={onSubmitHandler}>
       <h2> Book Search Tool</h2>
          
        <div className="book-div">  <input
            type="search" className="search-input"
            placeholder="Search for books"
            value={searchTerm}
            onChange={onInputChange}
          />&nbsp;&nbsp;
          <button className="btn_book" type="submit">Search</button>
      </div>
       
      </form>
      <ul className="book-items">
        {books.items.map((book, index) => {
          return (
            <li  key={index}>
              <div>
                <img
                  alt={`${book.volumeInfo.title} book`}
                  src={`http://books.google.com/books/content?id=${
                    book.id
                  }&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                />
                <div>
                  <h3>Title: {book.volumeInfo.title}</h3>
                  <p>Author: {bookAuthors(book.volumeInfo.authors)}</p>
                  <p>Published Date: {book.volumeInfo.publishedDate}</p>
                </div>
              </div>
              <hr />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default App;
