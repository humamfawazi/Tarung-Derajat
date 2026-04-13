export default function LanguageSwitcher({ locales = [], currentLocale = 'id' }) {
    return (
        <div className="inline-flex rounded-full border border-[#1d4ed8]/10 bg-white p-1 shadow-sm">
            {locales.map((locale) => (
                <a
                    key={locale.code}
                    href={locale.url}
                    className={
                        'rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] transition ' +
                        (locale.code === currentLocale
                            ? 'bg-[#1d4ed8] text-white'
                            : 'text-[#111827]/60 hover:bg-[#eff6ff] hover:text-[#1d4ed8]')
                    }
                >
                    {locale.code}
                </a>
            ))}
        </div>
    );
}