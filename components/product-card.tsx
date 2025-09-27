"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/context/cart-store";
import Image from "next/image";

export type Product = {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  rating?: number;
  [key: string]: any;
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const productId = product.id || product._id; // ✅ safe fallback

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-0">
        <Link href={`/products/${productId}`} className="block">
          <div className="relative aspect-square w-full overflow-hidden rounded-t-md bg-muted">
            {product.image ? (
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover"
              />
            ) : (
              <img
                alt={product.title}
                className="h-full w-full object-cover"
                src="/product-image-placeholder.png"
              />
            )}
          </div>
        </Link>
      </CardHeader>

      <CardContent className="flex-1 space-y-1 p-4">
        <Link href={`/products/${productId}`}>
          <CardTitle className="line-clamp-2">
            {product.title || product.name}
          </CardTitle>
        </Link>
        <CardDescription className="line-clamp-2">
          {product.description || ""}
        </CardDescription>
        <p className="font-semibold">
          ${product.price?.toFixed?.(2) ?? product.price}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => addItem(product, 1)}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
