import { FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdCardType } from "../../types/AdCardType";
import "./AdDetail.css";
import { CategoryType } from "../../types/Category";
import { TagsOptionType, TagsType } from "../../types/TagsType";
import AdEditForm from "../../components/AdEditForm";
import { GET_CATEGORIES } from "../../queries/get-categories";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AD_ID } from "../../queries/ads/get-ads-by-id";
import { DELETE_AD } from "../../mutations/ads/delete-ads";
import { GET_TAGS } from "../../queries/get-tags";
import { PATCH_AD } from "../../mutations/ads/patch-ads";
import { GET_AD_CAT_TAG } from "../../queries/multiples/get-ad-cat-tag";

export default function AdDetail() {
  const { adId } = useParams();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [ads, setAds] = useState<AdCardType | undefined>();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [options, setOptions] = useState<TagsOptionType[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagsOptionType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const navigate = useNavigate();

  //const { data: categoriesData } = useQuery(GET_CATEGORIES);

 // const { data: tagsData } = useQuery(GET_TAGS);

  //const { loading, error, data, refetch } = useQuery(GET_AD_ID, {
  const {loading, error, data, refetch} = useQuery(GET_AD_CAT_TAG, {
    variables: { adId },
  });

  console.log("DATA",data);
  
  useEffect(() => {
    if (data) {
      setAds(data?.getAdById);
      setSelectedCategory(data.getAdById.category.id);
    }

    if (data?.getCategories) {
      setCategories(data.getCategories);
    }

    if (data?.getTags) {
      const tagOptions: TagsOptionType[] = data.getTags.map(
        (tag: TagsType) => ({
          value: tag.id,
          label: tag.name,
        })
      );
      setOptions(tagOptions);
    }
  }, [data]);

  

  const [deleteAd] = useMutation(DELETE_AD, {
    onCompleted: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression", error);
    },
  });

  const [patchAd] = useMutation(PATCH_AD, {
    onCompleted: () => {
      refetch();
      setEditMode(false);
    },
    onError: (error) => {
      console.error("Erreur lors de la modification", error);
    },
  });

  const handleDelete = () => {
    const confirmDelete = window.confirm("Êtes vous sur?");
    if (confirmDelete) {
      deleteAd({
        variables: { adId },
      });
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

    const data = {
      title: formJson.title as string,
      description: formJson.description as string,
      owner: formJson.owner as string,
      price: parseFloat(formJson.price as string),
      picture: formJson.picture as string,
      location: formJson.location as string,
      categoryId: selectedCategory ? selectedCategory.toString() : undefined,
      tagId: selectedTags ? selectedTags.map((tag) => tag.value) : [],
    };

    try {
      await patchAd({
        variables: {
          adId,
          data,
        },
      });
      setEditMode(false);
    } catch (error) {
      console.error("Erreur lors de la modification de l'annonce :", error);
      console.log(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

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
                    <span className="tags" key={tag.id}>
                      {tag.name}{" "}
                    </span>
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
                  <button onClick={handleDelete}>
                    Supprimer cette annonce
                  </button>
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
