import './galeri.css';

export default function GaleriPage() {
  return (
    <div className="galeri-container">
      <main>
        <header>
          <h1 className="page-header">Galeri - Jepun Bali Kencana</h1>
          <button className="action-button-add">
            <span className="action-button-add-text">Tambah Galeri</span>
            <div className="icon-add" />
          </button>
          <div className="action-button-filter">Produk</div>
        </header>

        <section>
          <article className="gallery-item gallery-item-1">
            <div className="item-thumbnail item-thumbnail-1" />
            <h2 className="item-title item-title-1">Produk 1</h2>
            <p className="item-description item-description-1">Penjelasan</p>
            <span className="item-category-label item-category-label-1">Ketegori</span>
            <span className="item-category-value item-category-value-1">Tanaman</span>
            <span className="item-stock-label item-stock-label-1">Stok</span>
            <span className="item-stock-value item-stock-value-1">1</span>
            <button className="item-delete-button-text item-delete-button-text-1">Hapus</button>
            <div className="item-delete-button-border item-delete-button-border-1" />
            <div className="item-edit-icon-base item-edit-icon-1-base" />
            <div className="item-edit-icon-overlay item-edit-icon-1-overlay" />
          </article>

          <article className="gallery-item gallery-item-2">
            <div className="item-thumbnail item-thumbnail-2" />
            <h2 className="item-title item-title-2">Produk 1</h2>
            <p className="item-description item-description-2">Penjelasan</p>
            <span className="item-category-label item-category-label-2">Ketegori</span>
            <span className="item-category-value item-category-value-2">Tanaman</span>
            <span className="item-stock-label item-stock-label-2">Stok</span>
            <span className="item-stock-value item-stock-value-2">1</span>
            <button className="item-delete-button-text item-delete-button-text-2">Hapus</button>
            <div className="item-delete-button-border item-delete-button-border-2" />
            <div className="item-edit-icon-base item-edit-icon-2-base" />
            <div className="item-edit-icon-overlay item-edit-icon-2-overlay" />
          </article>

          <article className="gallery-item gallery-item-3">
            <div className="item-thumbnail item-thumbnail-3" />
            <h2 className="item-title item-title-3">Produk 1</h2>
            <p className="item-description item-description-3">Penjelasan</p>
            <span className="item-category-label item-category-label-3">Ketegori</span>
            <span className="item-category-value item-category-value-3">Tanaman</span>
            <span className="item-stock-label item-stock-label-3">Stok</span>
            <span className="item-stock-value item-stock-value-3">1</span>
            <button className="item-delete-button-text item-delete-button-text-3">Hapus</button>
            <div className="item-delete-button-border item-delete-button-border-3" />
            <div className="item-edit-icon-base item-edit-icon-3-base" />
            <div className="item-edit-icon-overlay item-edit-icon-3-overlay" />
          </article>

          <article className="gallery-item gallery-item-4">
            <div className="item-thumbnail item-thumbnail-4" />
            <h2 className="item-title item-title-4">Produk 1</h2>
            <p className="item-description item-description-4">Penjelasan</p>
            <span className="item-category-label item-category-label-4">Ketegori</span>
            <span className="item-category-value item-category-value-4">Tanaman</span>
            <span className="item-stock-label item-stock-label-4">Stok</span>
            <span className="item-stock-value item-stock-value-4">1</span>
            <button className="item-delete-button-text item-delete-button-text-4">Hapus</button>
            <div className="item-delete-button-border item-delete-button-border-4" />
            <div className="item-edit-icon-base item-edit-icon-4-base" />
            <div className="item-edit-icon-overlay item-edit-icon-4-overlay" />
          </article>

          <article className="gallery-item gallery-item-5">
            <div className="item-thumbnail item-thumbnail-5" />
            <h2 className="item-title item-title-5">Produk 1</h2>
            <p className="item-description item-description-5">Penjelasan</p>
            <span className="item-category-label item-category-label-5">Ketegori</span>
            <span className="item-category-value item-category-value-5">Tanaman</span>
            <span className="item-stock-label item-stock-label-5">Stok</span>
            <span className="item-stock-value item-stock-value-5">1</span>
            <button className="item-delete-button-text item-delete-button-text-5">Hapus</button>
            <div className="item-delete-button-border item-delete-button-border-5" />
            <div className="item-edit-icon-base item-edit-icon-5-base" />
            <div className="item-edit-icon-overlay item-edit-icon-5-overlay" />
          </article>

          <article className="gallery-item gallery-item-6">
            <div className="item-thumbnail item-thumbnail-6" />
            <h2 className="item-title item-title-6">Produk 1</h2>
            <p className="item-description item-description-6">Penjelasan</p>
            <span className="item-category-label item-category-label-6">Ketegori</span>
            <span className="item-category-value item-category-value-6">Tanaman</span>
            <span className="item-stock-label item-stock-label-6">Stok</span>
            <span className="item-stock-value item-stock-value-6">1</span>
            <button className="item-delete-button-text item-delete-button-text-6">Hapus</button>
            <div className="item-delete-button-border item-delete-button-border-6" />
            <div className="item-edit-icon-base item-edit-icon-6-base" />
            <div className="item-edit-icon-overlay item-edit-icon-6-overlay" />
          </article>
        </section>
      </main>
    </div>
  );
}