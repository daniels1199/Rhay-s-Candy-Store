
import React, { useState } from 'react';
import { CartItem } from '../types';
import { CONTACT_PHONE, DELIVERY_FEE, PIX_CODE } from '../constants';

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
  const total = items.length > 0 ? subtotal + DELIVERY_FEE : 0;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_CODE);
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
    message += `Taxa de Entrega: R$ ${DELIVERY_FEE.toFixed(2).replace('.', ',')}\n`;
    message += `*TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONTACT_PHONE}?text=${encodedMessage}`;
    
    const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (win) win.focus();
  };

  if (!isOpen) return null;

  // URL para gerar o QR Code usando o código PIX
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(PIX_CODE)}&color=5C3D2E&bgcolor=FDF1EB`;

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
            <div className="space-y-6">
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

              {/* Seção de Pagamento PIX */}
              <div className="bg-[#FDF1EB] rounded-3xl p-6 border-2 border-dashed border-[#E89E7D]/30 text-center">
                <h3 className="text-[#5C3D2E] font-bold text-sm uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                  <i className="fas fa-qrcode text-[#E89E7D]"></i>
                  Pagamento via PIX
                </h3>
                
                <div className="bg-white p-4 rounded-2xl shadow-sm inline-block mb-4 border border-orange-100">
                  <img src={qrCodeUrl} alt="QR Code PIX" className="w-40 h-40 mx-auto" />
                </div>
                
                <p className="text-[#5C3D2E] text-xs font-medium mb-4 px-4 leading-relaxed">
                  Escaneie o código acima ou use o botão abaixo para copiar o código de pagamento.
                </p>

                <button 
                  onClick={handleCopyPix}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border-2 ${
                    pixCopied 
                    ? 'bg-green-500 border-green-500 text-white shadow-green-100' 
                    : 'bg-white border-[#E89E7D] text-[#E89E7D] hover:bg-[#E89E7D] hover:text-white'
                  }`}
                >
                  <i className={`fas ${pixCopied ? 'fa-check' : 'fa-copy'}`}></i>
                  {pixCopied ? 'Código Copiado!' : 'PIX Copia e Cola'}
                </button>

                <div className="mt-8 flex flex-col items-center justify-center gap-4">
                  <span className="text-[11px] font-bold text-[#5C3D2E]/80 uppercase tracking-widest">
                    Pagamento recebido por
                  </span>
                  <img 
                    src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo-0.png" 
                    alt="Mercado Pago" 
                    className="h-14 w-auto object-contain drop-shadow-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-700 font-medium">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Taxa de Entrega</span>
              <span className="text-gray-700 font-medium">R$ {DELIVERY_FEE.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-gray-500 font-medium uppercase tracking-widest text-xs">Total do Pedido</span>
              <span className="text-2xl font-bold text-[#5C3D2E]">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
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
