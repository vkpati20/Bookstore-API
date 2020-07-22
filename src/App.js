import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './components/Search';
import Info from './components/Info';

export default class App extends React.Component{

  render(){
    return (
      <div className="App">
       <BrowserRouter>
        <switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/info" component={Info} />

        </switch> 
      </BrowserRouter>
      </div>
    );
  }
}

