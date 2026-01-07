'use client';

import "../styles/home.css";
export default function HeroSection() {
    const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section id="hero" className="home-wrapper">
      <div className="brand-title">
        <span className="atas">Jepun Bali</span>
        <span className="bawah">Kencana.</span>
      </div>

      <div className="landing-greeting">
        <span className="greet-black">Om</span>
        <span className="greet-green">Swastyastu</span>
      </div>

      <nav className="navbar">
        <div className="menu-item" onClick={() => scrollToSection('hero')}>home</div>
        <div className="menu-item" onClick={() => scrollToSection('category')}>Category</div>
        <div className="menu-item" onClick={() => scrollToSection('testimony')}>Testimony</div>
        <div className="menu-item" onClick={() => scrollToSection('gallery')}>gallery</div>
        <div className="menu-item" onClick={() => scrollToSection('contact')}>contact us</div>
      </nav>

      <img className="side-prev-bar" src="/Vector 9.svg" alt="prev"/>
      <div className="side-prev-text">prev</div>

      <div className="side-next-bar">
        <img src="/Vector 8.svg" alt="next"/>
      </div>
      <div className="side-next-text">next</div>

      <div className="scroll-label">Scroll down</div>
      
      <div className="wrapper-indicator">
        <div className="indicator" onClick={() => scrollToSection('hero')} >01</div>
        <div className="indicator" onClick={() => scrollToSection('category')}>02</div>
        <div className="indicator" onClick={() => scrollToSection('testimony')}>03</div>
        <div className="indicator" onClick={() => scrollToSection('gallery')}>04</div>
        <div className="indicator" onClick={() => scrollToSection('contact')}>05</div>
      </div>
     
      <img className="logo" src="/logo.png" alt="logo" />
      <button className="side-social fb" onClick={() => scrollToSection('contact')}>facebook</button>
      <div className="side-social ig" onClick={() => scrollToSection('contact')}>instagram</div>

      <div className="landing-desc">
        Selamat datang di Jepun Bali Kencana, tempat di mana keindahan 
        alam dan budaya berpadu. Temukan koleksi tanaman, patung, dan 
        karya yang menghadirkan ketenangan serta harmoni di setiap ruang.
      </div>

      <img className="jepun" src="/image 9.png" alt="jepun"/>
      <div className="green-panel"></div>
      
      <button className="tombol" onClick={() => scrollToSection('category')}>
        jelajahi →
      </button>
      
      <img className="wa-float" src="/Social Icons.svg" alt="whatsapp"/>
    </section>
  );
}
