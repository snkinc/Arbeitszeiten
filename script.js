// Haupt-JavaScript für das Gleitzeit-Dashboard 2026

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

// Jahresübersicht laden
function loadYearSummary() {
    const year = yearData.year;
    const totalSollzeit = yearData.totalSollzeit;
    const totalArbeitszeit = yearData.totalArbeitszeit;
    const totalGleitzeit = yearData.totalGleitzeit;
    const totalDifferenz = yearData.totalDifferenz;
    
    // Jahreskennzahlen-Karten erstellen
    const yearCardsContainer = document.getElementById('year-summary-cards');
    yearCardsContainer.innerHTML = `
        <div class="col-md-3 col-sm-6">
            <div class="card summary-card">
                <div class="card-header bg-primary text-white">
                    <i class="bi bi-calendar-year"></i> Jahresbilanz ${year}
                </div>
                <div class="card-body text-center">
                    <div class="time-display ${totalGleitzeit.startsWith('-') ? 'negative-time' : 'positive-time'}">${totalGleitzeit}</div>
                    <p class="card-text">Gesamte Gleitzeit ${year}</p>
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
                </div>
            </div>
        </div>
        
        <div class="col-md-3 col-sm-6">
            <div class="card summary-card">
                <div class="card-header bg-warning text-white">
                    <i class="bi bi-graph-up-arrow"></i> Monatsdurchschnitt
                </div>
                <div class="card-body text-center">
                    <div class="time-display ${parseTimeToMinutes(totalGleitzeit) / 12 < 0 ? 'negative-time' : 'positive-time'}">${calculateMonthlyAverage(totalGleitzeit)}</div>
                    <p class="card-text">Durchschn. Gleitzeit pro Monat</p>
                </div>
            </div>
        </div>
    `;
    
    // Jahresübersichtstabelle erstellen
    loadAnnualSummaryTable();
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
        
        if (gleitzeitMinutes > 60) {
            statusBadge = '<span class="badge bg-success">Gut im Plus</span>';
        } else if (gleitzeitMinutes > 0) {
            statusBadge = '<span class="badge bg-success">Plus</span>';
        } else if (gleitzeitMinutes > -60) {
            statusBadge = '<span class="badge bg-warning">Leicht im Minus</span>';
        } else {
            statusBadge = '<span class="badge bg-danger">Defizit</span>';
        }
        
        html += `
            <tr>
                <td>${month.monthName}</td>
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

// Monatsdaten laden
function loadMonthData(monthKey) {
    const month = yearData.months[monthKey];
    if (!month) return;
    
    const container = document.getElementById(`${monthKey}-content`);
    if (!container) return;
    
    // Monatsübersichtskarten
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
        
        <!-- Legende -->
        <div class="row mb-3">
            <div class="col-12">
                <div class="card summary-card">
                    <div class="card-header bg-secondary text-white">
                        <i class="bi bi-info-circle"></i> Legende
                    </div>
                    <div class="card-body">
                        <div class="legend-item">
                            <div class="legend-color" style="background-color: rgba(241, 196, 15, 0.1);"></div>
                            <span>Wochenzeile (Zusammenfassung)</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color" style="background-color: rgba(231, 76, 60, 0.1);"></div>
                            <span>Feiertag</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color" style="background-color: rgba(149, 165, 166, 0.1);"></div>
                            <span>Keine Arbeit / Frei</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Monatstabelle
    if (month.tage && month.tage.length > 0) {
        html += `
            <div class="row">
                <div class="col-12">
                    <div class="data-table">
                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>Datum</th>
                                        <th>Kom. gest.</th>
                                        <th>Kom. ger.</th>
                                        <th>Kom. bew.</th>
                                        <th>Geh. gest.</th>
                                        <th>Geh. ger.</th>
                                        <th>Geh. bew.</th>
                                        <th>Abw.</th>
                                        <th>AZ Profil</th>
                                        <th>Pause</th>
                                        <th>Sollzeit</th>
                                        <th>Arbeitszeit</th>
                                        <th>GZ Tag</th>
                                        <th>GZ Mon.</th>
                                        <th>GZ ges.</th>
                                    </tr>
                                </thead>
                                <tbody>
        `;
        
        // Tage hinzufügen
        month.tage.forEach(day => {
            let rowClass = '';
            if (day.feiertag) rowClass = 'holiday';
            if (day.keinArbeitstag) rowClass = 'no-work';
            if (day.datum.toLowerCase().includes('woche') || day.datum.toLowerCase().includes('summe')) rowClass = 'week-row';
            
            html += `
                <tr class="${rowClass}">
                    <td>${day.datum}</td>
                    <td>${day.kommeGest || ''}</td>
                    <td>${day.kommeGer || ''}</td>
                    <td>${day.kommeBew || ''}</td>
                    <td>${day.geheGest || ''}</td>
                    <td>${day.geheGer || ''}</td>
                    <td>${day.geheBew || ''}</td>
                    <td>${day.abwesenheit || ''}</td>
                    <td>${day.azProfil || ''}</td>
                    <td>${day.pause || ''}</td>
                    <td>${day.sollzeit || ''}</td>
                    <td>${day.arbeitszeit || ''}</td>
                    <td class="${day.gleitzeitTag?.startsWith('-') ? 'negative-time' : 'positive-time'}">${day.gleitzeitTag || ''}</td>
                    <td class="${day.gleitzeitMonat?.startsWith('-') ? 'negative-time' : 'positive-time'}">${day.gleitzeitMonat || ''}</td>
                    <td class="${day.gleitzeitGesamt?.startsWith('-') ? 'negative-time' : 'positive-time'}">${day.gleitzeitGesamt || ''}</td>
                </tr>
            `;
        });
        
        html += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        html += `
            <div class="alert alert-info">
                <h4><i class="bi bi-calendar-month"></i> ${month.monthName} 2026</h4>
                <p>Hier würden die detaillierten Daten für ${month.monthName} 2026 angezeigt werden.</p>
                <p><strong>Zusammenfassung:</strong> Gleitzeit: ${month.gleitzeit} | Sollzeit: ${month.sollzeit} | Arbeitszeit: ${month.arbeitszeit}</p>
                <p>Fügen Sie die Tagesdaten in der <code>data.js</code>-Datei hinzu.</p>
            </div>
        `;
    }
    
    // Feiertagsinformationen
    const monthHolidays = yearData.holidays[monthKey];
    if (monthHolidays && monthHolidays.length > 0) {
        html += `
            <div class="row mt-4">
                <div class="col-12">
                    <div class="card summary-card">
                        <div class="card-header bg-dark text-white">
                            <i class="bi bi-exclamation-circle"></i> Wichtige Informationen - ${month.monthName} 2026
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h5><i class="bi bi-calendar-event"></i> Feiertage im ${month.monthName} 2026</h5>
                                    <ul>
        `;
        
        monthHolidays.forEach(holiday => {
            html += `<li>${holiday}</li>`;
        });
        
        html += `
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <h5><i class="bi bi-clock-history"></i> Gleitzeit-Status ${month.monthName}</h5>
                                    <p>Monatsende: <span class="${month.gleitzeit.startsWith('-') ? 'negative-time' : 'positive-time'} fw-bold">${month.gleitzeit} Stunden</span></p>
                                    <p>Vormonat: <span class="${month.previousMonthBalance?.startsWith('-') ? 'negative-time' : 'positive-time'}">${month.previousMonthBalance || '0:00'} Stunden</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
    
    // Event-Listener für klickbare Zeitwerte hinzufügen
    addTimeClickListeners();
}

