import React, { useState } from 'react';
import { ChevronDown } from '../icons'; 

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
  onClick={() => setIsOpen(!isOpen)}
  className="w-full py-5 flex justify-between items-center text-left hover:text-gray-600 transition-colors"
>
  <span className="font-medium text-gray-900">{title}</span>
  <ChevronDown 
    className={`w-4 h-4 text-gray-400 transform transition-transform duration-300 ${
      isOpen ? 'rotate-180' : ''
    }`} 
  />
</button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <div className="text-gray-500 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;