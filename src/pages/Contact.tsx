import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useSettings } from '../hooks/useSettings';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Contact: React.FC = () => {
  const { settings, isLoading, error } = useSettings();

  const handleWhatsAppContact = () => {
    if (!settings?.contact.whatsapp) return;
    const phoneNumber = settings.contact.whatsapp;
    const message = settings.contact.whatsappDefaultMessage || 'Hola! Me gustaría obtener más información sobre sus productos.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" message="Cargando información de contacto..." />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contacto</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Estamos aquí para ayudarte con cualquier consulta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Información de Contacto
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              {settings?.contact.phone && (
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-black mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">Teléfono</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">{settings.contact.phone}</p>
                  </div>
                </div>
              )}

              {settings?.contact.email && (
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-black mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">Email</h3>
                    <p className="text-gray-600 text-xs sm:text-sm break-all">{settings.contact.email}</p>
                  </div>
                </div>
              )}

              {settings?.contact.address && (
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-black mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">Dirección</h3>
                    <p className="text-gray-600 text-xs sm:text-sm" style={{ whiteSpace: 'pre-line' }}>
                      {settings.contact.address}
                    </p>
                  </div>
                </div>
              )}

              {settings?.contact.businessHours && (
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-black mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">Horarios de Atención</h3>
                    <p className="text-gray-600 text-xs sm:text-sm" style={{ whiteSpace: 'pre-line' }}>
                      {settings.contact.businessHours}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {settings?.contact.whatsapp && (
              <div className="mt-6 sm:mt-8">
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer text-sm sm:text-base"
                >
                  <FaWhatsapp size={18} className="sm:w-5 sm:h-5" />
                  <span>Contactar por WhatsApp</span>
                </button>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Envíanos un Mensaje
            </h2>
            
            <form className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base sm:rows-6"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black hover:bg-black/80 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors cursor-pointer text-sm sm:text-base"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 