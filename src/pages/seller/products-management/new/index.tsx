import { MultipleImageUpload } from "@/components/imageUpload";
import { SellerSideLayout } from "@/components/SellerSideLayout";
import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Products } from "..";

export default function NewProductPage() {
  const defaultProduct = {
    id: 1,
    name: "",
    sku: "",
    price: 0,
    description: "",
    publish: true,
    quantity: 0,
  };
  const router = useRouter();
  const [newProduct, setNewProduct] = useState<Products>(defaultProduct);
  const formSchema = z.object({
    productName: z
      .string()
      .min(5, { message: "Product Name must contain at least 5 characters." })
      .max(100, { message: "Product Name is too long." }),
    sku: z
      .string()
      .min(1, { message: "SKU must contain at least one character." }),
    description: z.string(),
    price: z.number(),
    publish: z.boolean(),
    quantity: z.number(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      productName: "",
      price: 0,
      description: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const sizes = [
    { id: 1, size: "XS" },
    { id: 2, size: "S" },
    { id: 3, size: "M" },
    { id: 4, size: "L" },
    { id: 5, size: "XL" },
    { id: 6, size: "XXL" },
    { id: 7, size: "XXXL" },
  ];

  return (
    <SellerSideLayout>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between h-[100%]">
          <h1 className="text-3xl font-medium my-3 pb-3">Create New Product</h1>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() =>
                router.push("/seller/products-management/new/options")
              }
              className="flex shrink-0 bg-[#586E86] text-white px-3 py-1 rounded-md items-center"
            >
              <div className="mr-1 text-2xl">+</div>
              <div className="text-sm">Next</div>
            </button>
          </Box>
        </div>
        <div>
          <div className="flex sm:gap-2 justify-between w-full max-md:flex-col">
            <div className=" bg-white p-5 rounded-md sm:w-[70%] w-full">
              <div className="flex w-full justify-between gap-5 pb-3 max-md:flex-col">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <p className=" text-black font-bold text-base">
                          Product Name
                        </p>
                        <Input
                          placeholder="Eg.Short Sleeve wool shirt"
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              name: e.target.value,
                            })
                          }
                        />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <p className=" text-black font-bold text-base">SKU</p>
                        <Input
                          placeholder="Eg.CW1100"
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              sku: e.target.value,
                            })
                          }
                        />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <p className=" text-black font-bold text-base">
                      Description
                    </p>
                    <RichTextEditor
                      content={field.value}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e,
                        })
                      }
                    />
                  </FormItem>
                )}
              />
              <div className="flex-col justify-between gap-5 mt-3">
                <div className="flex w-full justify-between gap-5 pb-3 max-md:flex-col">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <p className=" text-black font-bold text-base">
                            Price
                          </p>
                          <Input
                            placeholder="10000 MMK"
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                price: Number(e.target.value),
                              })
                            }
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <p className=" text-black font-bold text-base">
                            Quantity
                          </p>
                          <Input
                            placeholder="10"
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                quantity: Number(e.target.value),
                              })
                            }
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className=" text-black font-bold text-base mt-2">Size</p>
                  <div className="grid grid-cols-10 gap-2 py-2">
                    {sizes.map((item) => (
                      <Button variant="outline" key={item.id} className="flex">
                        {item.size}
                      </Button>
                    ))}
                  </div>
                </div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Publish"
                />
              </div>
            </div>
            <div className="w-[30%] max-sm:hidden">
              <MultipleImageUpload />
            </div>
          </div>
        </div>
      </form>
    </SellerSideLayout>
  );
}
