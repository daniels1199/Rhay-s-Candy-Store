
import { MenuItem } from './types';

export const COLORS = {
  primary: '#5C3D2E',
  secondary: '#E89E7D',
  background: '#FDF1EB',
  accent: '#F97316',
};

export const DELIVERY_FEE = 6.00;

export const PIX_CODE = '00020126360014br.gov.bcb.pix0114+55859841537805204000053039865802BR5911SORA50679376009Sao Paulo610901227-20062230519daqr49730549472216463043E09';

export const MENU_ITEMS: MenuItem[] = [
  // Pastéis
  { id: 'p1', name: 'Misto (Queijo + Presunto + Calabresa)', price: 6.00, category: 'Pastéis' },
  { id: 'p2', name: 'Presunto', price: 6.00, category: 'Pastéis' },
  { id: 'p3', name: 'Calabresa', price: 7.00, category: 'Pastéis' },
  { id: 'p4', name: 'Queijo', price: 7.50, category: 'Pastéis' },
  { id: 'p5', name: 'Carne', price: 8.00, category: 'Pastéis' },
  { id: 'p6', name: 'Frango', price: 8.00, category: 'Pastéis' },
  
  // Batatas
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

  // Dindins Gourmet
  { id: 'd1', name: 'Dindin Chocolate', price: 5.00, category: 'Dindins Gourmet' },
  { id: 'd2', name: 'Dindin M. Morango', price: 5.00, category: 'Dindins Gourmet' },
  { id: 'd3', name: 'Dindin M. Maracujá', price: 5.00, category: 'Dindins Gourmet' },
  { id: 'd4', name: 'Dindin Sensação', price: 6.00, category: 'Dindins Gourmet' },
  { id: 'd5', name: 'Dindin Ninhoresco', price: 5.00, category: 'Dindins Gourmet' },
  { id: 'd6', name: 'Dindin Paçoquita', price: 5.00, category: 'Dindins Gourmet' },
  { id: 'd7', name: 'Dindin Ninho com Nutella', price: 6.00, category: 'Dindins Gourmet' },
  { id: 'd8', name: 'Dindin Chocotella', price: 6.00, category: 'Dindins Gourmet' },
  { id: 'd9', name: 'Dindin Chocomenta', price: 5.00, category: 'Dindins Gourmet' },
  { id: 'd10', name: 'Dindin Coco Branco', price: 5.00, category: 'Dindins Gourmet' },
  { id: 'd11', name: 'Dindin Cappuccino', price: 5.00, category: 'Dindins Gourmet' },
  { id: 'd12', name: 'Dindin Prestígio', price: 6.00, category: 'Dindins Gourmet' },

  // Sobremesas (Baseado na imagem do cardápio)
  { id: 's1', name: 'Cones recheados', price: 9.00, category: 'Sobremesas' },
  { id: 's2', name: 'Bolo no pote', price: 11.90, category: 'Sobremesas' },
  { id: 's3', name: 'Banoffee', price: 10.00, category: 'Sobremesas' },
  { id: 's4', name: 'Delícia de abacaxi', price: 10.00, category: 'Sobremesas' },
  { id: 's5', name: 'Trufa', price: 5.00, category: 'Sobremesas' },
  { id: 's6', name: 'Brigadeiros', price: 3.00, category: 'Sobremesas' },
  { id: 's7', name: 'Brownie box', price: 10.00, category: 'Sobremesas' },
  { id: 's8', name: 'Cookies', price: 10.00, category: 'Sobremesas' },
  { id: 's9', name: 'Fatia Brownie', price: 12.00, category: 'Sobremesas' },
  { id: 's10', name: 'Brownie na marmita', price: 10.00, category: 'Sobremesas' },
  { id: 's11', name: 'Bolo médio', price: 45.90, category: 'Sobremesas' },
  { id: 's12', name: 'Bolo pequeno', price: 16.00, category: 'Sobremesas' },
  { id: 's13', name: 'Mousse', price: 7.00, category: 'Sobremesas' },
];

export const CONTACT_PHONE = '5585996269684';
