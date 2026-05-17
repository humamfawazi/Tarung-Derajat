import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const copy = {
    id: {
        title: 'Kompetisi & Event',
        heading: 'Kompetisi & Event',
        description: 'Ikuti keseruan pertandingan dan event terbaru Tarung Derajat di sini.',
        videosLabel: 'Dokumentasi Video',
    },
    en: {
        title: 'Competition & Events',
        heading: 'Competition & Events',
        description: 'Follow the excitement of matches and latest Tarung Derajat events here.',
        videosLabel: 'Video Documentation',
    },
};

export default function KompetisiEvent({ educationSections, calendars = [], locale = 'id' }) {
    const t = copy[locale] || copy.id;
    const [activeMonth, setActiveMonth] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvents, setSelectedEvents] = useState([]);

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('id-ID', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatTime = (date) => {
        const d = new Date(date);
        return d.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatMonthLabel = (date) => {
        return date.toLocaleDateString('id-ID', {
            month: 'long',
            year: 'numeric',
        });
    };

    const buildDateKey = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const eventsByDate = calendars.reduce((acc, event) => {
        const start = new Date(event.start_date);
        const end = new Date(event.end_date);
        const cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());

        while (cursor <= endDate) {
            const key = buildDateKey(cursor);
            if (!acc[key]) acc[key] = [];
            acc[key].push(event);
            cursor.setDate(cursor.getDate() + 1);
        }

        return acc;
    }, {});

    const getCalendarDays = () => {
        const year = activeMonth.getFullYear();
        const month = activeMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const leadingBlanks = (firstDay.getDay() + 6) % 7;

        const days = [];
        for (let i = 0; i < leadingBlanks; i += 1) {
            days.push(null);
        }
        for (let day = 1; day <= daysInMonth; day += 1) {
            days.push(new Date(year, month, day));
        }
        return days;
    };

    const openDateModal = (dateKey) => {
        const events = eventsByDate[dateKey] || [];
        if (events.length === 0) return;
        setSelectedDate(dateKey);
        setSelectedEvents(events);
    };

    const closeModal = () => {
        setSelectedDate(null);
        setSelectedEvents([]);
    };

    return (
        <PublicLayout>
            <Head title={t.title} />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-[#111827]">{t.heading}</h1>
                    <p className="text-lg text-[#111827]/70">{t.description}</p>
                </div>

                <div className="mb-12 rounded-2xl border border-[#1d4ed8]/10 bg-white p-8 shadow-sm">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-[#111827]">Kalender Jadwal</h2>
                            <p className="text-sm text-[#111827]/60">
                                Klik tanggal yang bertanda untuk melihat detail acara.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    setActiveMonth(
                                        new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1),
                                    )
                                }
                                className="rounded-full border border-[#1d4ed8]/20 px-3 py-2 text-sm font-semibold text-[#1d4ed8] transition hover:bg-[#1d4ed8] hover:text-white"
                            >
                                Prev
                            </button>
                            <span className="text-sm font-semibold text-[#111827]">
                                {formatMonthLabel(activeMonth)}
                            </span>
                            <button
                                type="button"
                                onClick={() =>
                                    setActiveMonth(
                                        new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1),
                                    )
                                }
                                className="rounded-full border border-[#1d4ed8]/20 px-3 py-2 text-sm font-semibold text-[#1d4ed8] transition hover:bg-[#1d4ed8] hover:text-white"
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    {calendars.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-[#1d4ed8]/20 bg-[#f5f7ff]/50 p-8 text-center">
                            <p className="text-sm italic text-[#111827]/70">Belum ada jadwal kompetisi atau event.</p>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-[#1d4ed8]/10 bg-[#f8fafc] p-6">
                            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-[#111827]/60">
                                <div>Sen</div>
                                <div>Sel</div>
                                <div>Rab</div>
                                <div>Kam</div>
                                <div>Jum</div>
                                <div>Sab</div>
                                <div>Min</div>
                            </div>
                            <div className="mt-4 grid grid-cols-7 gap-2">
                                {getCalendarDays().map((date, index) => {
                                    if (!date) {
                                        return (
                                            <div key={`blank-${index}`} className="h-12 rounded-lg" />
                                        );
                                    }

                                    const dateKey = buildDateKey(date);
                                    const hasEvents = Boolean(eventsByDate[dateKey]);
                                    const isToday = buildDateKey(new Date()) === dateKey;

                                    return (
                                        <button
                                            key={dateKey}
                                            type="button"
                                            onClick={() => openDateModal(dateKey)}
                                            className={`relative flex h-12 items-center justify-center rounded-lg border text-sm font-semibold transition ${
                                                hasEvents
                                                    ? 'border-[#1d4ed8] bg-white text-[#1d4ed8] hover:bg-[#1d4ed8] hover:text-white'
                                                    : 'border-transparent text-[#111827]/50'
                                            } ${isToday ? 'ring-2 ring-[#1d4ed8]/30' : ''}`}
                                        >
                                            {date.getDate()}
                                            {hasEvents && (
                                                <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-[#1d4ed8]" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {educationSections && educationSections.length > 0 ? (
                        educationSections.map((section) => (
                            <div key={section.id} className="group rounded-2xl overflow-hidden border border-[#1d4ed8]/10 bg-white shadow-sm hover:shadow-md transition">
                                {section.image_path && (
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={section.image_path.startsWith('http') ? section.image_path : `/storage/${section.image_path}`}
                                            alt={section.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 to-transparent" />
                                        <h3 className="absolute bottom-6 left-6 right-6 text-2xl font-bold text-white">
                                            {section.title}
                                        </h3>
                                    </div>
                                )}
                                <div className="p-8">
                                    {!section.image_path && (
                                        <h3 className="text-2xl font-bold text-[#111827] mb-4">
                                            {section.title}
                                        </h3>
                                    )}
                                    <div className="prose prose-sm max-w-none text-[#111827]/70 leading-relaxed">
                                        {section.content}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 rounded-2xl border border-dashed border-[#1d4ed8]/20 bg-[#f5f7ff]/50">
                            <p className="text-[#111827]/70 text-sm italic">Belum ada informasi kompetisi atau event yang tersedia.</p>
                        </div>
                    )}
                </div>
            </div>

            {selectedDate && selectedEvents.length > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/50 px-4">
                    <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-[#111827]">Detail Jadwal</h3>
                                <p className="text-sm text-[#111827]/60">
                                    {formatDate(selectedDate)}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="rounded-full border border-[#1d4ed8]/20 px-3 py-2 text-sm font-semibold text-[#1d4ed8] transition hover:bg-[#1d4ed8] hover:text-white"
                            >
                                Tutup
                            </button>
                        </div>
                        <div className="space-y-4">
                            {selectedEvents.map((event) => (
                                <div key={event.id} className="rounded-xl border border-[#1d4ed8]/10 bg-[#f8fafc] p-4">
                                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                        <h4 className="text-base font-semibold text-[#111827]">{event.title}</h4>
                                        <span className="rounded-full bg-[#1d4ed8]/10 px-3 py-1 text-xs font-semibold text-[#1d4ed8]">
                                            {event.event_type === 'kompetisi' ? 'Kompetisi' : 'Event'}
                                        </span>
                                    </div>
                                    <div className="text-sm text-[#111827]/70">
                                        <div className="flex items-center gap-2">
                                            <span>📅</span>
                                            <span>
                                                {formatDate(event.start_date)}
                                                {new Date(event.end_date) > new Date(event.start_date) &&
                                                    ` - ${formatDate(event.end_date)}`}
                                            </span>
                                        </div>
                                        <div className="mt-1 flex items-center gap-2">
                                            <span>🕐</span>
                                            <span>
                                                {formatTime(event.start_date)}
                                                {new Date(event.end_date) > new Date(event.start_date) &&
                                                    ` - ${formatTime(event.end_date)}`}
                                            </span>
                                        </div>
                                        {event.location && (
                                            <div className="mt-1 flex items-center gap-2">
                                                <span>📍</span>
                                                <span>{event.location}</span>
                                            </div>
                                        )}
                                        {event.description && (
                                            <p className="mt-2 text-sm text-[#111827]/70">{event.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