// Jahresdiagramm erstellen
function createAnnualChart() {
    const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
    const monthData = [];
    const cumulativeData = [];
    let cumulative = 0;
    
    // Daten für Diagramm sammeln
    Object.values(yearData.months).forEach(month => {
        const minutes = parseTimeToMinutes(month.gleitzeit);
        monthData.push(minutes / 60); // In Stunden umwandeln
        cumulative += minutes;
        cumulativeData.push(cumulative / 60); // In Stunden umwandeln
    });
    
    const ctx = document.getElementById('annualChart').getContext('2d');
    
    // Farben basierend auf Werten
    const backgroundColors = monthData.map(value => 
        value >= 0 ? 'rgba(39, 174, 96, 0.7)' : 'rgba(231, 76, 60, 0.7)'
    );
    
    const borderColors = monthData.map(value => 
        value >= 0 ? 'rgba(39, 174, 96, 1)' : 'rgba(231, 76, 60, 1)'
    );
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Monatliche Gleitzeit (Stunden)',
                data: monthData,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }, {
                label: 'Kumulierte Gleitzeit (Stunden)',
                data: cumulativeData,
                type: 'line',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            const value = context.raw;
                            const hours = Math.floor(Math.abs(value));
                            const minutes = Math.round((Math.abs(value) - hours) * 60);
                            const sign = value < 0 ? '-' : '+';
                            label += `${sign}${hours}:${minutes.toString().padStart(2, '0')} Stunden`;
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Gleitzeit (Stunden)'
                    },
                    ticks: {
                        callback: function(value) {
                            const hours = Math.floor(Math.abs(value));
                            const minutes = Math.round((Math.abs(value) - hours) * 60);
                            const sign = value < 0 ? '-' : '+';
                            return `${sign}${hours}:${minutes.toString().padStart(2, '0')}`;
                        }
                    }
                }
            }
        }
    });
}

