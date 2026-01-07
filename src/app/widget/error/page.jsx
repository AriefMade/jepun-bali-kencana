'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';



export default function ErrorPage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-9xl font-bold text-white mb-4 animate-bounce">
                        404
                    </h1>
                    <div className="relative">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Oops! Halaman Tidak Ditemukan
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Sepertinya kamu tersesat di kebun Jepun Bali Kencana 🌺
                        </p>
                    </div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
                    <div className="text-center mb-6">
                        <div className="text-8xl mb-4 animate-pulse">🌸</div>
                        <p className="text-white/90 text-lg leading-relaxed">
                            Halaman yang kamu cari mungkin telah dipindahkan, dihapus, atau tidak pernah ada.
                            Tapi jangan khawatir, kami akan membawamu kembali ke halaman utama.
                        </p>
                    </div>
                    <div className="bg-white/20 rounded-2xl p-6 mb-6">
                        <div className="text-center">
                            <p className="text-white/90 mb-2">Dialihkan dalam</p>
                            <div className="text-6xl font-bold text-white animate-pulse">
                                {countdown}
                            </div>
                            <p className="text-white/90 mt-2">detik</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => router.push('/')}
                            className="flex-1 bg-white text-purple-600 font-semibold py-4 px-6 rounded-xl hover:bg-purple-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
                        >
                            🏠 Kembali ke Beranda
                        </button>
                        <button
                            onClick={() => router.back()}
                            className="flex-1 bg-white/20 text-white font-semibold py-4 px-6 rounded-xl hover:bg-white/30 transform hover:scale-105 transition-all duration-200 border-2 border-white/40"
                        >
                            ⬅️ Halaman Sebelumnya
                        </button>
                    </div>
                </div>

                <div className="text-center text-white/80 text-sm">
                    <p>Butuh bantuan? Hubungi kami di <span className="font-semibold">support@jepunbalikencana.com</span></p>
                </div>
            </div>
        </div>
    );
}