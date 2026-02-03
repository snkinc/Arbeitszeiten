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