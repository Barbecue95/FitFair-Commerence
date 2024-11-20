import { MultipleImageUpload } from "@/components/imageUpload";
import { SellerSideLayout } from "@/components/SellerSideLayout";
import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { Roboto } from "next/font/google";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500"] });

export default function NewProductPage() {
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
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <SellerSideLayout>
      <div className="sm:flex sm:justify-between">
        <h1 className={`${roboto.className} text-3xl font-medium my-3 pb-3`}>
          Create a New Product
        </h1>
        <Box>
          <button
            onClick={() => router.push("/seller/products-management")}
            className="flex shrink-0 bg-[#586E86] text-white px-3 py-1 rounded-md items-center"
          >
            <div className="mr-1 text-2xl">+</div>
            <div className="text-sm">New Product</div>
          </button>
        </Box>
      </div>
      <div className="flex gap-2 justify-between w-full max-md:flex-col">
        <div className=" py-5 bg-white p-5 rounded-md w-[70%]">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full justify-between gap-5 pb-3">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <p className=" text-black font-bold text-base">
                        Product Name
                      </p>
                      <Input placeholder="Eg.Short Sleeve wool shirt" />
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
                  <p className=" text-black font-bold text-base">Description</p>
                  <RichTextEditor
                    content={field.value}
                    onChange={(value: string) => field.onChange(value)}
                  />
                </FormItem>
              )}
            />

            <Button className="mt-4">Submit</Button>
          </form>
        </div>
        <div className="w-[30%]">
          <MultipleImageUpload />
        </div>
      </div>
    </SellerSideLayout>
  );
}
