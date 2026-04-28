
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  category: 'Pastéis' | 'Batatas' | 'Dindins Gourmet' | 'Sobremesas';
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
