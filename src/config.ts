
import { MenuItem } from './types';

export const STORE_CONFIG = {
  IS_MAINTENANCE: false, // Agora pode ser ativado sem quebrar o preview
  COLORS: {
    primary: '#5C3D2E',
    secondary: '#E89E7D',
    background: '#FDF1EB',
    accent: '#F97316',
  },
  
  DELIVERY_FEE: 0.00,
  PIX_CODE: '00020126360014br.gov.bcb.pix0114+55859962696845204000053039865802BR5911SORA50679376009Sao Paulo610901227-20062230519daqr49730549495139663042905',
  CONTACT_PHONE: '5585996269684',
  CATEGORY_IMAGES: {
    'Pastéis': '/assets/aistudio/WhatsApp_Image_2026-11-12_at_18.57.59_8dfb4087.jpeg',
    'Batatas': '/assets/aistudio/WhatsApp_Image_2026-11-12_at_18.58.00_3942d3a9.jpeg',
    'Doces Finos': '/assets/aistudio/WhatsApp_Image_2026-11-12_at_18.57.59__1__cfb101fc.jpeg',
  } as Record<string, string>,
  MENU_ITEMS: [
    // Pastéis
    { id: 'p4', name: 'Queijo', price: 9.90, category: 'Pastéis' },
    { id: 'p9', name: 'Mistão', price: 11.90, category: 'Pastéis' },
    { id: 'p10', name: 'Pizza', price: 9.90, category: 'Pastéis' },
    { id: 'p5', name: 'Carne', price: 11.90, category: 'Pastéis' },
    { id: 'p1', name: 'Misto', price: 9.90, category: 'Pastéis' },
    { id: 'p3', name: 'Calabresa', price: 9.90, category: 'Pastéis' },
    { id: 'p7', name: 'Frango', price: 11.90, category: 'Pastéis' },
    
    // Batatas
    { 
      id: 'b1', 
      name: 'Batata Frita', 
      price: 12.00, 
      category: 'Batatas', 
      description: 'Acompanha calabresa fritinha e parmesão.'
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
    { id: 's1', name: 'Cone trufado', price: 9.00, category: 'Doces Finos', description: 'Ninho, Duo, Chocolate, Ninho com nutella' },
    { id: 's5', name: 'Caixa de Trufas', price: 11.90, category: 'Doces Finos', description: 'Contém 4 unidades, sabores variados.' },
    { id: 's6', name: 'Trufas', price: 5.00, category: 'Doces Finos', description: 'Consultar sabores disponíveis.' },
    { id: 's7', name: 'Brigadeiros gourmet', price: 3.00, category: 'Doces Finos', description: 'Conferir sabores na hora do pedido.' },
    { id: 's9', name: 'Cookies', price: 12.00, category: 'Doces Finos' },
    { id: 's12', name: 'Bolo tradicional', price: 44.90, category: 'Doces Finos' },
    { id: 's13', name: 'Mini bolinho', price: 16.00, category: 'Doces Finos', description: 'Red velvet, Chocolatudo, Choconinho' },
    { id: 's15', name: 'Bombom de uva', price: 10.00, category: 'Doces Finos', description: 'Com duas camadas de recheio e uvas verdes.'},

    // Sobremesas
    { id: 's3', name: 'Banoffee', price: 10.90, category: 'Sobremesas' },
    { id: 's4', name: 'Delícia de abacaxi', price: 10.90, category: 'Sobremesas' },
    { id: 's14', name: 'Mousse', price: 8.00, category: 'Sobremesas' },
    { id: 's16', name: 'Pudim', price: 10.00, category: 'Sobremesas' },
    { id: 's2', name: 'Bolo no pote', price: 12.90, category: 'Sobremesas', description: 'Chocolatudo, Cenoura com Chocolate, Prestígio, Red com ninho' },
    { id: 's8', name: 'Brownie in box', price: 10.00, category: 'Sobremesas', description: 'Brigadeiro de chocolate e ninho' },
    { id: 's10', name: 'Fatia Brownie', price: 12.00, category: 'Sobremesas' },
    { id: 's11', name: 'Brownie na marmita', price: 11.90, category: 'Sobremesas' },

    // Bebidas
    { id: 'beb1', name: 'Coca-cola mini pet', price: 3.50, category: 'Bebidas' },
    { id: 'beb2', name: 'Fanta uva mini pet', price: 3.50, category: 'Bebidas' },
    { id: 'beb3', name: 'Água mineral (com gás)', price: 3.50, category: 'Bebidas' },
    { id: 'beb4', name: 'Água mineral (sem gás)', price: 3.00, category: 'Bebidas' },
    { id: 'beb5', name: 'Suco 300 ml', price: 5.00, category: 'Bebidas' },
    { id: 'beb6', name: 'Coca-Cola (lata)', price: 6.00, category: 'Bebidas' },
    { id: 'beb7', name: 'Fanta uva/laranja (lata)', price: 6.00, category: 'Bebidas' },
    { id: 'beb8', name: 'Cajuína São Geraldo (lata)', price: 6.00, category: 'Bebidas' },
  ] as MenuItem[],
};
