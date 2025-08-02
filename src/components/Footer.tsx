import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200 pt-8 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
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
                            <li className="text-gray-600 text-sm">
                                info@sublimacion.com
                            </li>
                            <li className="text-gray-600 text-sm">
                                +54 11 1234-5678
                            </li>
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
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                                <FaTwitter size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
