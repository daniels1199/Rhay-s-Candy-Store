
import React from 'react';
import { MenuItem } from '../types';

interface ItemCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onAdd }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-[#5C3D2E] text-lg leading-tight">{item.name}</h3>
          <span className="font-bold text-[#E89E7D] whitespace-nowrap ml-2">
            R$ {item.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
        
        {item.description && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 italic">
            {item.description}
          </p>
        )}
        
        <button
          onClick={() => onAdd(item)}
          className="mt-auto w-full bg-[#E89E7D] text-white py-2.5 rounded-xl font-medium hover:bg-[#d48c6c] transition-colors flex items-center justify-center gap-2"
        >
          <i className="fas fa-plus text-xs"></i>
          Adicionar ao Pedido
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
