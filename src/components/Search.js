import React from 'react';
import axios from 'axios';
import '../stylesheets/Search.css'
import '../stylesheets/custom.scss';
import { Link } from 'react-router-dom';

const API_key = {
    key: `${process.env.REACT_APP_API_KEY}`,
    base: "https://www.googleapis.com/books/v1/volumes?q="
  }
export default class Search extends React.Component{
    state={
        bookName: '',
        numBooks: 0,
        results: []
    }

    handleTitleChange = e =>{
        this.setState({
            bookName: e.target.value
        })
    }
    handleBooksChange = e =>{
        this.setState({
            numBooks: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.state.bookName.length === 0){
            alert("enter a book name");
        }
        else if(this.state.numBooks < 1 || this.state.numBooks > 40 ){
            alert("Number of books should be between 1 and 40");
        }

        else{
            axios.get(`${API_key.base}${this.state.bookName}&key=${API_key.key}&maxResults=${this.state.numBooks}`)
                .then(res =>{
                    this.setState({results:res.data.items});
                    console.log(`${API_key.base}${this.state.bookName}&key=${API_key.key}&maxResults=${this.state.numBooks}`);
                })
                .catch(err=>{
                    console.log(`${API_key.base}${this.state.bookName}&key=${API_key.key}&maxResults=${this.state.numBooks}`);

                    console.log("Error!")
                    console.log(err);
                })
        }
    }

    render(){

        return(
            <React.Fragment>
                <div className="container">
                    <header className="jumbotron">
                        <div className="container">
                            <h1>Welcome to Google Books API</h1>
                            <p>Enter a book name to start</p>
                            <form onSubmit={this.handleSubmit}> 
                                <div className="form-group one">
                                    <input className="form-control" type="text" name="bookName" value = {this.state.bookName} onChange={this.handleTitleChange}/>
                                </div>
                                <div className="form-group two">
                                    <button type="submit" className="btn btn-primary btn-md">Submit</button>
                                    <div className="numBooks">
                                        <label>Number of books to display: </label>
                                        <input className="form-control" type="text" name="numBooks" value={this.state.numBooks} onChange={this.handleBooksChange} maxlength="2"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </header>

                    <div className="row">
                        {this.state.results.map(book=>(
                            <div className="col-lg-4 col-md-6 col-sm-12 book">
                                <div className="container">
                                    <div className="image">
                                        <img src={book.volumeInfo.imageLinks.thumbnail} alt = {book.volumeInfo.title}/>
                                    </div>
                                    <div className="caption">
                                        <h4>{book.volumeInfo.title}</h4>
                                    </div>
                                    <div className="description">
                                        <p>{book.volumeInfo.description}</p>
                                    </div>
                                    <div className="link">
                                    <Link  
                                        to={{
                                        pathname: '/info', 
                                        about: {
                                            title: book.volumeInfo.title,
                                            authors: book.volumeInfo.authors,
                                            imgURL: book.volumeInfo.imageLinks.thumbnail,
                                            description: book.volumeInfo.description,
                                            publisher: book.volumeInfo.publisher,
                                            isbn: book.volumeInfo.industryIdentifiers===undefined? '': book.volumeInfo.industryIdentifiers[1].identifier,
                                            bookLink: book.volumeInfo.previewLink
                                        }
                                        }}

                                        className="btn btn-primary btn-block"
                                        >
                                        More Info
                                    </Link>
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </React.Fragment>
        );
    }
}