
import React from 'react';
import { CartItem } from '../types';
import { CONTACT_PHONE } from '../constants';

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onUpdateQuantity, isOpen, onClose }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;

    const date = new Date().toLocaleTimeString('pt-BR');
    let message = `*Pedido Rhay's Candy Store* (${date})\n`;
    message += `--------------------------\n`;
    
    items.forEach((item) => {
      message += `• *${item.quantity}x* ${item.name}\n  _R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}_\n`;
    });
    
    message += `--------------------------\n`;
    message += `*TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONTACT_PHONE}?text=${encodedMessage}`;
    
    // Proteção contra tabnabbing: abrindo em nova aba com noopener
    const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (win) win.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b flex items-center justify-between bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-[#5C3D2E] flex items-center gap-2">
            <i className="fas fa-shopping-basket text-[#E89E7D]"></i>
            Meu Pedido
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fechar carrinho"
          >
            <i className="fas fa-times text-gray-400"></i>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <i className="fas fa-cart-arrow-down text-5xl mb-4"></i>
              <p>Seu carrinho está vazio.</p>
              <button 
                onClick={onClose}
                className="mt-4 text-[#E89E7D] font-medium underline hover:text-[#d48c6c]"
              >
                Voltar ao cardápio
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-[#FDF1EB]/50 border border-orange-100 items-center">
                  <div className="flex-grow">
                    <h4 className="font-semibold text-[#5C3D2E]">{item.name}</h4>
                    <p className="text-[#E89E7D] font-bold">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-orange-200 px-1 shadow-sm">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-[#E89E7D] hover:bg-orange-50 rounded"
                          aria-label="Diminuir quantidade"
                        >
                          <i className="fas fa-minus text-[10px]"></i>
                        </button>
                        <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#E89E7D] hover:bg-orange-50 rounded"
                          aria-label="Aumentar quantidade"
                        >
                          <i className="fas fa-plus text-[10px]"></i>
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-red-400 text-xs hover:text-red-600 transition-colors uppercase font-bold tracking-tighter"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium uppercase tracking-widest text-xs">Total do Pedido</span>
            <span className="text-2xl font-bold text-[#5C3D2E]">
              R$ {total.toFixed(2).replace('.', ',')}
            </span>
          </div>
          
          <button
            disabled={items.length === 0}
            onClick={handleSendWhatsApp}
            className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#128C7E] shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-3 disabled:bg-gray-300 disabled:shadow-none active:scale-95"
          >
            <i className="fab fa-whatsapp text-2xl"></i>
            Finalizar no WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
