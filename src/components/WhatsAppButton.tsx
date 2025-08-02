import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useSettings } from '../hooks/useSettings';

const WhatsAppButton: React.FC = () => {
  const { settings } = useSettings();
  
  if (!settings?.contact.whatsapp) {
    return null; // Don't show button if WhatsApp is not configured
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = settings.contact.whatsapp;
    const message = settings.contact.whatsappDefaultMessage || 'Hola! Me interesa conocer más sobre sus camisas de sublimación.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40 cursor-pointer"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp size={24} />
    </button>
  );
};

export default WhatsAppButton; 