import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SeachBar/SearchBar";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../queries/get-categories";

export type CategoriesType = {
  id: number;
  name: string;
};

function Header() {
  const [categories, setCategories] = useState<CategoriesType[]>([]);

 const { data: categoriesData, loading, error } = useQuery(GET_CATEGORIES);

 console.log("CATEGORIS DATS" , categoriesData);
 
 useEffect(() => {
  if (categoriesData && categoriesData.getCategories) {
    setCategories(categoriesData.getCategories);
  }
}, [categoriesData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;


  return (
    <header className="header">
      <div className="main-menu">
        <h1>
          <a href="/" className="button logo link-button">
            <span className="mobile-short-label">TGC</span>
            <span className="desktop-long-label">THE DARK CORNER</span>
          </a>
        </h1>
       <SearchBar/>
        <div className="post-ad-container">
          <div  className="button link-button">
            <span className="mobile-short-label">Publier</span>
            <a href="/form" className="desktop-long-label">Publier une annonce</a>
          </div>
        </div>
      </div>
      <nav className="categories-navigation">
        {categories.map((cat, id) => (
          <div key={id}>
            {id > 0 && "•"}
            <Link to={`/${cat.name}`} className="category-navigation-link">
              {cat.name}
            </Link>
          </div>
        ))}
      </nav>
    </header>
  );
}

export default Header;
