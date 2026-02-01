# Gleitzeit-Dashboard für Siun Diefenbach - Jahr 2026 (Anpassbar)

Ich habe das Dashboard für das Jahr 2026 aktualisiert und eine strukturierte Datenhaltung implementiert, die einfach erweiterbar ist. Hier ist der aktualisierte Code:

## 1. `index.html` (Hauptdatei)

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gleitzeit-Dashboard - Siun Diefenbach - 2026</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <!-- Eigene CSS-Datei -->
    <link rel="stylesheet" href="styles.css">
    <!-- Chart.js für Diagramme -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <!-- Header mit Titel und Personendaten -->
        <div class="header text-center">
            <h1><i class="bi bi-calendar-check"></i> Gleitzeit-Dashboard 2026</h1>
            <h2>Siun Diefenbach</h2>
            <p class="lead mt-3">24-Stunden-Woche (Montag, Dienstag, Mittwoch)</p>
            <div class="alert alert-info mt-3" role="alert">
                <i class="bi bi-info-circle"></i> <strong>Hinweis:</strong> Dieses Dashboard zeigt Musterdaten für 2026. Sie können die Daten einfach in der <code>data.js</code>-Datei aktualisieren.
            </div>
        </div>
        
        <!-- Tabs für Monate und Jahresübersicht -->
        <ul class="nav nav-tabs" id="yearTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="year-summary-tab" data-bs-toggle="tab" data-bs-target="#year-summary" type="button" role="tab">
                    <i class="bi bi-bar-chart"></i> Jahresübersicht
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="january-tab" data-bs-toggle="tab" data-bs-target="#january" type="button" role="tab">
                    Januar
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="february-tab" data-bs-toggle="tab" data-bs-target="#february" type="button" role="tab">
                    Februar
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="march-tab" data-bs-toggle="tab" data-bs-target="#march" type="button" role="tab">
                    März
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="april-tab" data-bs-toggle="tab" data-bs-target="#april" type="button" role="tab">
                    April
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="may-tab" data-bs-toggle="tab" data-bs-target="#may" type="button" role="tab">
                    Mai
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="june-tab" data-bs-toggle="tab" data-bs-target="#june" type="button" role="tab">
                    Juni
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="july-tab" data-bs-toggle="tab" data-bs-target="#july" type="button" role="tab">
                    Juli
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="august-tab" data-bs-toggle="tab" data-bs-target="#august" type="button" role="tab">
                    August
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="september-tab" data-bs-toggle="tab" data-bs-target="#september" type="button" role="tab">
                    September
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="october-tab" data-bs-toggle="tab" data-bs-target="#october" type="button" role="tab">
                    Oktober
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="november-tab" data-bs-toggle="tab" data-bs-target="#november" type="button" role="tab">
                    November
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="december-tab" data-bs-toggle="tab" data-bs-target="#december" type="button" role="tab">
                    Dezember
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="data-import-tab" data-bs-toggle="tab" data-bs-target="#data-import" type="button" role="tab">
                    <i class="bi bi-upload"></i> Datenimport
                </button>
            </li>
        </ul>
        
        <!-- Tab Inhalte -->
        <div class="tab-content" id="yearTabsContent">
            <!-- Jahresübersicht Tab -->
            <div class="tab-pane fade show active" id="year-summary" role="tabpanel" aria-labelledby="year-summary-tab">
                <div class="row mb-4" id="year-summary-cards">
                    <!-- Jahreskennzahlen werden durch JavaScript geladen -->
                </div>
                
                <!-- Diagramm für Gleitzeitentwicklung -->
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="card summary-card">
                            <div class="card-header bg-dark text-white">
                                <i class="bi bi-graph-up"></i> Gleitzeit-Entwicklung 2026
                            </div>
                            <div class="card-body">
                                <div class="chart-container">
                                    <canvas id="annualChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Tabelle mit Monatszusammenfassung -->
                <div class="row">
                    <div class="col-12">
                        <div class="card summary-card">
                            <div class="card-header bg-secondary text-white">
                                <i class="bi bi-table"></i> Monatliche Übersicht 2026
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-hover annual-summary-table" id="annual-summary-table">
                                        <thead>
                                            <tr>
                                                <th>Monat</th>
                                                <th>Sollzeit</th>
                                                <th>Arbeitszeit</th>
                                                <th>Differenz</th>
                                                <th>Monats-Gleitzeit</th>
                                                <th>Kumulierte Gleitzeit</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody id="annual-summary-body">
                                            <!-- Daten werden durch JavaScript geladen -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Monatstabs werden dynamisch durch JavaScript geladen -->
            <div class="tab-pane fade" id="january" role="tabpanel" aria-labelledby="january-tab">
                <div class="month-content" id="january-content">
                    <!-- Januar-Inhalt wird durch JavaScript geladen -->
                </div>
            </div>
            
            <div class="tab-pane fade" id="february" role="tabpanel" aria-labelledby="february-tab">
                <div class="month-content" id="february-content">
                    <!-- Februar-Inhalt wird durch JavaScript geladen -->
                </div>
            </div>
            
            <div class="tab-pane fade" id="march" role="tabpanel" aria-labelledby="march-tab">
                <div class="month-content" id="march-content">
                    <!-- März-Inhalt wird durch JavaScript geladen -->
                </div>
            </div>
            
            <div class="tab-pane fade" id="april" role="tabpanel" aria-labelledby="april-tab">
                <div class="month-content" id="april-content">
                    <!-- April-Inhalt wird durch JavaScript geladen -->
                </div>
            </div>
            
            <div class="tab-pane fade" id="may" role="tabpanel" aria-labelledby="may-tab">
                <div class="month-content" id="may-content">
                    <!-- Mai-Inhalt wird durch JavaScript geladen -->
                </div>
            </div>
            
            <div class="tab-pane fade" id="june" role="tabpanel" aria-labelledby="june-tab">
                <div class="month-content" id="june-content">
                    <!-- Juni-Inhalt wird durch JavaScript geladen -->
                </div>
            </div>
            
            <div class="tab-pane fade" id="july" role="tabpanel" aria-labelledby="july-tab">
                <div class="month-content" id="july-content">
                    <!-- Juli-Inhalt wird durch JavaScript geladen -->
                </div>
            </div>
            
            <div class="tab-pane fade" id="august" role="tabpanel" aria-labelledby="august-tab">
                <div class="month-content" id="august-content">
                    <!-- August-Inhalt wird durch JavaScript geladen -->
                </div>
            </div>
            
            <div class="tab-pane fade" id="september" role="tabpanel" aria-labelledby="september-tab">
                <div class="month-content" id="september-content">
                    <!-- September-Inhalt wird durch JavaScript geladen -->
                </div>
            </div>
            
            <div class="tab-pane fade" id="october" role="tabpanel" aria-labelledby="october-tab">
                <div class="month-content" id="october-content">
                    <!-- Oktober-Inhalt wird durch JavaScript geladen -->
                </div>
            </div>
            
            <div class="tab-pane fade" id="november" role="tabpanel" aria-labelledby="november-tab">
                <div class="month-content" id="november-content">
                    <!-- November-Inhalt wird durch JavaScript geladen -->
                </div>
            </div>
            
            <div class="tab-pane fade" id="december" role="tabpanel" aria-labelledby="december-tab">
                <div class="month-content" id="december-content">
                    <!-- Dezember-Inhalt wird durch JavaScript geladen -->
                </div>
            </div>
            
            <!-- Datenimport Tab -->
            <div class="tab-pane fade" id="data-import" role="tabpanel" aria-labelledby="data-import-tab">
                <div class="row">
                    <div class="col-12">
                        <div class="card summary-card">
                            <div class="card-header bg-primary text-white">
                                <i class="bi bi-upload"></i> Datenimport-Anleitung
                            </div>
                            <div class="card-body">
                                <h5>So importieren Sie neue Daten:</h5>
                                <ol>
                                    <li>Öffnen Sie die Datei <code>data.js</code> in einem Texteditor</li>
                                    <li>Aktualisieren Sie die Datenstruktur mit Ihren Excel-Daten</li>
                                    <li>Speichern Sie die Datei und laden Sie diese Seite neu</li>
                                </ol>
                                
                                <div class="alert alert-warning mt-3">
                                    <h6><i class="bi bi-exclamation-triangle"></i> Datenstruktur für einen Monat:</h6>
                                    <pre><code>{
    monthName: "Januar",
    year: 2026,
    sollzeit: "112:00",
    arbeitszeit: "110:15",
    gleitzeit: "-1:45",
    differenz: "-1:45",
    tage: [
        {
            datum: "01.01 Fr",
            kommeGest: "11:00",
            kommeGer: "11:00",
            kommeBew: "11:00",
            geheGest: "19:00",
            geheGer: "19:00",
            geheBew: "19:00",
            abwesenheit: "",
            azProfil: "24 Stunden Woche (mo,di,mi)",
            pause: "0:30",
            sollzeit: "8:00",
            arbeitszeit: "7:30",
            gleitzeitTag: "-0:30",
            gleitzeitMonat: "-0:30",
            gleitzeitGesamt: "-0:30",
            feiertag: false,
            keinArbeitstag: false
        }
        // Weitere Tage hier einfügen
    ]
}</code></pre>
                                </div>
                                
                                <div class="mt-4">
                                    <h5><i class="bi bi-clipboard-data"></i> Schnelldaten-Editor:</h5>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label for="month-select" class="form-label">Monat auswählen:</label>
                                                <select class="form-select" id="month-select">
                                                    <option value="january">Januar</option>
                                                    <option value="february">Februar</option>
                                                    <option value="march">März</option>
                                                    <option value="april">April</option>
                                                    <option value="may">Mai</option>
                                                    <option value="june">Juni</option>
                                                    <option value="july">Juli</option>
                                                    <option value="august">August</option>
                                                    <option value="september">September</option>
                                                    <option value="october">Oktober</option>
                                                    <option value="november">November</option>
                                                    <option value="december">Dezember</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label for="sollzeit-input" class="form-label">Sollzeit (hh:mm):</label>
                                                <input type="text" class="form-control" id="sollzeit-input" value="112:00">
                                            </div>
                                        </div>
                                    </div>
                                    <button class="btn btn-success" id="update-data-btn">
                                        <i class="bi bi-check-circle"></i> Aktuelle Daten speichern
                                    </button>
                                    <button class="btn btn-info ms-2" id="load-sample-btn">
                                        <i class="bi bi-download"></i> Beispieldaten laden
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer text-center">
            <p>Gleitzeit-Dashboard für Siun Diefenbach - Jahr 2026 | 24-Stunden-Woche (Montag, Dienstag, Mittwoch)</p>
            <p>Daten werden dynamisch aus der <code>data.js</code>-Datei geladen</p>
            <p>Erstellt mit Bootstrap 5 und Chart.js | <i class="bi bi-calendar-range"></i> Jahresansicht 2026</p>
        </div>
    </div>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Daten-Datei -->
    <script src="data.js"></script>
    
    <!-- Eigene JavaScript-Datei -->
    <script src="script.js"></script>
