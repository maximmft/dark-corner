import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdCardType } from "../../types/AdCardType";
import "./AdDetail.css";
import { CategoryType } from "../../types/Category";
import { TagsOptionType, TagsType } from "../../types/TagsType";
import AdEditForm from "../../components/AdEditForm";

export default function AdDetail() {
  const { adId } = useParams();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [ads, setAds] = useState<AdCardType | undefined>();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [options, setOptions] = useState<TagsOptionType[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagsOptionType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const navigate = useNavigate();

  console.log("selecttage", selectedTags);
  
  
  async function fetchData() {
    const { data } = await axios.get<AdCardType>(
      `http://localhost:3000/ads/${adId}`
    );
    setAds(data);
    setSelectedCategory(data.category.id);
    if (Array.isArray(data.tags)) {
      setSelectedTags(data.tags as TagsOptionType[]); 
    }    console.log(ads);
    
  }

  async function fetchCategories() {
    const { data } = await axios.get("http://localhost:3000/categories");
    setCategories(data);
    return data;
  }

  console.log("ads", ads);

  async function fetchTags() {
    const { data } = await axios.get("http://localhost:3000/tags");
    const tagOptions: TagsOptionType[] = data.map((tag: TagsType) => ({
      value: tag.id,
      label: tag.name,
    }));
    setOptions(tagOptions);
    return data;
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm("Etes vous sur?");
    if (confirmDelete) {
      axios.delete(`http://localhost:3000/ads/${adId}`);
      navigate(-1);
    }
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(parseInt(e.target.value));
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    if (selectedCategory) {
      formJson.categoryId = selectedCategory.toString();
    }

    if (selectedTags) {
      formJson.tags = JSON.stringify(selectedTags.map(tag => tag.value));
    }

    console.log("formJson", formJson);

    try {
      await axios.put(`http://localhost:3000/ads/${adId}`, formJson);

      setEditMode(false);
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la modification de l'annonce :", error);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchTags();
    if (ads) {
      setSelectedCategory(ads.category.id);
    }
  }, [adId]);

  console.log("selected Cate", selectedCategory);

  return (
    <main id="adDetail">
      <section className="main-content">
        {editMode ? (
          <AdEditForm
            ads={ads}
            categories={categories}
            options={options}
            selectedTags={selectedTags}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory} 
            setSelectedTags={setSelectedTags}
            handleEdit={handleEdit}
            handleChangeCategory={handleChangeCategory}
            setEditMode={setEditMode}
          />
        ) : ads ? (
          <section className="informations-section">
            <div className="informations">
              <h1>{ads.title}</h1>
              <p>Catégorie: {ads.category.name}</p>
              <p>

                {Array.isArray(ads.tags) ? (
                  ads?.tags.map((tag: TagsType) => (
                    <span className="tags" key={tag.id}>{tag.name} </span>
                  ))
                ) : (
                  <span>{ads.tags.name} </span>
                )}{" "}
              </p>
              <p>Description: {ads.description}</p>
              <p>Où: {ads.location}</p>
              <p>Prix: {ads.price}€</p>
              <p>Propriétaire: {ads.owner}</p>
              {editMode === false && (
                <div className="buttons">
                  <button onClick={() => setEditMode(true)}>
                    Modifier cette annonce
                  </button>
                  <button onClick={handleDelete}>Supprimer cette annonce</button>
                </div>
              )}
            </div>
            <img src={ads.picture} alt={ads.title} />
          </section>
        ) : (
          <p>L'annonce n'est plus disponible</p>
        )}
      </section>
    </main>
  );
}
