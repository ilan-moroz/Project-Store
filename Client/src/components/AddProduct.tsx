import { useForm } from "react-hook-form";
import { resolver } from "../validators/addProductValidators";
import { AddProductFormValues } from "../types/AddProductFormValues";
import FormInput from "./FormInput";
import { useCategory } from "../hooks/useCategory";
import { addProductApi } from "../api/productApi";
import { prepareFormData } from "../utils/prepareFormData";
import Button from "./Button/Button";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productSlice";
import { useProductState } from "../hooks/useProductState";
import React from "react";

const AddProduct = () => {
  // check if there product to edit
  const { productToEdit } = useProductState();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<AddProductFormValues>({ resolver });
  const dispatch = useDispatch();

  // what happens when the form is submitted.
  const onSubmit = handleSubmit(async data => {
    if (!productToEdit) {
      try {
        const formData = prepareFormData(data);
        const response = await addProductApi(formData);
        if (response) dispatch(addProduct(response));
        reset();
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
      } catch (err) {
        console.error(err);
      }
    }
  });

  // Get the categories using a custom hook
  const catagories = useCategory();

  React.useEffect(() => {
    if (productToEdit) {
      setValue("productName", productToEdit.productName);
      setValue("price", productToEdit.price);
      setValue("categoryId", productToEdit.categoryId);
      setValue("imagePath", productToEdit.imagePath);
    }
  }, [productToEdit, setValue]);

  return (
    <div
      className="addProduct"
      style={{
        textAlign: "center",
        width: "80%",
        margin: "0 auto",
      }}
    >
      <form onSubmit={onSubmit}>
        <FormInput
          register={register("productName")}
          name="productName"
          label="Product Name"
          type="text"
          error={!!errors.productName}
          helperText={errors.productName?.message}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormInput
          name="categoryId"
          label="Category Name"
          type="select"
          control={control}
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
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormInput
          register={register("imagePath")}
          name="imagePath"
          label={
            productToEdit
              ? "Select new image or leave it empty"
              : "Product image"
          }
          type="file"
          error={!!errors.imagePath}
          helperText={errors.imagePath?.message}
        />
        <div className="login__form--buttons">
          <Button
            type="submit"
            text={productToEdit ? "edit product" : "add product"}
            color=" rgb(103, 32, 180)"
          />
          <Button type="reset" text="cancel" color=" rgb(109, 112, 104)" />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
