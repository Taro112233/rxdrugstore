import { formatCurrency } from "@/lib/utils";

interface CheckoutSidebarProps {
    total?: number;
    onCheckout: () => void;
    isCanceled?: boolean;
    isPending?: boolean;
}

export const CheckoutSidebar = ({
    total,
    onCheckout,
    isCanceled,
    isPending,
}: CheckoutSidebarProps) => {
    return (
        <div className="border rounded-md overflow-hidden bg-white flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
                <h4 className="font-medium text-lg">Total</h4>
                <p className="font-medium text-lg">
                    {formatCurrency(total)}
                </p>
            </div>

        </div>
    )
})