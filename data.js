// DATENSTRUKTUR FÜR GLEITZEIT-DASHBOARD 2026
// Diese Datei können Sie einfach mit Ihren Excel-Daten aktualisieren

const yearData = {
    year: 2026,
    employeeName: "Siun Diefenbach",
    workSchedule: "24-Stunden-Woche (Montag, Dienstag, Mittwoch)",
    
    // Jahresgesamtdaten
    totalSollzeit: "1,344:00",
    totalArbeitszeit: "1,330:25",
    totalGleitzeit: "-13:35",
    totalDifferenz: "-13:35",
    
    // Monatsdaten
    months: {
        january: {
            monthName: "Januar",
            year: 2026,
            sollzeit: "112:00",
            arbeitszeit: "110:15",
            gleitzeit: "-1:45",
            differenz: "-1:45",
            previousMonthBalance: "0:00",
            tage: [
                {
                    datum: "01.01 Do",
                    kommeGest: "",
                    kommeGer: "",
                    kommeBew: "",
                    geheGest: "",
                    geheGer: "",
                    geheBew: "",
                    abwesenheit: "Feiertag",
                    azProfil: "24 Stunden Woche (mo,di,mi)",
                    pause: "",
                    sollzeit: "0:00",
                    arbeitszeit: "0:00",
                    gleitzeitTag: "0:00",
                    gleitzeitMonat: "0:00",
                    gleitzeitGesamt: "0:00",
                    feiertag: true,
                    keinArbeitstag: false
                },
                {
                    datum: "02.02 Fr",
                    kommeGest: "11:05",
                    kommeGer: "11:05",
                    kommeBew: "11:05",
                    geheGest: "19:20",
                    geheGer: "19:20",
                    geheBew: "19:20",
                    abwesenheit: "",
                    azProfil: "24 Stunden Woche (mo,di,mi)",
                    pause: "0:30",
                    sollzeit: "8:00",
                    arbeitszeit: "7:45",
                    gleitzeitTag: "-0:15",
                    gleitzeitMonat: "-0:15",
                    gleitzeitGesamt: "-0:15",
                    feiertag: false,
                    keinArbeitstag: false
                }
                // Weitere Tage hier einfügen...
            ]
        },
        
        february: {
            monthName: "Februar",
            year: 2026,
            sollzeit: "104:00",
            arbeitszeit: "103:10",
            gleitzeit: "-0:50",
            differenz: "-0:50",
            previousMonthBalance: "-1:45",
            tage: [
                // Februardaten hier einfügen...
            ]
        },
        
        march: {
            monthName: "März",
            year: 2026,
            sollzeit: "112:00",
            arbeitszeit: "109:40",
            gleitzeit: "-2:20",
            differenz: "-2:20",
            previousMonthBalance: "-2:35",
            tage: [
                // Märzdaten hier einfügen...
            ]
        },
        
        april: {
            monthName: "April",
            year: 2026,
            sollzeit: "112:00",
            arbeitszeit: "115:30",
            gleitzeit: "+3:30",
            differenz: "+3:30",
            previousMonthBalance: "-4:55",
            tage: [
                // April-Daten basierend auf Ihrer Excel-Datei
                {
                    datum: "Vormonat",
                    kommeGest: "",
                    kommeGer: "",
                    kommeBew: "",
                    geheGest: "",
                    geheGer: "",
                    geheBew: "",
                    abwesenheit: "",
                    azProfil: "",
                    pause: "",
                    sollzeit: "",
                    arbeitszeit: "",
                    gleitzeitTag: "",
                    gleitzeitMonat: "",
                    gleitzeitGesamt: "-4:55",
                    feiertag: false,
                    keinArbeitstag: true
                },
                {
                    datum: "01.04 Mi",
                    kommeGest: "",
                    kommeGer: "",
                    kommeBew: "",
                    geheGest: "",
                    geheGer: "",
                    geheBew: "",
                    abwesenheit: "",
                    azProfil: "24 Stunden Woche (mo,di,mi)",
                    pause: "",
                    sollzeit: "8:00",
                    arbeitszeit: "",
                    gleitzeitTag: "-8:00",
                    gleitzeitMonat: "-8:00",
                    gleitzeitGesamt: "-12:55",
                    feiertag: false,
                    keinArbeitstag: true
                },
                {
                    datum: "02.04 Do",
                    kommeGest: "15:00",
                    kommeGer: "15:00",
                    kommeBew: "15:00",
                    geheGest: "19:12",
                    geheGer: "19:12",
                    geheBew: "19:12",
                    abwesenheit: "",
                    azProfil: "24 Stunden Woche (mo,di,mi)",
                    pause: "0:00",
                    sollzeit: "8:00",
                    arbeitszeit: "4:12",
                    gleitzeitTag: "-3:48",
                    gleitzeitMonat: "-11:48",
                    gleitzeitGesamt: "-16:43",
                    feiertag: false,
                    keinArbeitstag: false
                }
                // Weitere April-Tage hier einfügen...
            ]
        },
        
        may: {
            monthName: "Mai",
            year: 2026,
            sollzeit: "112:00",
            arbeitszeit: "114:20",
            gleitzeit: "+2:20",
            differenz: "+2:20",
            previousMonthBalance: "-1:25",
            tage: [
                // Maidaten hier einfügen...
            ]
        },
        
        june: {
            monthName: "Juni",
            year: 2026,
            sollzeit: "104:00",
            arbeitszeit: "102:45",
            gleitzeit: "-1:15",
            differenz: "-1:15",
            previousMonthBalance: "+0:55",
            tage: [
                // Junidaten hier einfügen...
            ]
        },
        
        july: {
            monthName: "Juli",
            year: 2026,
            sollzeit: "112:00",
            arbeitszeit: "110:50",
            gleitzeit: "-1:10",
            differenz: "-1:10",
            previousMonthBalance: "-0:20",
            tage: [
                // Julidaten hier einfügen...
            ]
        },
        
        august: {
            monthName: "August",
            year: 2026,
            sollzeit: "112:00",
            arbeitszeit: "113:30",
            gleitzeit: "+1:30",
            differenz: "+1:30",
            previousMonthBalance: "-1:30",
            tage: [
                // Augustdaten hier einfügen...
            ]
        },
        
        september: {
            monthName: "September",
            year: 2026,
            sollzeit: "112:00",
            arbeitszeit: "110:20",
            gleitzeit: "-1:40",
            differenz: "-1:40",
            previousMonthBalance: "+0:00",
            tage: [
                // Septemberdaten hier einfügen...
            ]
        },
        
        october: {
            monthName: "Oktober",
            year: 2026,
            sollzeit: "112:00",
            arbeitszeit: "111:15",
            gleitzeit: "-0:45",
            differenz: "-0:45",
            previousMonthBalance: "-1:40",
            tage: [
                // Oktoberdaten hier einfügen...
            ]
        },
        
        november: {
            monthName: "November",
            year: 2026,
            sollzeit: "104:00",
            arbeitszeit: "103:10",
            gleitzeit: "-0:50",
            differenz: "-0:50",
            previousMonthBalance: "-2:25",
            tage: [
                // Novemberdaten hier einfügen...
            ]
        },
        
        december: {
            monthName: "Dezember",
            year: 2026,
            sollzeit: "96:00",
            arbeitszeit: "94:40",
            gleitzeit: "-1:20",
            differenz: "-1:20",
            previousMonthBalance: "-3:15",
            tage: [
                // Dezemberdaten hier einfügen...
            ]
        }
    },
    
    // Feiertage 2026
    holidays: {
        january: ["01.01 Donnerstag - Neujahr"],
        april: ["18.04 Samstag - Karfreitag", "21.04 Dienstag - Ostermontag"],
        may: ["01.05 Freitag - Tag der Arbeit", "29.05 Freitag - Christi Himmelfahrt"],
        june: ["08.06 Montag - Pfingstmontag"],
        october: ["03.10 Samstag - Tag der Deutschen Einheit"],
        december: ["25.12 Freitag - 1. Weihnachtsfeiertag", "26.12 Samstag - 2. Weihnachtsfeiertag"]
    }
};