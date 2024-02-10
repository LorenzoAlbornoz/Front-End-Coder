import React from "react";
import { RiInstagramLine } from "react-icons/ri";
import { RiFacebookBoxFill } from "react-icons/ri";
import { RiTwitterLine } from "react-icons/ri";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { RiYoutubeLine } from "react-icons/ri";
import { MdOutlinePhone } from "react-icons/md";
import { RiMailLine } from "react-icons/ri";
import { RiPinDistanceLine } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <>
            <div className="container-fluid footer">
                <div className="container">
                    <div className="row">

                                      <div className="col-lg-12 d-none d-sm-block mt-3">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <img src="https://res.cloudinary.com/dcwpf7ghu/image/upload/v1704945934/fravega_fgkexe.png" alt="Logo" height="100" />
                                </div>
                                <div className="d-flex align-items-end fs-2">
                                    <Link to="https://www.instagram.com/fravegaonline/" className="me-4 footer__icon">
                                        <RiInstagramLine size={30} />
                                    </Link>
                                    <Link to="https://www.facebook.com/fravegaonline" className="me-4 footer__icon">
                                        <RiFacebookBoxFill size={30} />
                                    </Link>
                                    <Link to="https://twitter.com/fravegaonline" className="me-4 footer__icon">
                                        <RiTwitterLine size={30} />
                                    </Link>
                                    <Link to="https://www.youtube.com/user/fravegaonline" className="me-4 footer__icon">
                                        <RiYoutubeLine size={30} />
                                    </Link>
                                    <Link to="https://www.linkedin.com/company/fravega-saciei" className="footer__icon">
                                        <RiLinkedinBoxFill size={30} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-sm-12 d-sm-none mt-3">
                            <div className="text-center">
                                <img src="https://res.cloudinary.com/dcwpf7ghu/image/upload/v1704945934/fravega_fgkexe.png" alt="Logo" height="100" />
                            </div>
                        </div>
                        
                        <div className="col-lg-12 d-sm-none d-flex justify-content-between">
                            <div className="d-flex align-items-end fs-2">
                                <Link to="https://www.instagram.com/fravegaonline/" className="me-4 footer__icon">
                                    <RiInstagramLine size={30} />
                                </Link>
                                <Link to="https://www.facebook.com/fravegaonline" className="me-4 footer__icon">
                                    <RiFacebookBoxFill size={30} />
                                </Link>
                                <Link to="https://twitter.com/fravegaonline" className="me-4 footer__icon">
                                    <RiTwitterLine size={30} />
                                </Link>
                                <Link to="https://www.youtube.com/user/fravegaonline" className="me-4 footer__icon">
                                    <RiYoutubeLine size={30} />
                                </Link>
                                <Link to="https://www.linkedin.com/company/fravega-saciei" className="footer__icon">
                                    <RiLinkedinBoxFill size={30} />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row text-center">
                        <div className="col-lg-4">
                            <h3 className="footer__title2">Fravega</h3>
                            <p className="footer__text1">
                                Descubre la diferencia de elegir Frávega. Porque cuando se trata de electrodomésticos, ¡somos los primeros siempre!
                            </p>
                        </div>
                        <div className="col-lg-4">
                            <h3 className="footer__title">Preguntas frecuentes</h3>
                            <ul className="footer__text2">
                                <li>¿Quiénes Somos?</li>
                                <li>Envíos</li>
                                <li>Cancelar orden</li>
                            </ul>
                        </div>
                        <div className="col-lg-4">
                            <h3 className="footer__title">Contacto y Medios de pago</h3>
                            <ul className="footer__text2">
                                <li>
                                    <div>
                                        <MdOutlinePhone /> Venta telefónica:
                                    </div>
                                </li>
                                <li>
                                    <div className="contact-item">0810 333 8700</div>
                                </li>
                                <li>
                                    <div>
                                        <RiMailLine /> contacto@fravega.com
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <RiPinDistanceLine /> Valentín Gómez 2813 (1191) | Capital Federal | Argentina
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <AiOutlineClockCircle /> Lunes a Sábado de 8 a 20 hs
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-lg-12 d-flex justify-content-between mb-4">
                            <p>© Todos los derechos reservados </p>
                            <p>Términos y Condiciones</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Footer;
