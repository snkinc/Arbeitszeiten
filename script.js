// Haupt-JavaScript für das Gleitzeit-Dashboard 2026 - 24-Stunden-Woche

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

// Jahresübersicht laden - OPTIMIERT für 24h-Woche
function loadYearSummary() {
    const year = yearData.year;
    const totalSollzeit = yearData.totalSollzeit;
    const totalArbeitszeit = yearData.totalArbeitszeit;
    const totalGleitzeit = yearData.totalGleitzeit;
    const totalDifferenz = yearData.totalDifferenz;
    
    // Jahreskennzahlen-Karten erstellen
    const yearCardsContainer = document.getElementById('year-summary-cards');
    
    // Berechne tatsächlichen Durchschnitt basierend auf bisherigen Daten
    const monthsWithData = getMonthsWithActualData();
    const monthlyAverage = monthsWithData.length > 0 
        ? formatMinutesToTime(parseTimeToMinutes(totalGleitzeit) / monthsWithData.length)
        : "0:00";
    
    yearCardsContainer.innerHTML = `
        <div class="col-md-3 col-sm-6">
            <div class="card summary-card">
                <div class="card-header bg-primary text-white">
                    <i class="bi bi-calendar-year"></i> Jahresbilanz ${year}
                </div>
                <div class="card-body text-center">
                    <div class="time-display ${totalGleitzeit.startsWith('-') ? 'negative-time' : 'positive-time'}">${totalGleitzeit}</div>
                    <p class="card-text">Gesamte Gleitzeit ${year}</p>
                    <small class="text-muted">24-Stunden-Woche</small>
                </div>
            </div>
        </div>
        
        <div class="col-md-3 col-sm-6">
            <div class="card summary-card">
                <div class="card-header bg-info text-white">
                    <i class="bi bi-clock-history"></i> Jahres-Sollzeit
                </div>
                <div class="card-body text-center">
                    <div class="time-display neutral-time">${totalSollzeit}</div>
                    <p class="card-text">Gesamte Sollarbeitszeit ${year}</p>
                    <small class="text-muted">24h/Woche = ${formatHoursToWeekly(totalSollzeit)}</small>
                </div>
            </div>
        </div>
        
        <div class="col-md-3 col-sm-6">
            <div class="card summary-card">
                <div class="card-header bg-success text-white">
                    <i class="bi bi-check-circle"></i> Jahres-Arbeitszeit
                </div>
                <div class="card-body text-center">
                    <div class="time-display neutral-time">${totalArbeitszeit}</div>
                    <p class="card-text">Tatsächlich gearbeitet ${year}</p>
                    <small class="text-muted">${calculateCompletionRate()}% vom Soll</small>
                </div>
            </div>
        </div>
        
        <div class="col-md-3 col-sm-6">
            <div class="card summary-card">
                <div class="card-header bg-warning text-white">
                    <i class="bi bi-graph-up-arrow"></i> Monatsdurchschnitt
                </div>
                <div class="card-body text-center">
                    <div class="time-display ${monthlyAverage.startsWith('-') ? 'negative-time' : 'positive-time'}">${monthlyAverage}</div>
                    <p class="card-text">Durchschn. Gleitzeit pro Monat</p>
                    <small class="text-muted">Basierend auf ${monthsWithData.length} Monat(en)</small>
                </div>
            </div>
        </div>
    `;
    
    // Jahresübersichtstabelle erstellen
    loadAnnualSummaryTable();
}

// Hilfsfunktion: Wochenstunden formatieren
function formatHoursToWeekly(timeStr) {
    const minutes = parseTimeToMinutes(timeStr);
    const weeklyHours = (minutes / 60) / 52; // 52 Wochen im Jahr
    return `${weeklyHours.toFixed(1)}h/Woche`;
}

// Hilfsfunktion: Erfüllungsgrad berechnen
function calculateCompletionRate() {
    const sollMinutes = parseTimeToMinutes(yearData.totalSollzeit);
    const arbeitsMinutes = parseTimeToMinutes(yearData.totalArbeitszeit);
    
    if (sollMinutes === 0) return 100;
    return Math.round((arbeitsMinutes / sollMinutes) * 100);
}

// Hilfsfunktion: Monate mit tatsächlichen Daten finden
function getMonthsWithActualData() {
    const months = [];
    Object.values(yearData.months).forEach(month => {
        // Hat der Monat Tagesdaten oder weicht die Arbeitszeit von der Sollzeit ab?
        if ((month.tage && month.tage.length > 0) || month.arbeitszeit !== month.sollzeit) {
            months.push(month.monthName);
        }
    });
    return months;
}

