export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

export interface MenuCategory {
  categoryId: string;
  categoryName: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    categoryId: "main-course",
    categoryName: "Main Course",
    items: [
      { id: "mc-1", name: "Homestyle Bhindi Chicken", price: 399 },
      { id: "mc-2", name: "Special Karhi Pakora", price: 290 },
      { id: "mc-3", name: "Shahi Hyderabadi Biryani", price: 370 },
      { id: "mc-4", name: "Economy Biryani Deal", price: 549 },
      { id: "mc-5", name: "Aloo Chicken Shorba", price: 340 },
      { id: "mc-6", name: "Fried Dal Mash", price: 299 },
      { id: "mc-7", name: "Lahori White Chana", price: 249 },
      { id: "mc-8", name: "Veg Thali", price: 349 },
      { id: "mc-9", name: "Chicken Korma", price: 449 },
      { id: "mc-10", name: "Chicken Karela", price: 399 },
      { id: "mc-11", name: "Beef Korma", price: 499 },
      { id: "mc-12", name: "Mung Masri Dal", price: 299 },
      { id: "mc-13", name: "Chicken Karahi", price: 499 },
      { id: "mc-14", name: "Desi Aloo Palak", price: 199 }
    ]
  },
  {
    categoryId: "paratha-rolls",
    categoryName: "Paratha & Rolls",
    items: [
      { id: "pr-1", name: "Classic Aloo Paratha", price: 180 },
      { id: "pr-2", name: "Anda Paratha Roll", price: 199 },
      { id: "pr-3", name: "Plain Tawa Paratha", price: 69 },
      { id: "pr-4", name: "Aloo Chicken Paratha", price: 199 }
    ]
  },
  {
    categoryId: "sides",
    categoryName: "Sides",
    items: [
      { id: "sd-1", name: "Shami Kabab", price: 80 },
      { id: "sd-2", name: "Fresh Home Roti (Foil Packed)", price: 30 },
      { id: "sd-3", name: "Special Zeera Raita", price: 29 }
    ]
  },
  {
    categoryId: "fast-food",
    categoryName: "Fast Food",
    items: [
      { id: "ff-1", name: "Shami Burger", price: 199 }
    ]
  },
  {
    categoryId: "beverages",
    categoryName: "Beverages",
    items: [
      { id: "bev-1", name: "Muree Sparkletts-300ml", price: 100 }
    ]
  },
  {
    categoryId: "deals",
    categoryName: "Deals",
    items: [
      { id: "dl-1", name: "Deal 1 (Plain Paratha + Raita)", price: 99 },
      { id: "dl-2", name: "Deal 2 (Aloo Paratha + Raita)", price: 199 }
    ]
  },
  {
    categoryId: "cutlery",
    categoryName: "Cutlery",
    items: [
      { id: "cut-1", name: "Disposable Fork", price: 10 },
      { id: "cut-2", name: "Disposable Spoon", price: 10 }
    ]
  },
  {
    categoryId: "desserts",
    categoryName: "Desserts",
    items: [
      { id: "des-1", name: "Special Sugi ka Halwa", price: 200 }
    ]
  }
];
