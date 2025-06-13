import Link from "next/link";
import Image from "next/image";

import { cn, formatCurrency } from "@/lib/utils";

interface CheckoutItemProps {
  isLast?: boolean;
  imageUrl?: string | null;
  name: string;
  description?: string | null;
  productUrl: string;
  tenantUrl: string;
  tenantName: string;
  price: number;
  onRemove: () => void;
}

export const CheckoutItem = ({
  isLast,
  imageUrl,
  name,
  description,
  productUrl,
  price,
  onRemove,
}: CheckoutItemProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b",
        isLast && "border-b-0"
      )}
    >
      <div className="overflow-hidden border-r">
        <div className="relative aspect-square h-full">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="py-4 flex flex-col justify-between">
        <div>
          <Link href={productUrl}>
            <h4 className="font-bold">{name}</h4>
          </Link>
            <h4 className="font-light text-gray-600">{description}</h4>
        </div>
      </div>

      <div className="py-4 flex flex-col justify-between">
        <p className="font-medium">{formatCurrency(price)}</p>
        <button
          className="font-medium cursor-pointer text-red-600"
          onClick={onRemove}
          type="button"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
