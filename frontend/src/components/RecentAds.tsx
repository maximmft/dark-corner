import { GET_ADS } from "../queries/ads/get-ads";
import AdCard, { AdCardProps } from "./AdCard";
import {
  useQuery,
} from "@apollo/client";

function RecentAds() {
 
  const { loading, error, data } = useQuery(GET_ADS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  
  return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {data.getAds.map((ad:AdCardProps) => (          
          <AdCard
            id={ad.id}
            key={ad.id}
            picture={ad.picture}
            title={ad.title}
            price={ad.price}
          />
        ))}
      </section>
    </main>
  );
}

export default RecentAds;
