export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
<div className="auth-wrapper">
    <section className="form">
        <h1>Hello Admin</h1>
    <form>
    <div style={{width: '100%', height: '100%', background: '#F3F3F3', borderRadius: 34}}> 
        <input type="email" placeholder="Email" />
    </div>
    <div style={{width: '100%', height: '100%', background: '#F3F3F3', borderRadius: 34}}>
      <input type="password" placeholder="Password" />
      </div>
      <div style={{width: '100%', height: '100%', textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'rgba(255, 255, 255, 0.88)', fontSize: 23, fontFamily: 'Poppins', fontWeight: '600', letterSpacing: 0.46, wordWrap: 'break-word'}}>Lets Start</div>
      <button type="submit">Lets Start</button>
    </form>
    <aside className="auth-pict">
    <img src="/pana.png" alt="auth-image" />
  </aside>
  </section>
</div>
);
}
