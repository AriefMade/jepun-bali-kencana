import './profil.css';

export default function ProfilUsahaPage() {
  return (
    <div className="profil-container">
      <main>
        <header>
          <h1 className="page-header">Profil Usaha - Jepun Bali Kencana</h1>
        </header>

        <section className="profile-card">
          <article>
            <h2 className="profile-field profile-label phone-label">No Handphone :</h2>
            <p className="profile-field profile-value phone-value">+62 878-5605-2262</p>
            <button className="edit-button edit-button-1">Sesuaikan</button>
            <div className="edit-button-border edit-button-1" />
          </article>

          <article>
            <h2 className="profile-field profile-label address-label">Alamat :</h2>
            <p className="profile-field profile-value address-value">Pemaron, Kec. Buleleng, Kabupaten Buleleng, Bali</p>
            <button className="edit-button edit-button-2">Sesuaikan</button>
            <div className="edit-button-border edit-button-2" />
          </article>

          <article>
            <div className="facebook-icon" />
            <h2 className="profile-field profile-label facebook-label">Facebook :</h2>
            <p className="profile-field profile-value facebook-value">Link</p>
            <button className="edit-button edit-button-3">Sesuaikan</button>
            <div className="edit-button-border edit-button-3" />
          </article>

          <article>
            <h2 className="profile-field profile-label whatsapp-label">WhatsApp :</h2>
            <p className="profile-field profile-value whatsapp-value">Link</p>
            <button className="edit-button edit-button-4">Sesuaikan</button>
            <div className="edit-button-border edit-button-4" />
          </article>

          <article>
            <h2 className="profile-field profile-label instagram-label">Instagram :</h2>
            <p className="profile-field profile-value instagram-value">Link</p>
            <button className="edit-button edit-button-5">Sesuaikan</button>
            <div className="edit-button-border edit-button-5" />
          </article>

          <article>
            <h2 className="profile-field profile-label gmaps-label">Gmaps :</h2>
            <p className="profile-field profile-value gmaps-value">Link</p>
            <button className="edit-button edit-button-6">Sesuaikan</button>
            <div className="edit-button-border edit-button-6" />
          </article>
        </section>
      </main>
    </div>
  );
}