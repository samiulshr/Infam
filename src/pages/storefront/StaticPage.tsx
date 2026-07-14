import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';

export default function StaticPage() {
  const { slug } = useParams();
  
  const titles: Record<string, string> = {
    'about-us': 'About Us',
    'contact-us': 'Contact Us',
    'return-policy': 'Returns & Exchanges',
    'privacy-policy': 'Privacy Policy',
    'terms-condition': 'Terms & Conditions'
  };

  const title = slug ? titles[slug] || 'Page' : 'Page';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
    >
      <h1 className="text-4xl font-serif mb-12 text-center">{title}</h1>
      <div className="prose prose-stone max-w-none text-stone font-sans">
        <p className="mb-4">This is a placeholder for the {title} page content. In a production environment, this would contain the full detailed text matching the brand's voice and legal requirements.</p>
        <p>INFAM is dedicated to providing an exceptional luxury experience. For any inquiries, please refer to our dedicated concierge support.</p>
      </div>
    </motion.div>
  );
}
