import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { CategoryType } from "../types/Category";
import { TagsOptionType, TagsType } from "../types/TagsType";


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
  const [selectedTags, setSelectedTags] = useState<TagsOptionType[]>(initialData.tags || []);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await axios.get("http://localhost:3000/categories");
      setCategories(data);
    }

    async function fetchTags() {
      const { data } = await axios.get("http://localhost:3000/tags");
      const tagOptions: TagsOptionType[] = data.map((tag: TagsType) => ({
        value: tag.id,
        label: tag.name,
      }));
      setOptions(tagOptions);
    }

    fetchCategories();
    fetchTags();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    formJson.tags = JSON.stringify(selectedTags.map((tag) => tag.value))

    try {
      await onSubmit(formJson);
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
      <label>
        Date:
        <input
          type="text"
          name="createdAt"
          defaultValue={initialData.createdAt || ""}
        />
      </label>
      <select name="categoryId" defaultValue={initialData.categoryId || ""}>
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
