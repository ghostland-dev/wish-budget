export interface WishlistItem {
  id: string;
  name: string;
  category: string;
  price: number;
  link?: string;
  imageUrl?: string;
  purchased: boolean;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Budget {
  total: number;
  remaining: number;
  spent: number;
}