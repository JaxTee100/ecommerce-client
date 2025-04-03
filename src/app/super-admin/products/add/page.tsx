"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useProductStore } from "@/store/useProductStore";
import { toast } from "sonner";
import { protectProductFormAction } from "@/actions/product";

interface FormState {
  name: string;
  brand: string;
  description: string;
  category: string;
  gender: string;
  price: number;
  stock: number;
}

function SuperAdminManageProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuperAdminManageProductPageContent />
    </Suspense>
  );
}

function SuperAdminManageProductPageContent() {
  const searchParams = useSearchParams();
  const getCurrentEditedProductId = searchParams.get("id");
  const isEditMode = !!getCurrentEditedProductId;

  const router = useRouter();
  const { createProduct, updateProduct, getProductById } = useProductStore();

  const [formState, setFormState] = useState<FormState>({
    name: "",
    brand: "",
    description: "",
    category: "",
    gender: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    if (isEditMode) {
      getProductById(getCurrentEditedProductId).then((product) => {
        if (product) {
          setFormState({
            name: product.name,
            brand: product.brand,
            description: product.description,
            category: product.category,
            gender: product.gender,
            price: product.price,
            stock: product.stock,
          });
        }
      });
    }
  }, [isEditMode, getCurrentEditedProductId, getProductById]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const checkFirstLevelFormSanitization = await protectProductFormAction();
    if (!checkFirstLevelFormSanitization.success) {
      toast.error(checkFirstLevelFormSanitization.error);
      return;
    }

    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result = isEditMode
      ? await updateProduct(getCurrentEditedProductId, formData)
      : await createProduct(formData);

    if (!result) {
      toast.error("Something went wrong");
      return;
    }

    router.push("/super-admin/products/list");
    toast.success("Product saved successfully");
  };

  return (
    <div className="p-6">
      <header className="flex items-center justify-between">
        <h1>{isEditMode ? "Edit Product" : "Add Product"}</h1>
      </header>
      <form onSubmit={handleFormSubmit} className="grid gap-6">
        <div>
          <label>Product Name</label>
          <input
            name="name"
            placeholder="Product Name"
            className="mt-1.5"
            onChange={handleInputChange}
            value={formState.name}
          />
        </div>
        <button type="submit">Save Product</button>
      </form>
    </div>
  );
}

export default SuperAdminManageProductPage;
