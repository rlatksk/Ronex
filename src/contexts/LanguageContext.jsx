import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('ronex-language');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('ronex-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'id' : 'en');
  };

  const translations = {
    en: {
      // Navigation
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      
      // Home Page
      heroTitle: 'Building Tomorrow\'s Infrastructure Today',
      heroSubtitle: 'Professional construction services. From residential buildings to commercial complexes, we deliver quality construction solutions.',
      ourProjects: 'Our Projects',
      learnMore: 'Learn More',
      ourServices: 'Our Services',
      
      // Services
      residential: 'Residential Construction',
      residentialDesc: 'Custom homes, renovations, and residential complexes built to the highest standards.',
      commercial: 'Commercial Buildings',
      commercialDesc: 'Office buildings, retail spaces, and industrial facilities designed for modern business needs.',
      renovation: 'Renovation & Remodeling',
      renovationDesc: 'Transform existing spaces with our expert renovation and remodeling services.',
      infrastructure: 'Infrastructure Projects',
      infrastructureDesc: 'Roads, bridges, and public infrastructure built to last for generations.',
      
      // About
      aboutTitle: 'About Ronex Muda Berkarya',
      aboutSubtitle: 'Building Excellence Since 2022',
      aboutDescription: 'Ronex Muda Berkarya has been a trusted name in the Indonesian construction. We specialize in delivering high-quality construction projects on time and within budget.',
      ourValues: 'Our Values',
      quality: 'Quality',
      qualityDesc: 'We never compromise on quality and use only the finest materials.',
      safety: 'Safety',
      safetyDesc: 'Safety is our top priority on every construction site.',
      innovation: 'Innovation',
      innovationDesc: 'We embrace modern construction techniques and technologies.',
      sustainability: 'Sustainability',
      sustainabilityDesc: 'Environmentally responsible construction for a better future.',
      
      // Projects
      projectsTitle: 'Our Construction Projects',
      projectsSubtitle: 'Showcasing our expertise across various construction sectors',
      allProjects: 'All Projects',
      completed: 'Completed',
      inProgress: 'In Progress',
      planned: 'Planned',
      
      // Footer
      contactUs: 'Contact Us',
      followUs: 'Follow Us',
      allRightsReserved: 'All rights reserved.',
      
      // Common
      viewDetails: 'View Details',
      getQuote: 'Get Quote',
      
      // CTA
      ctaTitle: 'Ready to Start Your Project?',
      ctaDescription: 'Let\'s work together to bring your ideas to life.',
      getInTouch: 'Get In Touch',
    },
    id: {
      // Navigation
      home: 'Beranda',
      about: 'Tentang',
      projects: 'Proyek',
      
      // Home Page
      heroTitle: 'Membangun Infrastruktur Masa Depan Hari Ini',
      heroSubtitle: 'Layanan konstruksi profesional dengan pengalaman lebih dari 15 tahun. Dari bangunan residensial hingga kompleks komersial, kami memberikan solusi konstruksi berkualitas.',
      ourProjects: 'Proyek Kami',
      learnMore: 'Pelajari Lebih Lanjut',
      ourServices: 'Layanan Kami',
      
      // Services
      residential: 'Konstruksi Residensial',
      residentialDesc: 'Rumah kustom, renovasi, dan kompleks residensial yang dibangun dengan standar tertinggi.',
      commercial: 'Bangunan Komersial',
      commercialDesc: 'Gedung perkantoran, ruang ritel, dan fasilitas industri yang dirancang untuk kebutuhan bisnis modern.',
      renovation: 'Renovasi & Remodeling',
      renovationDesc: 'Transformasi ruang yang ada dengan layanan renovasi dan remodeling ahli kami.',
      infrastructure: 'Proyek Infrastruktur',
      infrastructureDesc: 'Jalan, jembatan, dan infrastruktur publik yang dibangun untuk bertahan generasi.',
      
      // About
      aboutTitle: 'Tentang Ronex Muda Berkarya',
      aboutSubtitle: 'Membangun Keunggulan Sejak 2022',
      aboutDescription: 'Ronex Muda Berkarya telah menjadi nama terpercaya di industri konstruksi Indonesia. Kami mengkhususkan diri dalam memberikan proyek konstruksi berkualitas tinggi tepat waktu dan sesuai anggaran.',
      ourValues: 'Nilai-Nilai Kami',
      quality: 'Kualitas',
      qualityDesc: 'Kami tidak pernah berkompromi pada kualitas dan hanya menggunakan material terbaik.',
      safety: 'Keamanan',
      safetyDesc: 'Keamanan adalah prioritas utama kami di setiap lokasi konstruksi.',
      innovation: 'Inovasi',
      innovationDesc: 'Kami mengadopsi teknik dan teknologi konstruksi modern.',
      sustainability: 'Keberlanjutan',
      sustainabilityDesc: 'Konstruksi yang bertanggung jawab terhadap lingkungan untuk masa depan yang lebih baik.',
      
      // Projects
      projectsTitle: 'Proyek Konstruksi Kami',
      projectsSubtitle: 'Menampilkan keahlian kami di berbagai sektor konstruksi',
      allProjects: 'Semua Proyek',
      completed: 'Selesai',
      inProgress: 'Sedang Berjalan',
      planned: 'Direncanakan',
      
      // Footer
      contactUs: 'Hubungi Kami',
      followUs: 'Ikuti Kami',
      allRightsReserved: 'Semua hak dilindungi.',
      
      // Common
      viewDetails: 'Lihat Detail',
      getQuote: 'Dapatkan Penawaran',
      
      // CTA
      ctaTitle: 'Siap Memulai Proyek Anda?',
      ctaDescription: 'Mari bekerja sama untuk mewujudkan ide-ide Anda.',
      getInTouch: 'Hubungi Kami',
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
