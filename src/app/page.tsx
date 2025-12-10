import "./styles/home.css";

export default function Home() {
  return (
    <div className="home-wrapper">

      <div className="brand-title">Jepun Bali Kencana.</div>

      <div className="landing-greeting">
        <span className="greet-black">Om</span>
        <span className="greet-green">Swastyastu</span>
      </div>

      <nav className="top-menu">
        <div className="menu-item active">home</div>
        <div className="menu-item">Category</div>
        <div className="menu-item">Testimony</div>
        <div className="menu-item">gallery</div>
        <div className="menu-item">contact us</div>
      </nav>

      <img className="side-prev-bar" src="/Vector 9.svg" alt="prev"/>
      <div className="side-prev-text">prev</div>

      <div className="side-next-bar">
            <img src="/Vector 8.svg" alt="next"/>
      </div>
      <div className="side-next-text">next</div>

      <div className="scroll-label">Scroll down</div>
      
      <div className="wrapper-indicator">
            <div className="indicator active">01</div>
            <div className="indicator">02</div>
            <div className="indicator">03</div>
            <div className="indicator">04</div>
            <div className="indicator">05</div>
      </div>
     
      <div className="side-social fb">facebook</div>
      <div className="side-social ig">instagram</div>
      <img className="top-img" src="/logo.png" alt="logo" />

      <div className="landing-desc">
        Selamat datang di Jepun Bali Kencana, tempat di mana keindahan 
        alam dan budaya berpadu. Temukan koleksi tanaman, patung, dan 
        karya yang menghadirkan ketenangan serta harmoni di setiap ruang.
      </div>

      <img className ='jepun' src="/image 9.png" alt="jepun"/>
            <div className="green-panel"></div>
      <button className="cta-btn">
        jelajahi →
      </button>
      <img className="wa-float" src="/Social Icons.svg" alt="whatsapp"/>
    </div>
  );
}