// Hilfsfunktionen
function parseTimeToTimeString(timeStr) {
    // Konvertiert Zeitstring "hh:mm" in ein lesbares Format
    if (!timeStr) return "0:00";
    return timeStr;
}

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

function calculateMonthlyAverage(gleitzeitStr) {
    const minutes = parseTimeToMinutes(gleitzeitStr);
    const averageMinutes = minutes / 12;
    return formatMinutesToTime(averageMinutes);
}

function addTimeClickListeners() {
    const timeCells = document.querySelectorAll('.positive-time, .negative-time, .neutral-time');
    
    timeCells.forEach(cell => {
        if (!cell.hasAttribute('data-listener-added')) {
            cell.setAttribute('data-listener-added', 'true');
            cell.setAttribute('title', 'Klicken für Details');
            cell.style.cursor = 'pointer';
            
            cell.addEventListener('click', function() {
                const timeValue = this.textContent;
                const isNegative = timeValue.startsWith('-');
                const isPositive = !isNegative && timeValue !== '0:00' && timeValue.trim() !== '';
                
                let message = `Zeitwert: ${timeValue}`;
                if (isNegative) {
                    message += ` (Defizit von ${timeValue.substring(1)})`;
                } else if (isPositive) {
                    message += ` (Überschuss von ${timeValue})`;
                } else {
                    message += ` (Ausgeglichen)`;
                }
                
                alert(message);
            });
        }
    });
}

function setupTabListeners() {
    const yearTabs = document.querySelectorAll('#yearTabs button[data-bs-toggle="tab"]');
    yearTabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function(event) {
            // Bei Tab-Wechsel Event-Listener neu hinzufügen
            setTimeout(addTimeClickListeners, 100);
        });
    });
}

// Datenimport-Funktionen
function updateMonthData() {
    const monthSelect = document.getElementById('month-select');
    const sollzeitInput = document.getElementById('sollzeit-input');
    
    const monthKey = monthSelect.value;
    const newSollzeit = sollzeitInput.value;
    
    if (yearData.months[monthKey]) {
        yearData.months[monthKey].sollzeit = newSollzeit;
        
        // Dashboard aktualisieren
        loadMonthData(monthKey);
        loadAnnualSummaryTable();
        
        alert(`Daten für ${yearData.months[monthKey].monthName} aktualisiert!`);
    }
}

function loadSampleData() {
    // Hier könnten Beispieldaten geladen werden
    alert('Beispieldaten würden hier geladen werden. Aktualisieren Sie stattdessen die data.js-Datei mit Ihren Excel-Daten.');
}