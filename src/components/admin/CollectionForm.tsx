import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { FirebaseService } from '../../services/firebaseService';
import type { CollectionFormData } from '../../types/admin';
import { ArrowLeft, Save, Upload } from 'lucide-react';

const CollectionForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { refreshData } = useAppContext();
  const isEdit = Boolean(id && id !== 'new');
  
  const [formData, setFormData] = useState<CollectionFormData>({
    name: '',
    description: '',
    image: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCollection, setIsLoadingCollection] = useState(isEdit);

  // Load collection data for editing
  useEffect(() => {
    if (isEdit && id) {
      loadCollectionData(id);
    }
  }, [isEdit, id]);

  const loadCollectionData = async (collectionId: string) => {
    try {
      setIsLoadingCollection(true);
      // Get collection from context or fetch from Firebase
      const collections = await FirebaseService.getCollections();
      const collection = collections.find(c => c.id === collectionId);
      
      if (collection) {
        setFormData({
          name: collection.name,
          description: collection.description,
          image: collection.image
        });
      } else {
        alert('Colección no encontrada');
        navigate('/admin/collections');
      }
    } catch (error) {
      console.error('Error loading collection:', error);
      alert('Error al cargar la colección');
      navigate('/admin/collections');
    } finally {
      setIsLoadingCollection(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      alert('El nombre de la colección es requerido');
      return;
    }
    
    if (!formData.description.trim()) {
      alert('La descripción es requerida');
      return;
    }
    
    if (!formData.image.trim()) {
      alert('La URL de la imagen es requerida');
      return;
    }

    // Validate image URL
    if (!formData.image.startsWith('http')) {
      alert('La imagen debe ser una URL válida (debe comenzar con http o https)');
      return;
    }

    setIsLoading(true);
    
    try {
      const collectionData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        image: formData.image.trim()
      };

      if (isEdit && id) {
        await FirebaseService.updateCollection(id, collectionData);
      } else {
        await FirebaseService.addCollection(collectionData);
      }
      
      refreshData();
      navigate('/admin/collections');
    } catch (error) {
      console.error('Error saving collection:', error);
      alert('Error al guardar la colección. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingCollection) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando colección...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/collections')}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEdit ? 'Editar Colección' : 'Nueva Colección'}
            </h1>
            <p className="text-gray-600">
              {isEdit ? 'Modifica la información de la colección' : 'Completa los datos de la nueva colección'}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Colección *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ej: FORMULA UNO, BMW, PORSCHE..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Usa nombres descriptivos en mayúsculas para mantener consistencia
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Describe qué tipo de productos incluye esta colección..."
              required
            />
          </div>

          {/* Image URL */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen (URL de Cloudinary) *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://res.cloudinary.com/..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Sube la imagen a Cloudinary y pega aquí la URL
            </p>
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vista Previa
              </label>
              <div className="border border-gray-300 rounded-lg p-4">
                <img
                  src={formData.image}
                  alt="Vista previa"
                  className="w-32 h-32 object-cover rounded-lg mx-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'block';
                  }}
                />
                <div 
                  className="w-32 h-32 bg-gray-100 rounded-lg mx-auto flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <p className="text-xs text-gray-500 text-center">
                    Error al cargar<br />la imagen
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Cloudinary Info */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              📸 Cómo subir imágenes a Cloudinary:
            </h3>
            <ol className="text-xs text-blue-800 space-y-1 ml-4">
              <li>1. Ve a <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="underline">cloudinary.com</a></li>
              <li>2. Sube tu imagen</li>
              <li>3. Copia la URL de la imagen</li>
              <li>4. Pégala en el campo de arriba</li>
            </ol>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/collections')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{isLoading ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Crear Colección')}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CollectionForm;