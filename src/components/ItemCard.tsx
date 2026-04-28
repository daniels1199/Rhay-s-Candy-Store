import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { MenuItem } from '../types';

interface ItemCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onAdd }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden flex flex-col h-full hover:shadow-xl hover:shadow-orange-100/20 transition-all duration-300"
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-[#5C3D2E] text-lg leading-snug">{item.name}</h3>
          <span className="font-black text-[#E89E7D] whitespace-nowrap ml-3 bg-[#FDF1EB] px-3 py-1 rounded-full text-sm">
            R$ {item.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
        
        {item.description && (
          <p className="text-sm text-gray-500 mb-6 line-clamp-2 italic leading-relaxed">
            {item.description}
          </p>
        )}
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onAdd(item)}
          className="mt-auto w-full bg-[#E89E7D] text-white py-4 rounded-2xl font-bold hover:bg-[#d48c6c] transition-colors flex items-center justify-center gap-3 shadow-lg shadow-orange-100 group"
        >
          <div className="bg-white/20 p-1 rounded-full group-hover:rotate-90 transition-transform duration-300">
            <Plus size={14} />
          </div>
          Adicionar
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ItemCard;
