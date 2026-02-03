// Haupt-JavaScript für das Gleitzeit-Dashboard 2026 - 24-Stunden-Woche

// ===================== HILFSFUNKTIONEN (MÜSSEN ZUERST KOMMEN!) =====================
function parseTimeToMinutes(timeStr) {
    // Konvertiert Zeitstring "hh:mm" in Minuten
    if (!timeStr || timeStr.trim() === '') return 0;
    
    const isNegative = timeStr.startsWith('-');
    const cleanTime = isNegative ? timeStr.substring(1) : timeStr;
    
    // Unterstützt sowohl "hh:mm" als auch "h:mm"
    const parts = cleanTime.split(':');
    if (parts.length !== 2) return 0;
    
    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;
    
    const totalMinutes = hours * 60 + minutes;
    return isNegative ? -totalMinutes : totalMinutes;
}

function formatMinutesToTime(minutes) {
    // Konvertiert Minuten zurück in "hh:mm" Format
    const isNegative = minutes < 0;
    const absMinutes = Math.abs(minutes);
    
    const hours = Math.floor(absMinutes / 60);
    const mins = absMinutes % 60;
    
    return `${isNegative ? '-' : ''}${hours}:${mins.toString().padStart(2, '0')}`;
}

function parseTimeToTimeString(timeStr) {
    // Konvertiert Zeitstring "hh:mm" in ein lesbares Format
    if (!timeStr) return "0:00";
    return timeStr;
}

function calculateMonthlyAverage(gleitzeitStr) {
    const minutes = parseTimeToMinutes(gleitzeitStr);
    const averageMinutes = minutes / 12;
    return formatMinutesToTime(averageMinutes);
}

function formatHoursToWeekly(timeStr) {
    const minutes = parseTimeToMinutes(timeStr);
    const weeklyHours = (minutes / 60) / 52; // 52 Wochen im Jahr
    return `${weeklyHours.toFixed(1)}h/Woche`;
}

function calculateCompletionRate() {
    const sollMinutes = parseTimeToMinutes(yearData.totalSollzeit);
    const arbeitsMinutes = parseTimeToMinutes(yearData.totalArbeitszeit);
    
    if (sollMinutes === 0) return 100;
    return Math.round((arbeitsMinutes / sollMinutes) * 100);
}

function getMonthsWithActualData() {
    const months = [];
    Object.values(yearData.months).forEach(month => {
        if ((month.tage && month.tage.length > 0) || month.arbeitszeit !== month.sollzeit) {
            months.push(month.monthName);
        }
    });
    return months;
}

// ===================== HAUPTPROGRAMM =====================

document.addEventListener('DOMContentLoaded', function() {
    // Dashboard initialisieren
    initDashboard();
    
    // Event-Listener für Datenimport-Buttons
    document.getElementById('update-data-btn')?.addEventListener('click', function() {
        updateMonthData();
    });
    
    document.getElementById('load-sample-btn')?.addEventListener('click', function() {
        loadSampleData();
    });
});

// Dashboard initialisieren
function initDashboard() {
    // Jahresübersicht laden
    loadYearSummary();
    
    // Monatsdaten laden
    loadMonthData('january');
    loadMonthData('february');
    loadMonthData('march');
    loadMonthData('april');
    loadMonthData('may');
    loadMonthData('june');
    loadMonthData('july');
    loadMonthData('august');
    loadMonthData('september');
    loadMonthData('october');
    loadMonthData('november');
    loadMonthData('december');
    
    // Diagramm erstellen
    createAnnualChart();
    
    // Event-Listener für Tabs hinzufügen
    setupTabListeners();
}

// ... (der REST des Codes bleibt gleich - ab loadYearSummary() weiter)