import CurrentYear from '@/components/CurrentYear'


export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[#0F1A0E] mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">

            {/* Main footer row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

                {/* Brand */}
                <div>
                <p className="font-display text-lg text-[#F5F0E8] mb-3">
                    Broto da Natureza
                </p>
                <p className="text-sm text-[#8CB89A] leading-relaxed max-w-xs">
                    Um arquivo vivo de conhecimento sobre plantas medicinais,
                    reunido com cuidado e baseado em fontes históricas e científicas.
                </p>
                </div>

                {/* Nav */}
                <div>
                <p className="text-xs tracking-widest uppercase text-[#8CB89A] mb-4">
                    Explorar
                </p>
                <ul className="flex flex-col gap-2">
                    {[
                    { href: '/plantas',   label: 'Enciclopédia' },
                    { href: '/blog',      label: 'Artigos' },
                    { href: '/dashboard', label: 'Dashboard' },
                    ].map(({ href, label }) => (
                    <li key={href}>
                        <a
                        href={href}
                        className="text-sm text-[#B8B0A0] hover:text-[#2D9E72] transition-colors duration-200"
                        >
                        {label}
                        </a>
                    </li>
                    ))}
                </ul>
                </div>

                {/* Disclaimer */}
                <div>
                <p className="text-xs tracking-widest uppercase text-[#8CB89A] mb-4">
                    Aviso
                </p>
                <p className="text-sm text-[#B8B0A0] leading-relaxed">
                    As informações aqui presentes têm caráter exclusivamente educativo
                    e não substituem orientação médica ou farmacêutica profissional.
                </p>
                </div>

            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                <span className="text-xs text-[#8CB89A]">
                © <CurrentYear /> O Broto da Natureza — fins educativos
                </span>
                <span className="text-xs text-[#8CB89A]/40 italic">
                feito com cuidado
                </span>
            </div>

            </div>
        </footer>
    )
}    