import '@/src/app/admin/auth/login/page.css'
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
<div className="auth-wrapper">
    <div className="form" style={{display: 'flex', flexDirection: 'row', overflow: 'hidden'}}>
        
        <div style={{width: '53.5px', background: '#2B8663', borderRadius: '34px 0 0 34px'}}></div>
        <div style={{flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px', padding: '40px'}}>

            <aside className="auth-pict" style={{flex: 1}}>
                <img src="/pana.png" alt="auth-image" style={{width: '100%', height: 'auto'}} />
            </aside>
            <div style={{flex: 1}}>
                <text className='header'>Hello Admin</text>
                <div style={{marginTop: '70px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    <div style={{width: '100%', height: '72.3px', background: '#F3F3F3', borderRadius: 34, padding: '0 20px'}}> 
                        <input type="email" placeholder="Email" style={{width: '100%', height: '100%', border: 'none', background: 'transparent', outline: 'none'}} />
                    </div>
                    <div style={{width: '100%', height: '72.3px', background: '#F3F3F3', borderRadius: 34, padding: '0 20px'}}>
                        <input type="password" placeholder="Password" style={{width: '100%', height: '100%', border: 'none', background: 'transparent', outline: 'none'}} />
                    </div>
                    <button type="submit" style={{width: '100%', height: '72.3px', background: '#2C8464', borderRadius: 34, border: 'none', cursor: 'pointer', marginTop: '70px'}}>
                        <text className='text-btn'>Lets Start</text>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
);
}