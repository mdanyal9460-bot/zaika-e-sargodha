export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  isActive: boolean;
}

export interface MenuCategory {
  categoryId: string;
  categoryName: string;
  items: MenuItem[];
}
