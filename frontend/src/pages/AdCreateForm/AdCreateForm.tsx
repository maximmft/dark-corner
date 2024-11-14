import axios from "axios";
import AdForm from "../../components/CreationForm";
import "./AdCreateForm.css"

function AdCreateForm() {
  const handleCreateAd = async (formData: any) => {
    try {
      await axios.post("http://localhost:3000/ads", formData);
      console.log("Annonce créée avec succès:", formData);
    } catch (error) {
      console.error("Erreur lors de la création de l'annonce :", error);
    }
  };

  return (
    <main id="AdCreateForm">
      <section className="main-content">
        <h1 className="title">Créer une annonce</h1>
        <AdForm onSubmit={handleCreateAd} />
      </section>
    </main>
  );
}

export default AdCreateForm;
