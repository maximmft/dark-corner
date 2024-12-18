import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { CategoryType } from "../types/Category";
import { TagsOptionType, TagsType } from "../types/TagsType";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../queries/get-categories";
import { GET_TAGS } from "../queries/get-tags";
import { CREATE_AD } from "../mutations/ads/create-ad";
import { useNavigate } from "react-router-dom";

type AdFormProps = {
  onSubmit: (formData: any) => Promise<void>;
  initialData?: {
    title?: string;
    description?: string;
    price?: number;
    picture?: string;
    location?: string;
    owner?: string;
    createdAt?: string;
    categoryId?: string;
    tags?: TagsOptionType[];
  };
};

const AdForm = ({ onSubmit, initialData = {} }: AdFormProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [options, setOptions] = useState<TagsOptionType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    initialData.categoryId || ""
  );
  const [selectedTags, setSelectedTags] = useState<TagsOptionType[]>(
    initialData.tags || []
  );
  const navigate = useNavigate();

  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  
  const { data: tagsData } = useQuery(GET_TAGS);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData.getCategories);
    }

    if (tagsData) {
      const tagOptions: TagsOptionType[] = tagsData.getTags.map(
        (tag: TagsType) => ({
          value: tag.id,
          label: tag.name,
        })
      );
      setOptions(tagOptions);
    }
  }, [categoriesData, tagsData]);

  const [createAd] = useMutation(CREATE_AD, {
    onCompleted: () => {
      navigate("/");
      window.alert("Annonce publiée");
    },
    onError: (error) => {
      console.error("Erreur lors de la création d'annonce", error);
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const data = {
      title: formJson.title as string,
      description: formJson.description as string,
      owner: formJson.owner as string,
      price: parseFloat(formJson.price as string),
      picture: formJson.picture as string,
      location: formJson.location as string,
      categoryId: selectedCategory,
      tagId: (formJson.tags = JSON.stringify(
        selectedTags.map((tag) => tag.value)
      )),
    };

    try {
      await onSubmit(formJson);
      await createAd({
        variables: {
          data,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Titre:
        <input
          className="text-field"
          name="title"
          type="text"
          defaultValue={initialData.title || ""}
        />
      </label>
      <label>
        Description:
        <input
          className="text-field"
          name="description"
          type="text"
          defaultValue={initialData.description || ""}
        />
      </label>
      <label>
        Prix:
        <input
          className="text-field"
          name="price"
          type="number"
          defaultValue={initialData.price || ""}
        />
      </label>
      <label>
        Photo:
        <input
          className="text-field"
          name="picture"
          type="text"
          defaultValue={initialData.picture || ""}
        />
      </label>
      <label>
        Localisation:
        <input
          className="text-field"
          name="location"
          type="text"
          defaultValue={initialData.location || ""}
        />
      </label>
      <label>
        Propriétaire:
        <input
          className="text-field"
          name="owner"
          type="text"
          defaultValue={initialData.owner || ""}
        />
      </label>
      <select
        name="categoryId"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        defaultValue={initialData.categoryId || ""}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <Select
        options={options}
        isMulti
        name="tags"
        onChange={(selected) => setSelectedTags(selected as TagsOptionType[])}
        value={selectedTags}
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: "rgb(29, 29, 30)",
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "rgb(29, 29, 30)",
          }),
        }}
      />

      <button type="submit">Create Ad</button>
    </form>
  );
};

export default AdForm;
