import React from "react";
import Select from "react-select";
import { CategoryType } from "../types/Category";
import { TagsOptionType } from "../types/TagsType";
import { AdCardType } from "../types/AdCardType";

type AdEditFormProps = {
  ads?: AdCardType;
  categories: CategoryType[];
  options: TagsOptionType[];
  selectedTags: TagsOptionType[];
  selectedCategory?: number;
  setSelectedTags: (tags: TagsOptionType[]) => void;
  setSelectedCategory: (categoryId: number) => void;
  handleEdit: (e: React.FormEvent) => void;
  handleChangeCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setEditMode: (editMode: boolean) => void;
};



const AdEditForm: React.FC<AdEditFormProps> = ({
  ads,
  categories,
  options,
  selectedCategory,
  setSelectedTags,
  handleEdit,
  handleChangeCategory,
  setEditMode,
}) => {
  
  return (
    <main id="adDetail">
      <section className="main-content">
        <form className="form" onSubmit={handleEdit}>
          <label>
            Titre:
            <input
              className="text-field"
              name="title"
              type="text"
              defaultValue={ads?.title}
            />
          </label>
          <label>
            Description:
            <input
              className="text-field"
              name="description"
              type="text"
              defaultValue={ads?.description}
            />
          </label>
          <label>
            Prix:
            <input
              className="text-field"
              name="price"
              type="number"
              defaultValue={ads?.price}
            />
          </label>
          <label>
            Localisation:
            <input
              className="text-field"
              name="location"
              type="text"
              defaultValue={ads?.location}
            />
          </label>
          <label>
            Propriétaire:
            <input
              className="text-field"
              name="owner"
              type="text"
              defaultValue={ads?.owner}
            />
          </label>
          <select
            name="categoryId"
            value={selectedCategory}
            onChange={handleChangeCategory}
          >
            {categories.map((category: CategoryType) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <Select
            options={options}
            isMulti
            name="tags"
            defaultValue={
              Array.isArray(ads?.tags)
                ? ads?.tags.map((tag) => ({
                    value: tag.id,
                    label: tag.name,
                  }))
                : [
                    {
                      value: ads?.tags.id,
                      label: ads?.tags.name,
                    },
                  ]
            }
            onChange={(selected) =>
              setSelectedTags(selected as TagsOptionType[])
            }
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

          <button type="submit">Valider les modifications</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Annuler les modifications
          </button>
        </form>
        <img src={ads?.picture} alt={ads?.title} />
      </section>
    </main>
  );
};

export default AdEditForm;
