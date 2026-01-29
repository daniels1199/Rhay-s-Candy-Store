
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
// Added CONTACT_PHONE to the imports from './constants'
import { MENU_ITEMS, CONTACT_PHONE } from './constants';
import { MenuItem, CartItem } from './types';
import ItemCard from './components/ItemCard';
import Cart from './components/Cart';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

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

  const getAiSuggestion = async () => {
    setAiLoading(true);
    setAiSuggestion(null);
    try {
      // Inicialização segura utilizando process.env.API_KEY conforme diretrizes
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const menuString = MENU_ITEMS.map(i => `${i.name} (R$ ${i.price})`).join(', ');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Com base neste cardápio: ${menuString}. Sugira um "Combo Perfeito" com 1 pastel e 1 batata frita. Seja breve e use um tom convidativo e amigável.`,
      });

      setAiSuggestion(response.text || "Que tal um Pastel Misto e uma Batata M? A combinação clássica que nunca falha!");
    } catch (error) {
      console.error("Erro na IA:", error);
      setAiSuggestion("Hoje eu recomendo o Pastel de Carne com Batata M! Delicioso!");
    } finally {
      setAiLoading(false);
    }
  };

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

  const categories = ['Pastéis', 'Batatas'] as const;
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen pb-20 bg-[#FDF1EB]">
      <header className="bg-white px-4 py-8 text-center shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl -z-10 opacity-30"></div>
        
        <div className="flex flex-col items-center mb-4 scale-90 sm:scale-100">
          <div className="w-24 h-24 mb-2">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M50 5C35 25 35 75 50 95C65 75 65 25 50 5Z" fill="#E89E7D" stroke="#5C3D2E" strokeWidth="2"/>
              <path d="M50 5C45 25 45 75 50 95" stroke="#5C3D2E" strokeWidth="2"/>
              <path d="M50 5C55 25 55 75 50 95" stroke="#5C3D2E" strokeWidth="2"/>
              <path d="M50 95V100" stroke="#5C3D2E" strokeWidth="2"/>
            </svg>
          </div>
          <h1 className="brand-font text-5xl text-[#5C3D2E]">Rhay's</h1>
          <p className="uppercase tracking-widest font-bold text-[#5C3D2E] text-xl -mt-1">candy store</p>
        </div>
        
        <div className="w-24 h-1 bg-[#E89E7D] mx-auto rounded-full mt-4"></div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        {/* IA Suggestion Section */}
        <section className="mb-10 bg-white rounded-3xl p-6 shadow-sm border border-orange-100 overflow-hidden relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#E89E7D] rounded-full flex items-center justify-center text-white">
              <i className="fas fa-magic"></i>
            </div>
            <div>
              <h3 className="font-bold text-[#5C3D2E]">Dica da Rhay</h3>
              <p className="text-xs text-gray-500 italic">Sugestão via IA</p>
            </div>
          </div>
          
          {aiSuggestion ? (
            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <p className="text-[#5C3D2E] text-sm leading-relaxed">{aiSuggestion}</p>
              <button 
                onClick={() => setAiSuggestion(null)} 
                className="mt-2 text-xs text-[#E89E7D] font-bold uppercase"
              >
                Limpar
              </button>
            </div>
          ) : (
            <button 
              onClick={getAiSuggestion}
              disabled={aiLoading}
              className="w-full py-3 bg-white border-2 border-[#E89E7D] border-dashed rounded-2xl text-[#E89E7D] font-bold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
            >
              {aiLoading ? (
                <>
                  <i className="fas fa-circle-notch fa-spin"></i>
                  Pensando em algo especial...
                </>
              ) : (
                <>O que pedir hoje? ✨</>
              )}
            </button>
          )}
        </section>

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
              {MENU_ITEMS.filter((item) => item.category === category).map((item) => (
                <ItemCard key={item.id} item={item} onAdd={addToCart} />
              ))}
            </div>
          </section>
        ))}
        
        <section className="mt-16 mb-24 p-8 bg-white/60 backdrop-blur rounded-3xl border border-white text-center shadow-inner">
          <h4 className="text-xl font-bold text-[#5C3D2E] mb-2 uppercase tracking-tighter">Nos Acompanhe</h4>
          <p className="text-gray-500 text-sm mb-6">Fique por dentro das novidades e promoções!</p>
          <div className="flex justify-center gap-4">
             <a href="#" className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#E89E7D] hover:scale-110 transition-transform">
               <i className="fab fa-instagram text-xl"></i>
             </a>
             <a href={`https://wa.me/${CONTACT_PHONE}`} className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#25D366] hover:scale-110 transition-transform">
               <i className="fab fa-whatsapp text-xl"></i>
             </a>
          </div>
        </section>
      </main>

      <div className="fixed bottom-6 left-0 right-0 flex justify-center px-6 pointer-events-none z-40">
        <button
          onClick={() => setIsCartOpen(true)}
          className="pointer-events-auto bg-[#5C3D2E] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 hover:bg-[#4a3125] transition-all transform active:scale-95 group max-w-md w-full sm:w-auto"
          aria-label="Ver carrinho"
        >
          <div className="relative">
            <i className="fas fa-shopping-basket text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-[#E89E7D] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#5C3D2E] animate-bounce">
                {cartCount}
              </span>
            )}
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="font-bold tracking-wide uppercase text-xs opacity-70">
              {cartCount > 0 ? 'Concluir Pedido' : 'Meu Carrinho'}
            </span>
            {cartCount > 0 && (
              <span className="text-lg font-black tracking-tight">
                R$ {cartTotal.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
          <i className="fas fa-chevron-right text-xs opacity-50 group-hover:translate-x-1 transition-transform ml-2"></i>
        </button>
      </div>

      <Cart
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default App;
