export default function LanguageSwitcher({ locales = [], currentLocale = 'id' }) {
    return (
        <div className="inline-flex rounded-full border border-[#050B0A]/10 bg-white p-1 shadow-sm">
            {locales.map((locale) => (
                <a
                    key={locale.code}
                    href={locale.url}
                    className={
                        'rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] transition ' +
                        (locale.code === currentLocale
                            ? 'bg-[#050B0A] text-white'
                            : 'text-[#050B0A]/60 hover:bg-[#050B0A]/5 hover:text-[#050B0A]')
                    }
                >
                    {locale.code}
                </a>
            ))}
        </div>
    );
}