
import { MenuItem } from './types';

export const COLORS = {
  primary: '#5C3D2E',
  secondary: '#E89E7D',
  background: '#FDF1EB',
  accent: '#F97316',
};

export const MENU_ITEMS: MenuItem[] = [
  { id: 'p1', name: 'Misto (Queijo + Presunto + Calabresa)', price: 6.00, category: 'Pastéis' },
  { id: 'p2', name: 'Presunto', price: 6.00, category: 'Pastéis' },
  { id: 'p3', name: 'Calabresa', price: 7.00, category: 'Pastéis' },
  { id: 'p4', name: 'Queijo', price: 7.50, category: 'Pastéis' },
  { id: 'p5', name: 'Carne', price: 8.00, category: 'Pastéis' },
  { id: 'p6', name: 'Frango', price: 8.00, category: 'Pastéis' },
  { 
    id: 'b1', 
    name: 'Batata Frita Tamanho M', 
    price: 10.00, 
    category: 'Batatas', 
    description: 'Acompanha molhos, calabresa fritinha e parmesão' 
  },
  { 
    id: 'b2', 
    name: 'Batata Frita Tamanho P', 
    price: 8.00, 
    category: 'Batatas', 
    description: 'Acompanha molhos, calabresa fritinha e parmesão' 
  },
];

export const CONTACT_PHONE = '5585996269684';
