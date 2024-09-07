import React, { useState, useEffect } from "react";
import "./article.css";


function ArticleItem({ article, index }) {

    return (
        <div className={`article ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="article-firstDiv">
                <h3 className="article-title">{index + 1}. {article.title}</h3>
                <p className="article-published-date">{article.published_date}</p>
            </div>
            <div className="article-secondDiv">
                {article.media && article.media.length > 0 && article.media[0]['media-metadata'] && (
                    <img src={article.media[0]['media-metadata'][0].url} alt="Article" className="article-img" />
                )}
                <p className="article-abstract">{article.abstract}</p>
            </div>
        </div>
    );
}

function Article({ sort, time , articleNum}) {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;


    useEffect(() => {         //there are 3 parameters, function and array, if array changes, function will run
        fetchArticles(sort, time, articleNum);
    }, [sort, time, articleNum]);

    async function fetchArticles(sort, time, articleNum) {
        let url;
        switch (sort) {
            case "MostViewed":
                url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/${time}.json?api-key=1entZDlP3X37zxpRzRP5kZFWrkJoRWNY`;
                break;
            case "MostShared":
                url = `https://api.nytimes.com/svc/mostpopular/v2/shared/${time}.json?api-key=1entZDlP3X37zxpRzRP5kZFWrkJoRWNY`;
                break;
            case "MostEmailed":
                url = `https://api.nytimes.com/svc/mostpopular/v2/emailed/${time}.json?api-key=1entZDlP3X37zxpRzRP5kZFWrkJoRWNY`;
                break;
            default:
                url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/${time}.json?api-key=1entZDlP3X37zxpRzRP5kZFWrkJoRWNY`;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setArticles(data.results.slice(0, articleNum));
        } catch (error) {
            console.error("There has been a problem with your fetch operation:", error);
        }
    }

    //计算当前页面的文章索引
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    }

    const pageNum = [];
    for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
        pageNum.push(i);
    }

    const renderPageNumbers = pageNum.map(number => {
        return (
            <li
                key={number}
                id={number}
                onClick={handleClick}
                className={currentPage === number ? "active" : null}
                style={{ cursor: "pointer", margin: "0 5px", display: "inline-block" }}
            >
                {number}
            </li>

        );
    });

    return (
        <div>
            <div className="article-container">
                {currentArticles.map((article, index) => (
                    <ArticleItem key={article.id} article={article} index={index} />
                ))}
            </div>

            <ul id="page-numbers" style={{ listStyleType: 'none', padding: 0 }}>
                {renderPageNumbers}
            </ul>

        </div>
    );

}

export default Article;