import React from "react";
import NewsArticle from "./NewsArticle";

const articles = [
  {
    title: "Breaking News 1",
    image: "https://via.placeholder.com/400",
    content: "This is the content for breaking news 1.",
  },
  {
    title: "Breaking News 2",
    image: "https://via.placeholder.com/400",
    content: "This is the content for breaking news 2.",
  },
  {
    title: "Breaking News 3",
    image: "https://via.placeholder.com/400",
    content: "This is the content for breaking news 3.",
  },
  // Add more articles as needed
];

const NewsFeed: React.FC = () => {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll w-full">
      {articles.map((article, index) => (
        <div key={index} className="snap-start">
          <NewsArticle
            title={article.title}
            image={article.image}
            content={article.content}
          />
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
