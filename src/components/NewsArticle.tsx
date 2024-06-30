import React from "react";

interface NewsArticleProps {
  title: string;
  image: string;
  content: string;
}

const NewsArticle: React.FC<NewsArticleProps> = ({ title, image, content }) => {
  return (
    <div className="h-screen flex items-center justify-center shadow-mdw-full rounded-lg">
      <div className="flex flex-col bg-primary items-center justify-center w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-2/5 object-cover rounded-md"
        />
        <h2 className="text-2xl font-bold mt-4">{title}</h2>
        <p className="mt-2 text-gray-700">{content}</p>
      </div>
    </div>
  );
};

export default NewsArticle;
