import { useForm } from "react-hook-form";
import { resolver } from "../validators/addProductValidators";
import { AddProductFormValues } from "../types/AddProductFormValues";
import FormInput from "./FormInput";
import { useCategory } from "../hooks/useCategory";
import { addProduct } from "../api/productApi";
import { prepareFormData } from "../utils/prepareFormData";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProductFormValues>({ resolver });

  // what happens when the form is submitted.
  const onSubmit = handleSubmit(async data => {
    try {
      const formData = prepareFormData(data);
      await addProduct(formData);
    } catch (err) {
      console.error(err);
    }
  });

  // Get the categories using a custom hook
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
        <FormInput
          register={register("categoryId")}
          name="categoryId"
          label="Category Name"
          type="select"
          selectOptions={catagories}
          error={!!errors.categoryId}
          helperText={errors.categoryId?.message}
        />
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