</body>
</html>
```

## 2. `data.js` (Daten-Datei - einfach anpassbar)

```javascript
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
```

## 3. `styles.css` (CSS-Datei - unverändert)

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --success-color: #27ae60;
    --warning-color: #f39c12;
    --danger-color: #e74c3c;
    --light-bg: #f8f9fa;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f7fa;
    color: #333;
    padding-top: 20px;
    padding-bottom: 40px;
}

.header {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 2rem 0;
    border-radius: 10px;
    margin-bottom: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.summary-card {
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s;
    height: 100%;
    border: none;
    margin-bottom: 1.5rem;
}

.summary-card:hover {
    transform: translateY(-5px);
}

.summary-card .card-header {
    font-weight: 600;
    border-radius: 10px 10px 0 0 !important;
}

.time-display {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0.5rem 0;
}

.positive-time {
    color: var(--success-color);
}

.negative-time {
    color: var(--danger-color);
}

.neutral-time {
    color: var(--primary-color);
}

.data-table {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

.data-table thead {
    background-color: var(--primary-color);
    color: white;
}

.data-table th {
    font-weight: 600;
    border: none;
}

.data-table tbody tr:hover {
    background-color: rgba(52, 152, 219, 0.05);
}

.week-row {
    background-color: rgba(241, 196, 15, 0.1) !important;
    font-weight: 600;
}

.holiday {
    background-color: rgba(231, 76, 60, 0.1) !important;
}

.no-work {
    background-color: rgba(149, 165, 166, 0.1) !important;
}

.footer {
    margin-top: 2rem;
    padding: 1.5rem 0;
    border-top: 1px solid #dee2e6;
    color: #6c757d;
    font-size: 0.9rem;
}

.legend-item {
    display: inline-flex;
    align-items: center;
    margin-right: 1rem;
    margin-bottom: 0.5rem;
}

.legend-color {
    width: 15px;
    height: 15px;
    border-radius: 3px;
    margin-right: 5px;
}

.nav-tabs {
    border-bottom: 2px solid #dee2e6;
    margin-bottom: 1.5rem;
}

.nav-tabs .nav-link {
    color: #495057;
    font-weight: 500;
    border: none;
    border-radius: 5px 5px 0 0;
    margin-right: 5px;
    padding: 0.5rem 1rem;
}

.nav-tabs .nav-link:hover {
    color: var(--secondary-color);
}

.nav-tabs .nav-link.active {
    color: var(--primary-color);
    background-color: white;
    border-bottom: 3px solid var(--secondary-color);
}

.annual-summary-table th {
    background-color: #f8f9fa;
    font-weight: 600;
}

.annual-total {
    background-color: rgba(52, 152, 219, 0.1) !important;
    font-weight: 700;
}

.quarter-divider {
    background-color: rgba(149, 165, 166, 0.1) !important;
    font-weight: 600;
}

@media (max-width: 768px) {
    .time-display {
        font-size: 1.4rem;
    }
    
    .header h1 {
        font-size: 1.8rem;
    }
    
    .header h2 {
        font-size: 1.2rem;
    }
    
    .nav-tabs .nav-link {
        padding: 0.4rem 0.6rem;
        font-size: 0.9rem;
    }
}

.chart-container {
    height: 300px;
    margin-bottom: 2rem;
}
```

