import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdCard, { AdCardProps } from "../../components/AdCard";
import "./CategoryAds.css";
import { GET_AD_CAT } from "../../queries/ads/get-ads-by-cat";
import { useQuery } from "@apollo/client";

export function CategoryAds() {
  const { name } = useParams();

  const [ads, setAds] = useState<AdCardProps[]>([]);
  const [cat, setCat] = useState<string | null>(null);


  const { loading, error, data } = useQuery(GET_AD_CAT, {
    variables: { categoryName: name },
  });

  useEffect(() => {
    if (data) {
      setAds(data.getAdsByCategory);
      setCat(data.getAdsByCategory[0].category.name)
    }
  }, [data]);

  console.log("data", data);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <main id="CategoryAds">
      <h1 className="title">Catégorie: {cat}</h1>
      <section className="main-content">
        {ads.length > 0 ? (
          ads.map((ad) => (            
            <AdCard
              id={ad.id}
              key={ad.id}
              picture={ad.picture}
              title={ad.title}
              price={ad.price}
            />
          ))
        ) : (
          <p>Pas d'annonces publiées</p>
        )}
      </section>
    </main>
  );
}
