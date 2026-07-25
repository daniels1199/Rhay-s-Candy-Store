
import { MenuItem } from './types';

export const STORE_CONFIG = {
  IS_MAINTENANCE: false, // Agora pode ser ativado sem quebrar o preview
  COLORS: {
    primary: '#5C3D2E',
    secondary: '#E89E7D',
    background: '#FDF1EB',
    accent: '#F97316',
  },
  
  DELIVERY_FEE: 6.00,
  PIX_CODE: '00020126360014br.gov.bcb.pix0114+55859962696845204000053039865802BR5911SORA50679376009Sao Paulo610901227-20062230519daqr49730549495139663042905',
  CONTACT_PHONE: '5585996269684',
  MENU_ITEMS: [
    // Pastéis
    { id: 'p1', name: 'Misto (Queijo + Presunto)', price: 8.00, category: 'Pastéis' },
    { id: 'p2', name: 'Presunto', price: 6.00, category: 'Pastéis' },
    { id: 'p3', name: 'Calabresa', price: 7.00, category: 'Pastéis' },
    { id: 'p4', name: 'Queijo', price: 7.50, category: 'Pastéis' },
    { id: 'p5', name: 'Carne', price: 8.00, category: 'Pastéis' },
    { id: 'p6', name: 'Carne (Azeitona + Milho)', price: 10.00, category: 'Pastéis' },
    { id: 'p7', name: 'Frango', price: 8.00, category: 'Pastéis' },
    { id: 'p8', name: 'Frango com queijo', price: 10.00, category: 'Pastéis' },
    
    // Batatas
    { 
      id: 'b1', 
      name: 'Batata Frita Tamanho M', 
      price: 12.00, 
      category: 'Batatas', 
      description: 'Acompanha molhos, calabresa fritinha e parmesão' 
    },
    /*{ 
      id: 'b2', 
      name: 'Batata Frita Tamanho P', 
      price: 8.00, 
      category: 'Batatas', 
      description: 'Acompanha molhos, calabresa fritinha e parmesão' 
    },*/

    // Dindins Gourmet
    { id: 'd1', name: 'Dindin Chocolate', price: 5.00, category: 'Dindins Gourmet' },
    { id: 'd2', name: 'Dindin Mousse de Morango', price: 5.00, category: 'Dindins Gourmet' },
    { id: 'd3', name: 'Dindin Mousse de Maracujá', price: 5.00, category: 'Dindins Gourmet' },
    { id: 'd4', name: 'Dindin Sensação', price: 6.00, category: 'Dindins Gourmet' },
    { id: 'd5', name: 'Dindin Ninhoresco', price: 5.00, category: 'Dindins Gourmet' },
    { id: 'd6', name: 'Dindin Paçoquita', price: 5.00, category: 'Dindins Gourmet' },
    { id: 'd7', name: 'Dindin Ninho com Nutella', price: 6.00, category: 'Dindins Gourmet' },
    { id: 'd8', name: 'Dindin Chocotella', price: 6.00, category: 'Dindins Gourmet' },
    //{ id: 'd9', name: 'Dindin Chocomenta', price: 5.00, category: 'Dindins Gourmet' },
    { id: 'd10', name: 'Dindin Coco Branco', price: 5.00, category: 'Dindins Gourmet' },
    { id: 'd11', name: 'Dindin Cappuccino', price: 6.00, category: 'Dindins Gourmet' },
    { id: 'd12', name: 'Dindin Prestígio', price: 6.00, category: 'Dindins Gourmet' },

    // Doces Finos
    { id: 's1', name: 'Cones recheados', price: 9.00, category: 'Doces Finos', description: 'Ninho com nutella, Chocolate, Duo, Prestígio'},
    { id: 's2', name: 'Bolo no pote', price: 12.90, category: 'Doces Finos', description: 'Chocolatudo, Cenoura com Chocolate, Prestígio, Red com ninho' },
    { id: 's3', name: 'Banoffee', price: 10.90, category: 'Doces Finos' },
    { id: 's4', name: 'Delícia de abacaxi', price: 10.90, category: 'Doces Finos' },
    { id: 's5', name: 'Caixa de Trufas', price: 11.90, category: 'Doces Finos', description: 'Contém 4 unidades, sabores variados.' },
    { id: 's6', name: 'Trufa tradicional', price: 5.00, category: 'Doces Finos', description: 'Limão, Chocolate, Duo, Beijinho, Ninho com nutella'},
    { id: 's7', name: 'Brigadeiros', price: 3.00, category: 'Doces Finos' },
    { id: 's8', name: 'Brownie box', price: 10.00, category: 'Doces Finos' },
    { id: 's9', name: 'Cookies', price: 10.00, category: 'Doces Finos' },
    { id: 's10', name: 'Fatia Brownie', price: 12.00, category: 'Doces Finos' },
    { id: 's11', name: 'Brownie na marmita', price: 11.90, category: 'Doces Finos' },
    { id: 's12', name: 'Bolo tradicional', price: 44.90, category: 'Doces Finos' },
    { id: 's13', name: 'Bolo baby', price: 16.00, category: 'Doces Finos' },
    { id: 's14', name: 'Mousse', price: 7.00, category: 'Doces Finos' },
  ] as MenuItem[],
};
