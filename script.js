// ===================== 1. HILFSFUNKTIONEN =====================
function parseTimeToMinutes(timeStr) {
    if (!timeStr || timeStr.trim() === '') return 0;
    const isNegative = timeStr.startsWith('-');
    const cleanTime = isNegative ? timeStr.substring(1) : timeStr;
    const parts = cleanTime.split(':');
    if (parts.length !== 2) return 0;
    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;
    const totalMinutes = hours * 60 + minutes;
    return isNegative ? -totalMinutes : totalMinutes;
}

function formatMinutesToTime(minutes) {
    const isNegative = minutes < 0;
    const absMinutes = Math.abs(minutes);
    const hours = Math.floor(absMinutes / 60);
    const mins = absMinutes % 60;
    return `${isNegative ? '-' : ''}${hours}:${mins.toString().padStart(2, '0')}`;
}

function formatHoursToWeekly(timeStr) {
    const minutes = parseTimeToMinutes(timeStr);
    const weeklyHours = (minutes / 60) / 52;
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

// ===================== 2. HAUPTFUNKTIONEN =====================
function loadMonthData(monthKey) {
    console.log("LADE MONAT:", monthKey);
    
    const month = yearData.months[monthKey];
    if (!month) {
        console.error("Monat nicht gefunden:", monthKey);
        return;
    }
    
    const container = document.getElementById(`${monthKey}-content`);
    if (!container) {
        console.error("Container nicht gefunden:", `${monthKey}-content`);
        return;
    }
    
    // 1. Monatsübersichtskarten
    let html = `
        <div class="row mb-4">
            <div class="col-md-3 col-sm-6">
                <div class="card summary-card">
                    <div class="card-header bg-primary text-white">
                        <i class="bi bi-calendar-month"></i> ${month.monthName}-Bilanz
                    </div>
                    <div class="card-body text-center">
                        <div class="time-display ${month.gleitzeit.startsWith('-') ? 'negative-time' : 'positive-time'}">${month.gleitzeit}</div>
                        <p class="card-text">Gesamte Gleitzeit im ${month.monthName}</p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3 col-sm-6">
                <div class="card summary-card">
                    <div class="card-header bg-info text-white">
                        <i class="bi bi-clock"></i> Sollzeit ${month.monthName}
                    </div>
                    <div class="card-body text-center">
                        <div class="time-display neutral-time">${month.sollzeit}</div>
                        <p class="card-text">Gesamte Sollarbeitszeit</p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3 col-sm-6">
                <div class="card summary-card">
                    <div class="card-header bg-success text-white">
                        <i class="bi bi-check-circle"></i> Arbeitszeit ${month.monthName}
                    </div>
                    <div class="card-body text-center">
                        <div class="time-display neutral-time">${month.arbeitszeit}</div>
                        <p class="card-text">Tatsächlich gearbeitet</p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3 col-sm-6">
                <div class="card summary-card">
                    <div class="card-header bg-warning text-white">
                        <i class="bi bi-arrow-left-right"></i> Differenz ${month.monthName}
                    </div>
                    <div class="card-body text-center">
                        <div class="time-display ${month.differenz.startsWith('-') ? 'negative-time' : 'positive-time'}">${month.differenz}</div>
                        <p class="card-text">Differenz (Arbeitszeit - Sollzeit)</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 2. Tabelle für Tage
    if (month.tage && month.tage.length > 0) {
        html += `
            <div class="row">
                <div class="col-12">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Datum</th>
                                    <th>Komme</th>
                                    <th>Gehe</th>
                                    <th>Arbeit</th>
                                    <th>Soll</th>
                                    <th>Gleitzeit</th>
                                </tr>
                            </thead>
                            <tbody>
        `;
        
        month.tage.forEach(day => {
            html += `
                <tr>
                    <td>${day.datum}</td>
                    <td>${day.kommeGest || ''}</td>
                    <td>${day.geheGest || ''}</td>
                    <td>${day.arbeitszeit}</td>
                    <td>${day.sollzeit}</td>
                    <td class="${day.gleitzeitTag?.startsWith('-') ? 'negative-time' : 'positive-time'}">
                        ${day.gleitzeitTag || '0:00'}
                    </td>
                </tr>
            `;
        });
        
        html += `
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    } else {
        html += `<div class="alert alert-info">Keine Tagesdaten für ${month.monthName}</div>`;
    }
    
    container.innerHTML = html;
    console.log("Monat geladen:", month.monthName);
}

