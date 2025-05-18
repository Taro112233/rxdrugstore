import { Button } from "@/components/ui/button";
import { Category } from "@/payload-types";

interface Props {
    category: Category;
    isActive?: boolean;
    isNavigationHover?: boolean;
};

export const CategoryDropdown = ({ 
    category, 
    isActive, 
    isNavigationHover 
}: Props) => {
    return (
        <Button variant="elevated">
            {category.name}
        </Button>
    )
}