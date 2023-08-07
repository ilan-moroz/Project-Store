import { useForm } from "react-hook-form";
import { resolver } from "../validators/addProductValidators";
import { AddProductFormValues } from "../types/AddProductFormValues";
import FormInput from "./FormInput";
import { useCategory } from "../hooks/useCategory";
import { MenuItem, TextField } from "@mui/material";
import { Category } from "../models/Category";
import { addProduct } from "../api/productApi";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProductFormValues>({ resolver });

  const prepareFormData = (data: any) => {
    const formData = new FormData();
    formData.append("categoryId", data.categoryId);
    formData.append("productName", data.productName);
    formData.append("price", data.price);
    formData.append(
      "imagePath",
      typeof data.imagePath === "string" ? data.imagePath : data.imagePath[0]
    );
    return formData;
  };

  // what happens when the form is submitted.
  const onSubmit = handleSubmit(async data => {
    try {
      const formData = prepareFormData(data);
      await addProduct(formData);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  });

  const catagories = useCategory();

  return (
    <div className="addProduct">
      <form onSubmit={onSubmit}>
        <FormInput
          register={register("productName")}
          name="productName"
          label="Product Name"
          type="text"
          error={!!errors.productName}
          helperText={errors.productName?.message}
        />
        <TextField
          {...register("categoryId")}
          name="categoryId"
          select
          label="Category Name"
          variant="outlined"
          fullWidth
          defaultValue=""
          sx={{ marginBottom: "1.5rem" }}
        >
          {catagories.map((category: Category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.categoryName}
            </MenuItem>
          ))}
        </TextField>
        <FormInput
          register={register("price")}
          name="price"
          label="Price"
          type="number"
          error={!!errors.price}
          helperText={errors.price?.message}
        />
        <FormInput
          register={register("imagePath")}
          name="imagePath"
          label=""
          type="file"
          error={!!errors.imagePath}
          helperText={errors.imagePath?.message}
        />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AddProduct;
