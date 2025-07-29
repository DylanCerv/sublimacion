import React from 'react';
import { useLocation } from 'react-router-dom';
import { Truck, RotateCcw, ShoppingCart, Package, CreditCard } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const InfoPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const getPageContent = () => {
    switch (path) {
      case '/shipping':
        return {
          title: 'Envío y Devoluciones',
          icon: Truck,
          sections: [
            {
              title: 'Despachos de Productos',
              icon: Package,
              content: [
                'Los despachos de pedidos se realizan de 1 a 5 días hábiles posteriores a la confirmación de pago.',
                'Una vez despachado el pedido va a poder acceder al mismo para poder ver el código de seguimiento detallado.',
                'En caso de que hayan pasado 7 días hábiles para el despacho y no figura su código de seguimiento, no dude en consultarnos.'
              ]
            },
            {
              title: 'Envíos',
              icon: Truck,
              content: [
                'Los envíos se realizan por Correo Argentino y Andreani.',
                'En caso de que se envíe a domicilio, el comprador es responsable de poner correctamente su dirección.',
                'Correo Argentino visita 2 veces su domicilio. En el caso que no lo reciba o no se encuentre, el paquete se enviará nuevamente a nuestra fábrica.',
                'Si el paquete no es recibido por el destinatario, el comprador deberá abonar nuevamente el envío.'
              ]
            },
            {
              title: 'Devoluciones',
              icon: RotateCcw,
              content: [
                'No hay devoluciones por cambio de talle o color.',
                'No se reintegra el dinero en caso de que el paquete vuelva por los motivos descriptos en la sección ENVÍOS.',
                'Es de carácter obligatorio volver a abonar el envío para que sea enviado nuevamente a su comprador.',
                'El único motivo existente de devolución es por falla en la confección.',
                'Al comprar acepta nuestros TÉRMINOS Y CONDICIONES.'
              ]
            }
          ]
        };

      case '/how-to-buy':
        return {
          title: '¿Cómo Comprar?',
          icon: ShoppingCart,
          sections: [
            {
              title: 'Paso 1: Elige tu Producto',
              icon: Package,
              content: [
                'Navega por nuestro catálogo',
                'Usa los filtros para encontrar lo que buscas',
                'Lee la descripción y verifica medidas',
                'Selecciona talle'
              ]
            },
            {
              title: 'Paso 2: Contacto',
              icon: FaWhatsapp,
              content: [
                'Haz clic en "Consultar por WhatsApp"',
                'Te responderemos en minutos',
                'Confirma disponibilidad y precio',
                'Resolvemos todas tus dudas'
              ]
            },
            {
              title: 'Paso 3: Pago',
              icon: CreditCard,
              content: [
                'Acordamos el método de pago de tu preferencia',
                'Transferencia bancaria',
                'Mercado Pago',
                'Efectivo (solo retiro en local)'
              ]
            },
            {
              title: 'Paso 4: Envío',
              icon: Truck,
              content: [
                'Procesamos tu pedido en 24-48hs',
                'Te enviamos el código de seguimiento',
                'Recibe tu producto en casa',
                '¡Disfruta tu nueva camiseta!'
              ]
            }
          ]
        };

      default:
        return {
          title: 'Información',
          icon: Package,
          sections: []
        };
    }
  };

  const pageContent = getPageContent();

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{pageContent.title}</h1>
        </div>

        <div className="space-y-6">
          {pageContent.sections.map((section, index) => {
            const SectionIcon = section.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 transition-all hover:shadow-md">
                <div className="flex items-center mb-6">
                  <SectionIcon className="w-6 h-6 text-gray-900 mr-4" />
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                
                <ul className="space-y-3 pl-4 text-sm">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-gray-800 mr-3 text-lg">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-gray-900 rounded-lg p-8 text-center shadow-lg">
          <h3 className="text-xl font-bold text-white mb-2">¿Tienes más preguntas?</h3>
          <p className="text-gray-300 mb-6 text-sm">
            No dudes en contactarnos por WhatsApp para resolver cualquier duda
          </p>
          <button
            onClick={() => {
              const phoneNumber = '5491112345678';
              const message = 'Hola! Tengo una consulta sobre sus productos.';
              const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-md transition-colors flex items-center justify-center mx-auto cursor-pointer"
          >
            <FaWhatsapp size={20} className="mr-2" />
            Contactar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoPage; 