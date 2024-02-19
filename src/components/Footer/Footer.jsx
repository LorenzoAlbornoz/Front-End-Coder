import React from "react";
import { RiInstagramLine, RiFacebookFill, RiTwitterLine, RiLinkedinBoxFill, RiYoutubeLine } from "react-icons/ri";
import { MdOutlinePhone } from "react-icons/md";
import { RiMailLine } from "react-icons/ri";
import { RiPinDistanceLine } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="container-fluid footer bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 d-sm-block mt-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <img src="https://res.cloudinary.com/dcwpf7ghu/image/upload/v1704945934/fravega_fgkexe.png" alt="Logo" height="100" />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row text-center">
                    <div className="col-lg-12">
                        <p className="footer__text1">
                            Descubre la diferencia de elegirnos. Porque cuando se trata de electrodomésticos, ¡somos los primeros, siempre!
                        </p>
                    </div>

                    <div className="col-lg-6">
                        <h3 className="footer__title">Contactanos!</h3>
                        <ul className="list-unstyled footer__text2">
                            <li>
                                <MdOutlinePhone /> Venta telefónica:
                            </li>
                            <li className="contact-item">0810 333 8700</li>
                            <li>
                                <RiMailLine /> contacto@fravega.com
                            </li>
                            <li>
                                <RiPinDistanceLine /> Valentín Gómez 2813 (1191) | Capital Federal | Argentina
                            </li>
                            <li>
                                <AiOutlineClockCircle /> Lunes a Sábado de 8 a 20 hs
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-6">
                        <div className="d-flex flex-column align-items-center">
                            <h3 className="footer__title m-3 mt-1">Seguinos!</h3>
                            <div className="d-flex align-items-end fs-2">
                                <Link to="https://www.instagram.com/fravegaonline/" className="me-4 footer__iconInstagram">
                                    <RiInstagramLine size={30} />
                                </Link>
                                <Link to="https://www.facebook.com/fravegaonline" className="me-4 footer__iconFacebook">
                                    <RiFacebookFill size={30} />
                                </Link>
                                <Link to="https://twitter.com/fravegaonline" className="me-4 footer__iconTwitter">
                                    <RiTwitterLine size={30} />
                                </Link>
                                <Link to="https://www.youtube.com/user/fravegaonline" className="me-4 footer__iconYoutube">
                                    <RiYoutubeLine size={30} />
                                </Link>
                                <Link to="https://www.linkedin.com/company/fravega-saciei" className="footer__iconLinkedin">
                                    <RiLinkedinBoxFill size={30} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-lg-12 text-center footer__text3">
                        <p className="text-muted">© Copyright 1972-2024 - Company Name. All rights reserved. </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
