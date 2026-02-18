
import React, { useState, useCallback, useEffect } from 'react';
import { STORE_CONFIG } from './config';
import { MenuItem, CartItem } from './types';
import ItemCard from './components/ItemCard';
import Cart from './components/Cart';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Redirecionamento para 404 se em manutenção
  if (STORE_CONFIG.IS_MAINTENANCE) {
    window.location.replace('/404.html');
    return null;
  }

  const addToCart = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const categories = ['Pastéis', 'Batatas', 'Dindins Gourmet', 'Sobremesas'] as const;
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartTotal = cart.length > 0 ? subtotal + STORE_CONFIG.DELIVERY_FEE : 0;
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen pb-32 bg-[#FDF1EB]">
      <header className="bg-white px-4 py-8 text-center shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl -z-10 opacity-30"></div>
        <div className="flex flex-col items-center mb-4 scale-90 sm:scale-100">
          <div className="w-32 h-32 mb-2 transition-transform hover:scale-105 duration-500">
            <svg viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
              <path d="M74 2C74 2 74 12 70 20" stroke="#5C3D2E" strokeWidth="8" strokeLinecap="round"/>
              <path d="M70 20C20 45 20 135 70 155" fill="#E67E22" stroke="#5C3D2E" strokeWidth="5" strokeLinejoin="round"/>
              <path d="M70 20C120 45 120 135 70 155" fill="#F39C12" stroke="#5C3D2E" strokeWidth="5" strokeLinejoin="round"/>
              <path d="M70 20C45 45 45 135 70 155" fill="#D35400" stroke="#5C3D2E" strokeWidth="5" strokeLinejoin="round"/>
              <path d="M70 20C95 45 95 135 70 155" fill="#FFB142" stroke="#5C3D2E" strokeWidth="5" strokeLinejoin="round"/>
              <path d="M70 20V155" stroke="#5C3D2E" strokeWidth="5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="brand-font text-5xl text-[#5C3D2E]">Rhay's</h1>
          <p className="uppercase tracking-widest font-bold text-[#5C3D2E] text-xl -mt-1">candy store</p>
        </div>
        <div className="w-24 h-1 bg-[#E89E7D] mx-auto rounded-full mt-6"></div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-[#5C3D2E] relative inline-block">
            Cardápio
            <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-[#E89E7D]/30 rounded-full"></span>
          </h2>
          <div className="text-xs font-bold text-[#E89E7D] flex items-center gap-2">
            <i className="fas fa-motorcycle"></i>
            ENTREGA EM TODA REGIÃO
          </div>
        </div>

        {categories.map((category) => (
          <section key={category} className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xl font-bold text-[#5C3D2E] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-[#E89E7D] rounded-full"></span>
                {category}
              </h3>
              <div className="flex-grow h-px bg-orange-100"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {STORE_CONFIG.MENU_ITEMS.filter((item) => item.category === category).map((item) => (
                <ItemCard key={item.id} item={item} onAdd={addToCart} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <div className="fixed bottom-6 left-0 right-0 flex justify-center px-6 pointer-events-none z-40">
        <button onClick={() => setIsCartOpen(true)} className="pointer-events-auto bg-[#5C3D2E] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 hover:bg-[#4a3125] transition-all transform active:scale-95 group max-w-md w-full sm:w-auto">
          <div className="relative">
            <i className="fas fa-shopping-basket text-xl"></i>
            {cartCount > 0 && <span className="absolute -top-3 -right-3 bg-[#E89E7D] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#5C3D2E] animate-bounce">{cartCount}</span>}
          </div>
          <div className="flex flex-col items-start leading-none text-left">
            <span className="font-bold tracking-wide uppercase text-xs opacity-70">{cartCount > 0 ? 'Concluir Pedido' : 'Meu Carrinho'}</span>
            {cartCount > 0 && <span className="text-lg font-black tracking-tight">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>}
          </div>
          <i className="fas fa-chevron-right text-xs opacity-50 group-hover:translate-x-1 transition-transform ml-2"></i>
        </button>
      </div>

      <Cart items={cart} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default App;
