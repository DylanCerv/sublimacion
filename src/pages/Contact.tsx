import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Contact: React.FC = () => {
  const handleWhatsAppContact = () => {
    const phoneNumber = '5491112345678';
    const message = 'Hola! Me gustaría obtener más información sobre sus productos.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h1>
          <p className="text-gray-600">
            Estamos aquí para ayudarte con cualquier consulta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Información de Contacto
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="w-4 h-4 text-black mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Teléfono</h3>
                  <p className="text-gray-600 text-sm">+54 9 11 1234-5678</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-4 h-4 text-black mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600 text-sm">info@sublimacion.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="w-4 h-4 text-black mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Dirección</h3>
                  <p className="text-gray-600 text-sm">
                    Av. Corrientes 1234<br />
                    Ciudad Autónoma de Buenos Aires<br />
                    Argentina
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-4 h-4 text-black mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Horarios de Atención</h3>
                  <p className="text-gray-600 text-sm">
                    Lunes a Viernes: 9:00 - 18:00<br />
                    Sábados: 9:00 - 13:00<br />
                    Domingos: Cerrado
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleWhatsAppContact}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <FaWhatsapp size={20} />
                <span>Contactar por WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Envíanos un Mensaje
            </h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black hover:bg-black/80 text-white font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer"
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