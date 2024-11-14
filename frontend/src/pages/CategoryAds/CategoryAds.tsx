import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdCard, { AdCardProps } from "../../components/AdCard";
import axios from "axios";
import "./CategoryAds.css";


export function CategoryAds() {
  const { name } = useParams();

  const [ads, setAds] = useState<AdCardProps[]>([]);
  async function fetchData() {
    const { data } = await axios.get<AdCardProps[]>(
      `http://localhost:3000/ads?category=${name}`
    );
    setAds(data);
  }

  console.log("ads", ads);

  useEffect(() => {
    fetchData();
  }, [name]);

  return (
    <main id="CategoryAds">
      <h1 className="title">Catégorie: {name}</h1>
    <section className="main-content">
      {ads.length > 0 ? ads.map((ad) => (
        <AdCard
          id={ad.id}
          key={ad.id}
          picture={ad.picture}
          title={ad.title}
          price={ad.price}
        />
      )) : <p>Pas d'annonces publiées</p>}
    </section>
    </main>
  );
}
