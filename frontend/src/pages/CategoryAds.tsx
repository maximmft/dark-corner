import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdCard, { AdCardProps } from "../components/AdCard";
import axios from "axios";

export function CategoryAds(){
  const { name: categoryName } = useParams();
    
    const [ads, setAds] = useState<AdCardProps[]>([]);
    async function fetchData() {
      const { data } = await axios.get<AdCardProps[]>(
        `http://localhost:3000/ads?category=${categoryName}`
      );
      setAds(data);
    }

    console.log("ads",ads);
  

  
    useEffect(() => {
      fetchData();
    }, [categoryName]);

    return (
        <div>
            <h1>Catégorie:</h1>
            {ads.map((ad) => (
          <AdCard
            id={ad.id}
            key={ad.id}
            picture={ad.picture}
            title={ad.title}
            price={ad.price}
          />
        ))}
        </div>
    )
}