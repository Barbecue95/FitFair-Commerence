import { SellerSideLayout } from "@/components/SellerSideLayout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Tiptap from "@/components/ui/Tiptap";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { Roboto } from "next/font/google";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500"] });

export default function NewProductPage() {
  const formSchema = z.object({
    title: z
      .string()
      .min(5, { message: "The tile is not long enough" })
      .max(100, { message: "The title is too long." }),
    price: z.number().min(5, { message: "Price must be number" }),
    description: z.string().trim(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      price: 0,
      description: "",
    },
  });
  const router = useRouter();
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
      <Form {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Eg.Short sleeve wool shirt" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Tiptap description={field.name} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </SellerSideLayout>
  );
}
