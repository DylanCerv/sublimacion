import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { useSettings } from '../hooks/useSettings';

const Footer: React.FC = () => {
    const { settings } = useSettings();

    const getSocialIcon = (icon: string) => {
        switch (icon) {
            case 'facebook':
                return FaFacebook;
            case 'instagram':
                return FaInstagram;
            case 'twitter':
                return FaTwitter;
            case 'tiktok':
                return FaTiktok;
            case 'youtube':
                return FaYoutube;
            case 'linkedin':
                return FaLinkedin;
            default:
                return FaInstagram;
        }
    };

    return (
        <footer className="bg-white border-t border-gray-200 pt-6 sm:pt-8 pb-4 sm:pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
                    {/* Column 1 */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                            GUÍA DE COMPRA
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/how-to-buy" className="text-gray-600 hover:text-gray-900 text-sm">
                                    ¿CÓMO COMPRAR?
                                </Link>
                            </li>
                            <li>
                                <Link to="/size-guide" className="text-gray-600 hover:text-gray-900 text-sm">
                                    GUÍA DE TALLES
                                </Link>
                            </li>
                            <li>
                                <Link to="/shipping" className="text-gray-600 hover:text-gray-900 text-sm">
                                    ENVÍOS Y DEVOLUCIONES
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                            CATEGORÍAS
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/collection" className="text-gray-600 hover:text-gray-900 text-sm">
                                    COLECCIONES
                                </Link>
                            </li>
                            <li>
                                <Link to="/collection/new" className="text-gray-600 hover:text-gray-900 text-sm">
                                    NOVEDADES
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                            CONTACTO
                        </h3>
                        <ul className="space-y-2">
                            {settings?.contact.email && (
                                <li className="text-gray-600 text-sm">
                                    {settings.contact.email}
                                </li>
                            )}
                            {settings?.contact.phone && (
                                <li className="text-gray-600 text-sm">
                                    {settings.contact.phone}
                                </li>
                            )}
                            {settings?.contact.address && (
                                <li className="text-gray-600 text-sm">
                                    {settings.contact.address}
                                </li>
                            )}
                            {settings?.contact.businessHours && (
                                <li className="text-gray-600 text-sm pt-2" style={{ whiteSpace: 'pre-line' }}>
                                    <strong>Horarios:</strong><br />
                                    {settings.contact.businessHours}
                                </li>
                            )}
                            <li>
                                <Link to="/contact" className="text-gray-600 hover:text-gray-900 text-sm">
                                    FORMULARIO DE CONTACTO
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4 - Social */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                            SÍGUENOS
                        </h3>
                        <div className="flex space-x-4">
                            {settings?.socialNetworks
                                .filter(network => network.enabled && network.url)
                                .map((network) => {
                                    const IconComponent = getSocialIcon(network.icon);
                                    return (
                                        <a
                                            key={network.id}
                                            href={network.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-gray-900"
                                            title={network.name}
                                        >
                                            <IconComponent size={24} />
                                        </a>
                                    );
                                })}
                        </div>
                        {settings?.texts.footerDescription && (
                            <p className="text-gray-600 text-sm mt-4">
                                {settings.texts.footerDescription}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
