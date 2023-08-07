import { useForm } from "react-hook-form";
import { resolver } from "../validators/addProductValidators";
import { AddProductFormValues } from "../types/AddProductFormValues";
import FormInput from "./FormInput";
import { useCategory } from "../hooks/useCategory";
import { MenuItem, TextField } from "@mui/material";
import { Category } from "../models/Category";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProductFormValues>({ resolver });

  // what happens when the form is submitted.
  const onSubmit = handleSubmit(async data => {
    console.log(data);
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
          {catagories.map((option: Category, index) => (
            <MenuItem key={index} value={option._id}>
              {option.categoryName}
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
