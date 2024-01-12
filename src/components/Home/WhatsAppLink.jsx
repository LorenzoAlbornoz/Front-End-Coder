import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppLink = () => {

  const whatsappLink = '/error404';

  return (
    <div className='whatsApp'>
      <Link to={whatsappLink} className="whatsApp__float">
        <FaWhatsapp className="whatsApp__my-float" />
      </Link>
    </div>
  );
};

export default WhatsAppLink;
