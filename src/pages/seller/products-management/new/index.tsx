import { MultipleImageUpload } from "@/components/imageUpload";
import { SellerSideLayout } from "@/components/SellerSideLayout";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Products } from "..";

export default function NewProductPage() {
  const defaultProduct = { id: 1, name: "", inStock: true, quantity: 0 };
  const router = useRouter();
  const [newProduct, setNewProduct] = useState<Products>(defaultProduct);
  const formSchema = z.object({
    productName: z
      .string()
      .min(5, { message: "Product Name must contain at least 5 characters." })
      .max(100, { message: "Product Name is too long." }),
    price: z.number(),
    description: z.string(),
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

  return (
    <SellerSideLayout>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <h1 className="text-3xl font-medium my-3 pb-3">Create New Product</h1>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() => router.push("/seller/products-management")}
              className="flex shrink-0 bg-[#586E86] text-white px-3 py-1 rounded-md items-center"
            >
              <div className="mr-1 text-2xl">+</div>
              <div className="text-sm">Save</div>
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
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <p className=" text-black font-bold text-base">SKU</p>
                        <Input placeholder="Eg.CW1100" />
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
                      onChange={(value: string) => field.onChange(value)}
                    />
                  </FormItem>
                )}
              />
              <div className="mt-4 flex gap-4">
                <div className="w-[50%]">
                  <p className="text-xl pb-2">Size</p>
                </div>
                <div className="w-[50%]">
                  <h1>Color</h1>
                </div>
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="inStock"
                />
              </div>
            </div>
            <div className="w-[30%] max-sm:hidden">
              <MultipleImageUpload />
            </div>
          </div>
          <div className=" bg-white p-5 rounded-md sm:w-[70%] w-full mt-4 flex justify-between">
            <div className="flex w-full justify-between gap-5 pb-3 max-md:flex-col">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <p className=" text-black font-bold text-base">Price</p>
                      <Input
                        placeholder="10000 MMK"
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
                <div className="w-[80%]">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <p className=" text-black font-bold text-base">SKU</p>
                        <div className="flex w-full">
                          <Input placeholder="10 %" className="w-full" />
                          <Button>$</Button>
                          <Button>%</Button>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </SellerSideLayout>
  );
}