## 4. `script.js` (Haupt-JavaScript-Datei)

```javascript
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
```

## Anleitung zur Verwendung

### Dateistruktur:
```
gleitzeit-dashboard-2026/
│
├── index.html          (Hauptdatei)
├── styles.css          (CSS-Stile)
├── script.js           (Haupt-JavaScript)
└── data.js             (Ihre Daten - einfach anpassbar)
```

### So fügen Sie Ihre Excel-Daten ein:

1. **Öffnen Sie die `data.js`-Datei** in einem Texteditor
2. **Aktualisieren Sie die Datenstruktur** mit Ihren Excel-Daten:
   - Für jeden Monat die `tage`-Array mit den Tagesdaten füllen
   - Monatswerte (Sollzeit, Arbeitszeit, Gleitzeit) anpassen
   - Jahresgesamtdaten aktualisieren

3. **Datenformat für einen Tag:**
```javascript
{
    datum: "01.04 Mi",                    // Datum
    kommeGest: "15:00",                   // Kommen geplant
    kommeGer: "15:00",                    // Kommen tatsächlich
    kommeBew: "15:00",                    // Kommen bewertet
    geheGest: "19:12",                    // Gehen geplant
    geheGer: "19:12",                    // Gehen tatsächlich
    geheBew: "19:12",                    // Gehen bewertet
    abwesenheit: "",                     // Abwesenheitsgrund
    azProfil: "24 Stunden Woche (mo,di,mi)", // Arbeitszeitprofil
    pause: "0:00",                       // Pausenzeit
    sollzeit: "8:00",                    // Soll-Arbeitszeit
    arbeitszeit: "4:12",                 // Tatsächliche Arbeitszeit
    gleitzeitTag: "-3:48",               // Tagesgleitzeit
    gleitzeitMonat: "-11:48",            // Monatsgleitzeit
    gleitzeitGesamt: "-16:43",           // Gesamtgleitzeit
    feiertag: false,                     // Ist Feiertag?
    keinArbeitstag: false                // Kein Arbeitstag?
}
```

### Vorteile dieser Lösung:

1. **Einfache Datenpflege**: Nur die `data.js`-Datei muss aktualisiert werden
2. **Flexibel**: Kann für jedes Jahr verwendet werden
3. **Vollständige Excel-Integration**: Datenstruktur entspricht Excel-Spalten
4. **Dynamisches Dashboard**: Alle Ansichten werden automatisch generiert
5. **Responsive Design**: Funktioniert auf allen Geräten
6. **Interaktive Diagramme**: Visualisierung der Gleitzeitentwicklung

### Für zukünftige Updates:

Wenn Sie neue Excel-Daten für 2027 haben:
1. Erstellen Sie eine Kopie des Dashboards
2. Aktualisieren Sie das Jahr in `index.html` und `data.js`
3. Füllen Sie die neuen Daten in `data.js` ein
4. Passen Sie ggf. Feiertage an

Das Dashboard ist jetzt perfekt für die Integration Ihrer Excel-Daten vorbereitet!
