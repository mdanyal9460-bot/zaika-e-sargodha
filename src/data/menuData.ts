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
      { id: "mc-1", name: "Homestyle Bhindi Chicken", price: 399, image: "/hero.png", description: "Authentic homemade style bhindi cooked with tender chicken." },
      { id: "mc-2", name: "Special Karhi Pakora", price: 290, image: "/hero.png", description: "Traditional yogurt and gram flour curry with crispy pakoras." },
      { id: "mc-3", name: "Shahi Hyderabadi Biryani", price: 370, image: "/biryani.png", description: "Aromatic basmati rice cooked with tender chicken pieces and secret spices." },
      { id: "mc-4", name: "Economy Biryani Deal", price: 549, image: "/biryani.png", description: "Perfect portion of our signature biryani for a hearty meal." },
      { id: "mc-5", name: "Aloo Chicken Shorba", price: 340, image: "/hero.png", description: "Classic chicken and potato curry with a rich, flavorful broth." },
      { id: "mc-6", name: "Fried Dal Mash", price: 299, image: "/hero.png", description: "Premium white lentils tempered with garlic and traditional spices." },
      { id: "mc-7", name: "Lahori White Chana", price: 249, image: "/hero.png", description: "Authentic Lahori style chickpea curry." },
      { id: "mc-8", name: "Veg Thali", price: 349, image: "/hero.png", description: "Assortment of fresh seasonal vegetables and lentils." },
      { id: "mc-9", name: "Chicken Korma", price: 449, image: "/hero.png", description: "Rich, creamy chicken curry made with yogurt and premium spices." },
      { id: "mc-10", name: "Chicken Karela", price: 399, image: "/hero.png", description: "Bitter gourd and chicken cooked to perfection." },
      { id: "mc-11", name: "Beef Korma", price: 499, image: "/hero.png", description: "Tender beef pieces in a rich, aromatic gravy." },
      { id: "mc-12", name: "Mung Masri Dal", price: 299, image: "/hero.png", description: "Comforting blend of yellow and red lentils." },
      { id: "mc-13", name: "Chicken Karahi", price: 499, image: "/karahi.png", description: "Street-style chicken cooked with tomatoes and green chilies." },
      { id: "mc-14", name: "Desi Aloo Palak", price: 199, image: "/hero.png", description: "Fresh spinach and potatoes cooked with traditional spices." }
    ]
  },
  {
    categoryId: "paratha-rolls",
    categoryName: "Paratha & Rolls",
    items: [
      { id: "pr-1", name: "Classic Aloo Paratha", price: 180, image: "/hero.png" },
      { id: "pr-2", name: "Anda Paratha Roll", price: 199, image: "/hero.png" },
      { id: "pr-3", name: "Plain Tawa Paratha", price: 69, image: "/hero.png" },
      { id: "pr-4", name: "Aloo Chicken Paratha", price: 199, image: "/hero.png" }
    ]
  },
  {
    categoryId: "sides",
    categoryName: "Sides",
    items: [
      { id: "sd-1", name: "Shami Kabab", price: 80, image: "/hero.png" },
      { id: "sd-2", name: "Fresh Home Roti (Foil Packed)", price: 30, image: "/hero.png" },
      { id: "sd-3", name: "Special Zeera Raita", price: 29, image: "/hero.png" }
    ]
  },
  {
    categoryId: "fast-food",
    categoryName: "Fast Food",
    items: [
      { id: "ff-1", name: "Shami Burger", price: 199, image: "/hero.png" }
    ]
  },
  {
    categoryId: "beverages",
    categoryName: "Beverages",
    items: [
      { id: "bev-1", name: "Muree Sparkletts-300ml", price: 100, image: "/hero.png" }
    ]
  },
  {
    categoryId: "deals",
    categoryName: "Deals",
    items: [
      { id: "dl-1", name: "Deal 1 (Plain Paratha + Raita)", price: 99, image: "/hero.png" },
      { id: "dl-2", name: "Deal 2 (Aloo Paratha + Raita)", price: 199, image: "/hero.png" }
    ]
  },
  {
    categoryId: "cutlery",
    categoryName: "Cutlery",
    items: [
      { id: "cut-1", name: "Disposable Fork", price: 10, image: "/hero.png" },
      { id: "cut-2", name: "Disposable Spoon", price: 10, image: "/hero.png" }
    ]
  },
  {
    categoryId: "desserts",
    categoryName: "Desserts",
    items: [
      { id: "des-1", name: "Special Sugi ka Halwa", price: 200, image: "/hero.png" }
    ]
  }
];
