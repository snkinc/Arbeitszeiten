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

// FEHLT: loadYearSummary() Funktion - HIER EINFÜGEN:
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

// DANACH kommt deine loadMonthData() Funktion wie bereits vorhanden
function loadMonthData(monthKey) {
    // ... deine existierende loadMonthData() Funktion hier ...
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
    
    // 2. FILTER-BUTTONS UND STATISTIK
    if (month.tage && month.tage.length > 0) {
        // Statistik berechnen
        let workDays = 0;
        let freeDays = 0;
        let emptyDays = 0;
        let totalWorkMinutes = 0;
        
        month.tage.forEach(day => {
            if (day.feiertag || day.keinArbeitstag) {
                freeDays++;
            } else if (day.arbeitszeit !== "0:00" || day.sollzeit !== "0:00") {
                workDays++;
                totalWorkMinutes += parseTimeToMinutes(day.arbeitszeit);
            } else {
                emptyDays++;
            }
        });
        
        const avgWorkTime = workDays > 0 ? formatMinutesToTime(totalWorkMinutes / workDays) : "0:00";
        
        html += `
            <div class="row mb-4">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header bg-light">
                            <i class="bi bi-funnel"></i> Tage filtern
                        </div>
                        <div class="card-body">
                            <div class="btn-group" role="group" aria-label="Filter-Optionen">
                                <button type="button" class="btn btn-outline-primary active filter-btn" data-filter="all">
                                    <i class="bi bi-card-checklist"></i> Alle Tage (${month.tage.length})
                                </button>
                                <button type="button" class="btn btn-outline-success filter-btn" data-filter="work">
                                    <i class="bi bi-briefcase"></i> Arbeitstage (${workDays})
                                </button>
                                <button type="button" class="btn btn-outline-warning filter-btn" data-filter="free">
                                    <i class="bi bi-umbrella"></i> Frei/Urlaub (${freeDays})
                                </button>
                                <button type="button" class="btn btn-outline-secondary filter-btn" data-filter="empty">
                                    <i class="bi bi-calendar-week"></i> Wochenende (${emptyDays})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header bg-light">
                            <i class="bi bi-graph-up"></i> Statistik
                        </div>
                        <div class="card-body">
                            <p class="mb-1"><small>Durchschn. Arbeitszeit/Tag:</small></p>
                            <h5 class="mb-0">${avgWorkTime}</h5>
                            <p class="mb-0 text-muted"><small>${workDays} von ${month.tage.length} Tagen</small></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 3. TABELLE
        html += `
            <div class="row">
                <div class="col-12">
                    <div class="table-responsive">
                        <table class="table table-hover" id="table-${monthKey}">
                            <thead class="table-light">
                                <tr>
                                    <th>Datum</th>
                                    <th>Komme</th>
                                    <th>Gehe</th>
                                    <th>Arbeitszeit</th>
                                    <th>Sollzeit</th>
                                    <th>Gleitzeit</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
        `;
        
        // Tage verarbeiten
        month.tage.forEach(day => {
            // Bestimme Filter-Klasse
            let filterClass = '';
            let statusBadge = '';
            let rowClass = '';
            
            if (day.feiertag) {
                filterClass = 'filter-free';
                statusBadge = '<span class="badge bg-danger"><i class="bi bi-star"></i> Feiertag</span>';
                rowClass = 'table-danger';
            } else if (day.keinArbeitstag) {
                filterClass = 'filter-free';
                const abwText = day.abwesenheit || 'Frei';
                statusBadge = `<span class="badge bg-warning"><i class="bi bi-umbrella"></i> ${abwText}</span>`;
                rowClass = 'table-warning';
            } else if (day.arbeitszeit !== "0:00" || day.sollzeit !== "0:00") {
                filterClass = 'filter-work';
                statusBadge = '<span class="badge bg-success"><i class="bi bi-check-circle"></i> Arbeit</span>';
                rowClass = '';
            } else {
                filterClass = 'filter-empty';
                statusBadge = '<span class="badge bg-secondary"><i class="bi bi-moon"></i> Wochenende</span>';
                rowClass = 'table-secondary';
            }
            
            // Zeilen-Hintergrund für negative Gleitzeit
            const gleitzeitMinutes = parseTimeToMinutes(day.gleitzeitTag || "0:00");
            if (gleitzeitMinutes < -60) { // Mehr als 1h Minus
                rowClass += ' table-danger';
            } else if (gleitzeitMinutes < 0) {
                rowClass += ' table-warning';
            } else if (gleitzeitMinutes > 60) { // Mehr als 1h Plus
                rowClass += ' table-success';
            }
            
            html += `
                <tr class="${rowClass} ${filterClass}" data-filter="${filterClass}">
                    <td><strong>${day.datum}</strong></td>
                    <td>${day.kommeGest || '-'}</td>
                    <td>${day.geheGest || '-'}</td>
                    <td><span class="fw-bold">${day.arbeitszeit}</span></td>
                    <td>${day.sollzeit}</td>
                    <td class="${day.gleitzeitTag?.startsWith('-') ? 'negative-time' : 'positive-time'} fw-bold">
                        ${day.gleitzeitTag || '0:00'}
                    </td>
                    <td>${statusBadge}</td>
                </tr>
            `;
        });
        
        html += `
                            </tbody>
                            <tfoot class="table-light">
                                <tr>
                                    <td colspan="3"><strong>Monatssumme</strong></td>
                                    <td><strong>${month.arbeitszeit}</strong></td>
                                    <td><strong>${month.sollzeit}</strong></td>
                                    <td class="${month.gleitzeit.startsWith('-') ? 'negative-time' : 'positive-time'}">
                                        <strong>${month.gleitzeit}</strong>
                                    </td>
                                    <td>
                                        <span class="badge ${month.gleitzeit.startsWith('-') ? 'bg-danger' : 'bg-success'}">
                                            ${month.gleitzeit.startsWith('-') ? 'Defizit' : 'Überschuss'}
                                        </span>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            
            <!-- Filter-JavaScript -->
            <script>
            (function() {
                const tableId = "table-${monthKey}";
                const filterButtons = document.querySelectorAll('#${monthKey}-content .filter-btn');
                const tableRows = document.querySelectorAll('#${monthKey}-content tbody tr');
                
                // Filter-Funktion
                function applyFilter(filterType) {
                    console.log("Filter anwenden:", filterType);
                    
                    let visibleCount = 0;
                    tableRows.forEach(row => {
                        const rowFilter = row.getAttribute('data-filter');
                        
                        if (filterType === 'all' || rowFilter === 'filter-' + filterType) {
                            row.style.display = '';
                            visibleCount++;
                        } else {
                            row.style.display = 'none';
                        }
                    });
                    
                    // Update Button-Status
                    filterButtons.forEach(btn => {
                        if (btn.getAttribute('data-filter') === filterType) {
                            btn.classList.remove('btn-outline-primary', 'btn-outline-success', 'btn-outline-warning', 'btn-outline-secondary');
                            btn.classList.add('btn-primary', 'btn-success', 'btn-warning', 'btn-secondary'.split(' ')[filterType === 'work' ? 1 : filterType === 'free' ? 2 : filterType === 'empty' ? 3 : 0]);
                        } else {
                            btn.classList.remove('btn-primary', 'btn-success', 'btn-warning', 'btn-secondary');
                            btn.classList.add('btn-outline-primary', 'btn-outline-success', 'btn-outline-warning', 'btn-outline-secondary'.split(' ')[btn.getAttribute('data-filter') === 'work' ? 1 : btn.getAttribute('data-filter') === 'free' ? 2 : btn.getAttribute('data-filter') === 'empty' ? 3 : 0]);
                        }
                    });
                    
                    console.log(visibleCount + " Zeilen sichtbar");
                }
                
                // Event-Listener für Filter-Buttons
                filterButtons.forEach(btn => {
                    btn.addEventListener('click', function() {
                        const filterType = this.getAttribute('data-filter');
                        applyFilter(filterType);
                        
                        // Speichere Filter-Einstellung im localStorage
                        localStorage.setItem('gleitzeit-filter-${monthKey}', filterType);
                    });
                });
                
                // Gespeicherten Filter wiederherstellen
                const savedFilter = localStorage.getItem('gleitzeit-filter-${monthKey}');
                if (savedFilter) {
                    const savedBtn = document.querySelector('#${monthKey}-content .filter-btn[data-filter="' + savedFilter + '"]');
                    if (savedBtn) {
                        savedBtn.click();
                    }
                }
                
                // Tastatur-Shortcuts
                document.addEventListener('keydown', function(e) {
                    if (document.getElementById('${monthKey}')?.classList.contains('active')) {
                        switch(e.key) {
                            case '1': applyFilter('all'); break;
                            case '2': applyFilter('work'); break;
                            case '3': applyFilter('free'); break;
                            case '4': applyFilter('empty'); break;
                        }
                    }
                });
            })();
            </script>
            
            <!-- Tastatur-Hinweis -->
            <div class="row mt-3">
                <div class="col-12">
                    <div class="alert alert-info d-flex align-items-center">
                        <i class="bi bi-keyboard me-2"></i>
                        <small>
                            <strong>Tastatur-Shortcuts:</strong> 
                            [1] Alle Tage | [2] Arbeitstage | [3] Frei/Urlaub | [4] Wochenende
                        </small>
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