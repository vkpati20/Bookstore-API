import React from 'react';
import axios from 'axios';
import '../stylesheets/Search.css'
import '../stylesheets/custom.scss';

const API_key = {
    key: `${process.env.REACT_APP_API_KEY}`,
    base: "https://www.googleapis.com/books/v1/volumes?q="
  }
export default class Search extends React.Component{
    state={
        bookName: '',
        results: []
    }

    handleChange = e =>{
        this.setState({
            bookName: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.state.bookName.length === 0){
            alert("enter a book name");
        }

        else{
            axios.get(`${API_key.base}${this.state.bookName}&key=${API_key.key}&maxResults=12`)
                .then(res =>{
                    this.setState({results:res.data.items});
                    console.log(this.state.results)

                })
                .catch(err=>{
                    console.log("Error!")
                    console.logg(err);
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
                                <div className="form-group">
                                    <input className="form-control" type="text" name="bookName" value = {this.state.bookName} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-md">Submit</button>
                                </div>
                            </form>
                        </div>
                    </header>
                </div>
            </React.Fragment>
        );
    }
}