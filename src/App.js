import React from 'react';
import { useState } from 'react'
import './App.css';
import Title from "./components/title";
import Sidebar from "./components/sidebar";
import Article from "./components/article";

function App() {

  const [titleText, setTitleText] = useState('MostViewed - Day');
  const handleTitleChange = (newTitle) => {
    setTitleText(newTitle);
  }

  const[sort, setSort] = useState("MostViewed");
  const[time, setTime] = useState("1");
  const handleSortChange = (newSort) => {
    setSort(newSort);
  }
  const handleTimeChange = (newTime) => {
    setTime(newTime);
  }

  const [articleNum, setArticleNum] = useState(1);
  const handleArticleChange = (newArticle) => {
    setArticleNum(newArticle);
  }

  return (
    <div className="App">
      <header className="App-header">

        <Title title={titleText}/>
      
      </header>

      <main className="App-main">
        <Sidebar onTitleChange={handleTitleChange} onSortChange={handleSortChange} onTimeChange={handleTimeChange} onNumChange={handleArticleChange}/>
        <Article sort = {sort} time = {time} articleNum={articleNum}/>
      </main>
    </div>
  );
}

export default App;
