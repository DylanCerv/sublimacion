import React, { useState, useEffect } from 'react';
import { useSettings } from '../../hooks/useSettings';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import { Save, Plus, Trash2, Instagram, Facebook, Twitter } from 'lucide-react';
import type { SettingsFormData } from '../../types/admin';
import type { SiteSettings } from '../../types';

const SettingsForm: React.FC = () => {
  const { settings, isLoading, error, updateSettings } = useSettings();
  const [formData, setFormData] = useState<SettingsFormData>({
    contact: {
      phone: '',
      whatsapp: '',
      whatsappDefaultMessage: '',
      email: '',
      address: '',
      businessHours: ''
    },
    socialNetworks: [],
    texts: {
      footerDescription: ''
    }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (settings) {
      setFormData({
        contact: {
          phone: settings.contact.phone,
          whatsapp: settings.contact.whatsapp,
          whatsappDefaultMessage: settings.contact.whatsappDefaultMessage,
          email: settings.contact.email,
          address: settings.contact.address || '',
          businessHours: settings.contact.businessHours || ''
        },
        socialNetworks: settings.socialNetworks,
        texts: {
          footerDescription: settings.texts.footerDescription
        }
      });
    }
  }, [settings]);

  const handleContactChange = (field: keyof typeof formData.contact, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };



  const handleTextsChange = (field: keyof typeof formData.texts, value: string) => {
    setFormData(prev => ({
      ...prev,
      texts: {
        ...prev.texts,
        [field]: value
      }
    }));
  };

  const handleSocialNetworkChange = (index: number, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      socialNetworks: prev.socialNetworks.map((network, i) => 
        i === index ? { ...network, [field]: value } : network
      )
    }));
  };

  const addSocialNetwork = () => {
    const newNetwork = {
      id: `network-${Date.now()}`,
      name: '',
      url: '',
      icon: '',
      enabled: true
    };
    setFormData(prev => ({
      ...prev,
      socialNetworks: [...prev.socialNetworks, newNetwork]
    }));
  };

  const removeSocialNetwork = (index: number) => {
    setFormData(prev => ({
      ...prev,
      socialNetworks: prev.socialNetworks.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const success = await updateSettings(formData);
      if (success) {
        setSaveMessage('Configuración guardada exitosamente');
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        setSaveMessage('Error al guardar la configuración');
      }
    } catch (err) {
      setSaveMessage('Error al guardar la configuración');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Configuración del Sitio</h2>
          <p className="text-gray-600">Gestiona la información de contacto, redes sociales, envíos y textos del sitio</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="text"
                  value={formData.contact.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  placeholder="+54 11 1234-5678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp (número con código país)
                </label>
                <input
                  type="text"
                  value={formData.contact.whatsapp}
                  onChange={(e) => handleContactChange('whatsapp', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  placeholder="5491123456789"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje por defecto de WhatsApp
                </label>
                <textarea
                  value={formData.contact.whatsappDefaultMessage}
                  onChange={(e) => handleContactChange('whatsappDefaultMessage', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Hola! Me interesa obtener más información sobre sus productos."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  placeholder="info@sublimacion.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  value={formData.contact.address}
                  onChange={(e) => handleContactChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Buenos Aires, Argentina"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horario de Atención
                </label>
                <textarea
                  value={formData.contact.businessHours}
                  onChange={(e) => handleContactChange('businessHours', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Lunes a Viernes: 9:00 - 18:00
Sábados: 9:00 - 13:00
Domingos: Cerrado"
                />
              </div>
            </div>
          </div>

          {/* Social Networks */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Redes Sociales</h3>
              <button
                type="button"
                onClick={addSocialNetwork}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <Plus className="h-4 w-4 mr-1" />
                Agregar Red Social
              </button>
            </div>

            <div className="space-y-4">
              {formData.socialNetworks.map((network, index) => (
                <div key={network.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        value={network.name}
                        onChange={(e) => handleSocialNetworkChange(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Instagram"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icono
                      </label>
                      <select
                        value={network.icon}
                        onChange={(e) => handleSocialNetworkChange(index, 'icon', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                      >
                        <option value="">Seleccionar icono</option>
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                        <option value="twitter">Twitter</option>
                        <option value="tiktok">TikTok</option>
                        <option value="youtube">YouTube</option>
                        <option value="linkedin">LinkedIn</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL
                      </label>
                      <input
                        type="url"
                        value={network.url}
                        onChange={(e) => handleSocialNetworkChange(index, 'url', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                        placeholder="https://instagram.com/usuario"
                      />
                    </div>

                    <div className="flex items-end space-x-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={network.enabled}
                          onChange={(e) => handleSocialNetworkChange(index, 'enabled', e.target.checked)}
                          className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Habilitado</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeSocialNetwork(index)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>



          {/* Site Texts */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Textos del Sitio</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción del footer
                </label>
                <textarea
                  value={formData.texts.footerDescription}
                  onChange={(e) => handleTextsChange('footerDescription', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Descripción que aparece en el footer..."
                />
              </div>
            </div>
          </div>

          {/* Save Message */}
          {saveMessage && (
            <div className={`p-4 rounded-lg ${saveMessage.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              {saveMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-2">Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Guardar Configuración
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsForm;