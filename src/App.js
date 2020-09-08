import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GameBoard } from './GameBoard';
import {Layout} from './Layout.component'

function App() {
  return (
    <div className="App">
      <Layout>
        <GameBoard/>
      </Layout>
      
    </div>
  );
}

export default App;
