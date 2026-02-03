// Jahressummendaten für 2026 - AKTUALISIERT für 24-Stunden-Woche
const yearData = {
    year: 2026,
    // Jahreswerte für 24-Stunden-Woche (Montag, Dienstag, Mittwoch)
    // 24h/Woche = ca. 96h/Monat (12 Arbeitstage) 
    totalSollzeit: "1,128:00",    // 24h × 47 Wochen = 1128h (statt 1344h bei 40h-Woche)
    totalArbeitszeit: "1,156:33", // 124:33 (Januar) + 1032:00 (Restjahr als Sollzeit)
    totalGleitzeit: "+28:33",     // Tatsächlich +28:33 im Januar
    totalDifferenz: "+28:33",
    months: {
        january: {
            monthName: "Januar",
            year: 2026,
            sollzeit: "96:00",     // 12 Arbeitstage × 8h = 96h
            arbeitszeit: "124:33", // Aus Excel Summe
            gleitzeit: "+28:33",   // +28:33 Überschuss
            differenz: "+28:33",
            tage: [
                // ... (hier bleiben deine bestehenden Tagesdaten aus der Excel-Datei)
                // Ab Zeile 10 bis zum Ende des Januar-Arrays kopieren
            ]
        },
        february: {
            monthName: "Februar",
            year: 2026,
            sollzeit: "88:00",     // 11 Arbeitstage × 8h = 88h
            arbeitszeit: "88:00",  // Platzhalter
            gleitzeit: "0:00",
            differenz: "0:00",
            tage: []
        },
        march: {
            monthName: "März",
            year: 2026,
            sollzeit: "104:00",    // 13 Arbeitstage × 8h = 104h
            arbeitszeit: "104:00",
            gleitzeit: "0:00",
            differenz: "0:00",
            tage: []
        },
        april: {
            monthName: "April",
            year: 2026,
            sollzeit: "96:00",     // 12 Arbeitstage × 8h = 96h
            arbeitszeit: "96:00",
            gleitzeit: "0:00",
            differenz: "0:00",
            tage: []
        },
        may: {
            monthName: "Mai",
            year: 2026,
            sollzeit: "96:00",     // 12 Arbeitstage × 8h = 96h
            arbeitszeit: "96:00",
            gleitzeit: "0:00",
            differenz: "0:00",
            tage: []
        },
        june: {
            monthName: "Juni",
            year: 2026,
            sollzeit: "88:00",     // 11 Arbeitstage × 8h = 88h (Pfingstmontag)
            arbeitszeit: "88:00",
            gleitzeit: "0:00",
            differenz: "0:00",
            tage: []
        },
        july: {
            monthName: "Juli",
            year: 2026,
            sollzeit: "104:00",    // 13 Arbeitstage × 8h = 104h
            arbeitszeit: "104:00",
            gleitzeit: "0:00",
            differenz: "0:00",
            tage: []
        },
        august: {
            monthName: "August",
            year: 2026,
            sollzeit: "96:00",     // 12 Arbeitstage × 8h = 96h
            arbeitszeit: "96:00",
            gleitzeit: "0:00",
            differenz: "0:00",
            tage: []
        },
        september: {
            monthName: "September",
            year: 2026,
            sollzeit: "96:00",     // 12 Arbeitstage × 8h = 96h
            arbeitszeit: "96:00",
            gleitzeit: "0:00",
            differenz: "0:00",
            tage: []
        },
        october: {
            monthName: "Oktober",
            year: 2026,
            sollzeit: "96:00",     // 12 Arbeitstage × 8h = 96h
            arbeitszeit: "96:00",
            gleitzeit: "0:00",
            differenz: "0:00",
            tage: []
        },
        november: {
            monthName: "November",
            year: 2026,
            sollzeit: "88:00",     // 11 Arbeitstage × 8h = 88h
            arbeitszeit: "88:00",
            gleitzeit: "0:00",
            differenz: "0:00",
            tage: []
        },
        december: {
            monthName: "Dezember",
            year: 2026,
            sollzeit: "72:00",     // 9 Arbeitstage × 8h = 72h (Weihnachtsfeiertage)
            arbeitszeit: "72:00",
            gleitzeit: "0:00",
            differenz: "0:00",
            tage: []
        }
    }
};