// Jahresübersichtstabelle laden
function loadAnnualSummaryTable() {
    const tableBody = document.getElementById('annual-summary-body');
    let html = '';
    let cumulativeBalance = 0;
    let quarter = 1;
    
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 
                   'july', 'august', 'september', 'october', 'november', 'december'];
    
    months.forEach((monthKey, index) => {
        const month = yearData.months[monthKey];
        
        // Quartalsüberschrift einfügen
        if (index % 3 === 0) {
            html += `
                <tr class="quarter-divider">
                    <td colspan="7"><strong>${quarter}. Quartal</strong></td>
                </tr>
            `;
            quarter++;
        }
        
        cumulativeBalance += parseTimeToMinutes(month.gleitzeit);
        const cumulativeTime = formatMinutesToTime(cumulativeBalance);
        
        // Status-Badge basierend auf Gleitzeit
        let statusBadge = '';
        const gleitzeitMinutes = parseTimeToMinutes(month.gleitzeit);
        
        // Angepasste Schwellenwerte für 24-Stunden-Woche
        if (gleitzeitMinutes > 120) { // > 2 Stunden
            statusBadge = '<span class="badge bg-success">Sehr gut im Plus</span>';
        } else if (gleitzeitMinutes > 30) { // > 0.5 Stunden
            statusBadge = '<span class="badge bg-success">Gut im Plus</span>';
        } else if (gleitzeitMinutes > 0) {
            statusBadge = '<span class="badge bg-success">Plus</span>';
        } else if (gleitzeitMinutes > -30) {
            statusBadge = '<span class="badge bg-warning">Leicht im Minus</span>';
        } else if (gleitzeitMinutes > -120) {
            statusBadge = '<span class="badge bg-warning">Defizit</span>';
        } else {
            statusBadge = '<span class="badge bg-danger">Großes Defizit</span>';
        }
        
        // Info-Symbol für Monate mit echten Daten
        const hasRealData = month.tage && month.tage.length > 0;
        const dataIndicator = hasRealData ? ' <i class="bi bi-check-circle text-success" title="Echte Daten vorhanden"></i>' : '';
        
        html += `
            <tr>
                <td>${month.monthName}${dataIndicator}</td>
                <td>${month.sollzeit}</td>
                <td>${month.arbeitszeit}</td>
                <td class="${month.differenz.startsWith('-') ? 'negative-time' : 'positive-time'}">${month.differenz}</td>
                <td class="${month.gleitzeit.startsWith('-') ? 'negative-time' : 'positive-time'}">${month.gleitzeit}</td>
                <td class="${cumulativeTime.startsWith('-') ? 'negative-time' : 'positive-time'}">${cumulativeTime}</td>
                <td>${statusBadge}</td>
            </tr>
        `;
    });
    
    // Jahresgesamtzeile
    html += `
        <tr class="annual-total">
            <td><strong>Gesamt ${yearData.year}</strong></td>
            <td><strong>${yearData.totalSollzeit}</strong></td>
            <td><strong>${yearData.totalArbeitszeit}</strong></td>
            <td class="${yearData.totalDifferenz.startsWith('-') ? 'negative-time' : 'positive-time'}"><strong>${yearData.totalDifferenz}</strong></td>
            <td class="${yearData.totalGleitzeit.startsWith('-') ? 'negative-time' : 'positive-time'}"><strong>${yearData.totalGleitzeit}</strong></td>
            <td class="${yearData.totalGleitzeit.startsWith('-') ? 'negative-time' : 'positive-time'}"><strong>${yearData.totalGleitzeit}</strong></td>
            <td><span class="badge ${yearData.totalGleitzeit.startsWith('-') ? 'bg-danger' : 'bg-success'}"><strong>${yearData.totalGleitzeit.startsWith('-') ? 'Gesamtdefizit' : 'Gesamtplus'}</strong></span></td>
        </tr>
    `;
    
    tableBody.innerHTML = html;
    
    // Event-Listener für klickbare Zeitwerte hinzufügen
    addTimeClickListeners();
}

// ... (restlicher Code von script.js bleibt gleich - ab Zeile 379)
// Stelle sicher, dass du den REST des script.js Codes von der vorherigen Version beibehältst
// insbesondere die loadMonthData(), createAnnualChart() und Hilfsfunktionen