import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBasket, X, Minus, Plus, Trash2, QrCode, Copy, Check, Info, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_CONFIG } from '../config';

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onUpdateQuantity, isOpen, onClose }) => {
  const [pixCopied, setPixCopied] = useState(false);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = items.length > 0 ? subtotal + STORE_CONFIG.DELIVERY_FEE : 0;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(STORE_CONFIG.PIX_CODE);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;

    const date = new Date().toLocaleTimeString('pt-BR');
    let message = `*Pedido Rhay's Candy Store* (${date})\n`;
    message += `--------------------------\n`;
    
    items.forEach((item) => {
      message += `• *${item.quantity}x* ${item.name}\n  _R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}_\n`;
    });
    
    message += `--------------------------\n`;
    message += `Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    message += `Taxa de Entrega: R$ ${STORE_CONFIG.DELIVERY_FEE.toFixed(2).replace('.', ',')}\n`;
    message += `*TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STORE_CONFIG.CONTACT_PHONE}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(STORE_CONFIG.PIX_CODE)}&color=5C3D2E&bgcolor=FDF1EB`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b flex items-center justify-between bg-white sticky top-0 z-10">
              <h2 className="text-2xl font-bold text-[#5C3D2E] flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FDF1EB] rounded-2xl flex items-center justify-center text-[#E89E7D]">
                  <ShoppingBasket size={22} />
                </div>
                Meu Pedido
              </h2>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-gray-100 rounded-2xl transition-colors text-gray-400"
                aria-label="Fechar carrinho"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBasket size={48} className="text-gray-200" />
                  </div>
                  <p className="text-gray-400 font-medium mb-6">Seu carrinho está vazio.</p>
                  <button 
                    onClick={onClose}
                    className="bg-[#FDF1EB] text-[#E89E7D] px-8 py-3 rounded-2xl font-bold hover:bg-orange-100 transition-all"
                  >
                    Voltar ao cardápio
                  </button>
                </div>
              ) : (
                <div className="space-y-8 pb-12">
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {items.map((item) => (
                        <motion.div 
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          key={item.id} 
                          className="flex gap-4 p-5 rounded-3xl bg-[#FDF1EB]/50 border border-orange-100 items-center overflow-hidden"
                        >
                          <div className="flex-grow">
                            <h4 className="font-bold text-[#5C3D2E] mb-1">{item.name}</h4>
                            <p className="text-[#E89E7D] font-black text-sm mb-3">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1 bg-white rounded-xl border border-orange-200 p-1 shadow-sm">
                                <button 
                                  onClick={() => onUpdateQuantity(item.id, -1)}
                                  className="w-10 h-10 flex items-center justify-center text-[#E89E7D] hover:bg-orange-50 rounded-lg transition-colors"
                                  aria-label="Diminuir quantidade"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                                <button 
                                  onClick={() => onUpdateQuantity(item.id, 1)}
                                  className="w-10 h-10 flex items-center justify-center text-[#E89E7D] hover:bg-orange-50 rounded-lg transition-colors"
                                  aria-label="Aumentar quantidade"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              <button 
                                onClick={() => onRemove(item.id)}
                                className="w-10 h-10 flex items-center justify-center text-[#5C3D2E]/30 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                title="Remover"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="bg-[#FDF1EB] rounded-[40px] p-8 border-2 border-dashed border-[#E89E7D]/30 text-center">
                    <h3 className="text-[#5C3D2E] font-black text-xs uppercase tracking-[0.2em] mb-6 flex items-center justify-center gap-2">
                      <QrCode size={16} className="text-[#E89E7D]" />
                      Pagamento via PIX
                    </h3>
                    
                    <div className="bg-white p-6 rounded-[32px] shadow-sm inline-block mb-6 border border-orange-100">
                      <img src={qrCodeUrl} alt="QR Code PIX" className="w-48 h-48 mx-auto" />
                    </div>
                    
                    <p className="text-[#5C3D2E]/60 text-xs font-semibold mb-6 px-4 leading-relaxed">
                      Escaneie o código acima ou copie o código de pagamento abaixo.
                    </p>

                    <button 
                      onClick={handleCopyPix}
                      className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3 border-2 ${
                        pixCopied 
                        ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-100' 
                        : 'bg-white border-[#E89E7D] text-[#E89E7D] hover:bg-[#E89E7D] hover:text-white hover:shadow-lg hover:shadow-orange-100'
                      }`}
                    >
                      {pixCopied ? <Check size={18} /> : <Copy size={18} />}
                      {pixCopied ? 'Código Copiado!' : 'Copiar Código PIX'}
                    </button>

                    <div className="mt-8 p-5 bg-white/50 rounded-3xl border border-orange-200/50 flex flex-col items-center gap-2">
                      <span className="text-[10px] font-black text-[#E89E7D] uppercase tracking-widest flex items-center gap-2">
                        <Info size={12} /> Importante
                      </span>
                      <p className="text-[10px] text-[#5C3D2E]/70 font-bold leading-relaxed max-w-[200px]">
                        A transação é realizada diretamente entre você e a Rhay's Candy Store.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 pt-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                        <span className="text-[#5C3D2E] font-bold">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Taxa de Entrega</span>
                        <span className="text-[#5C3D2E] font-bold">R$ {STORE_CONFIG.DELIVERY_FEE.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <span className="text-gray-400 font-black uppercase tracking-widest text-xs">Total</span>
                        <span className="text-3xl font-black text-[#5C3D2E]">
                          R$ {total.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      disabled={items.length === 0}
                      onClick={handleSendWhatsApp}
                      className="w-full bg-[#25D366] text-white py-5 rounded-[24px] font-black text-lg hover:bg-[#128C7E] shadow-xl shadow-green-100 transition-all flex items-center justify-center gap-3 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none active:scale-[0.98]"
                    >
                      <MessageCircle size={24} />
                      Fazer Pedido
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
