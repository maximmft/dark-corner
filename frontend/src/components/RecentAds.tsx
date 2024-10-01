import axios from "axios";
import AdCard, { AdCardProps } from "./AdCard";
import { useEffect, useState } from "react";

function RecentAds() {
  const [ads, setAds] = useState<AdCardProps[]>([]);
  async function fetchData() {
    const { data } = await axios.get<AdCardProps[]>(
      "http://localhost:3000/ads"
    );
    setAds(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((ad) => (
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