function loadYearSummary() {
    const year = yearData.year;
    const totalSollzeit = yearData.totalSollzeit;
    const totalArbeitszeit = yearData.totalArbeitszeit;
    const totalGleitzeit = yearData.totalGleitzeit;
    const totalDifferenz = yearData.totalDifferenz;
    
    const yearCardsContainer = document.getElementById('year-summary-cards');
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
    
    loadAnnualSummaryTable();
}

// ... (hier kommen die RESTLICHEN Funktionen in dieser Reihenfolge)
// loadAnnualSummaryTable()
// loadMonthData()
// createAnnualChart()
// addTimeClickListeners()
// setupTabListeners()
// updateMonthData()
// loadSampleData()
// initDashboard()
// document.addEventListener(...)
// ===================== 3. WEITERE HAUPTFUNKTIONEN =====================
function loadAnnualSummaryTable() {
    console.log("Lade Jahresübersichtstabelle...");
    const tableBody = document.getElementById('annual-summary-body');
    if (!tableBody) {
        console.error("Tabelle nicht gefunden!");
        return;
    }
    
    let html = '';
    let cumulativeBalance = 0;
    let quarter = 1;
    
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 
                   'july', 'august', 'september', 'october', 'november', 'december'];
    
    months.forEach((monthKey, index) => {
        const month = yearData.months[monthKey];
        
        // Quartalsüberschrift
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
        
        // Status-Badge
        let statusBadge = '';
        const gleitzeitMinutes = parseTimeToMinutes(month.gleitzeit);
        
        if (gleitzeitMinutes > 120) {
            statusBadge = '<span class="badge bg-success">Sehr gut im Plus</span>';
        } else if (gleitzeitMinutes > 30) {
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
        
        // Info für echte Daten
        const hasRealData = month.tage && month.tage.length > 0;
        const dataIndicator = hasRealData ? ' <i class="bi bi-check-circle text-success"></i>' : '';
        
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
    console.log("Jahrestabelle geladen");
}

function createAnnualChart() {
    console.log("Erstelle Diagramm...");
    
    const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
    const monthData = [];
    const cumulativeData = [];
    let cumulative = 0;
    
    // Daten sammeln
    Object.values(yearData.months).forEach(month => {
        const minutes = parseTimeToMinutes(month.gleitzeit);
        monthData.push(minutes / 60);
        cumulative += minutes;
        cumulativeData.push(cumulative / 60);
    });
    
    const ctx = document.getElementById('annualChart');
    if (!ctx) {
        console.error("Canvas für Diagramm nicht gefunden!");
        return;
    }
    
    // Vorheriges Diagramm entfernen
    if (window.annualChartInstance) {
        window.annualChartInstance.destroy();
    }
    
    window.annualChartInstance = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Monatliche Gleitzeit (Stunden)',
                data: monthData,
                backgroundColor: monthData.map(v => v >= 0 ? 'rgba(39, 174, 96, 0.7)' : 'rgba(231, 76, 60, 0.7)'),
                borderColor: monthData.map(v => v >= 0 ? 'rgba(39, 174, 96, 1)' : 'rgba(231, 76, 60, 1)'),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: { display: true, text: 'Gleitzeit (Stunden)' }
                }
            }
        }
    });
    
    console.log("Diagramm erstellt");
}

function addTimeClickListeners() {
    // Einfache Version - kann später erweitert werden
    console.log("Zeit-Klick-Listener hinzugefügt");
}

function setupTabListeners() {
    console.log("Tab-Listener eingerichtet");
}

function updateMonthData() {
    alert('Datenimport-Funktion - Verwende convert.js für echte Updates');
}

function loadSampleData() {
    alert('Beispieldaten laden - Aktualisiere data.js mit deinen Excel-Daten');
}

// ===================== 4. INITIALISIERUNG =====================
function initDashboard() {
    console.log("=== DASHBOARD START ===");
    
    // Jahresübersicht laden
    loadYearSummary();
    
    // Monatsdaten laden (nur Januar, da nur der Daten hat)
    loadMonthData('january');
    
    // Diagramm erstellen
    createAnnualChart();
    
    console.log("=== DASHBOARD FERTIG ===");
}

// ===================== 5. EVENT LISTENER =====================
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM geladen - Dashboard wird gestartet");
    
    // Dashboard initialisieren
    initDashboard();
    
    // Event-Listener für Buttons
    document.getElementById('update-data-btn')?.addEventListener('click', function() {
        updateMonthData();
    });
    
    document.getElementById('load-sample-btn')?.addEventListener('click', function() {
        loadSampleData();
    });
    
    console.log("Event-Listener eingerichtet");
});