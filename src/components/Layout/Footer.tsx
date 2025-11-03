import { Shield, CheckCircle, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white rounded-lg p-1">
                                <Image
                                    src="/logo_up.png"
                                    alt="UP Logo"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="font-bold text-lg">Portal do Candidato</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Facilitando o acesso à educação superior
                            em Moçambique através da tecnologia.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Links Rápidos</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="https://www.up.ac.mz" className="hover:text-white transition-colors">
                                    Site Oficial da UP
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.up.ac.mz/regulamento-academico?highlight=WyJyZWd1bGFyIiwicmVndWxhbWVudG8iLCJyZWd1bGFtZW50b3MiLCJyZWd1bGFkb3IiLCJyZWd1bGFtIiwicmVndWxhcmVzIl0=" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    Regulamentos
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-white transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/suporte" className="hover:text-white transition-colors">
                                    Suporte Técnico
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Segurança</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-green-400" />
                                <span>Conexão SSL Segura</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>Dados Protegidos</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-yellow-400" />
                                <span>Sessão Temporizada</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                    <p className="mb-2">
                        © 2025 UP-Maputo. Todos os direitos reservados.
                    </p>
                    <p className="text-sm">
                        Desenvolvido por{' '}
                        <a
                            href="https://adelsonsaguatedev.github.io/adelsonsaguate/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white font-medium hover:underline"
                        >
                            Eng. Adelson Saguate
                        </a>
                        {' • '}
                        Versão 1.0.0
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;