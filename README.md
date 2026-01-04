# synoptic

Visualiseur synoptique interactif pour résultats de simulation **Dymola / DyMat**.
Ce projet permet d’explorer les résultats temporels d’une simulation électrique via un **synoptique animé** et un **curseur de temps réel**, directement dans le navigateur.

---

## Objectif

Transformer les sorties `.mat` Dymola en un **viewer web** permettant de :

- naviguer dans le temps
- visualiser l’état instantané du réseau
- observer tensions et composants en temps réel
- tester des synoptiques de futures interfaces industrielles

---

## Architecture

project/
├── index.html → Interface synoptique
├── synoptic.css → Style & animation
├── synoptic.js → Moteur temporel
└── data/
└── Fichiers.json → Résultats DyMat (exportés depuis .mat)

---

## Format des données

Le viewer consomme un fichier JSON de la forme :

```json
{
  "time": [0.0, 0.002, 0.004, ...],
  "signals": {
    "voltage.v":   [ ... ],
    "diode.v":     [ ... ],
    "capacitor.v": [ ... ],
    "load.v":      [ ... ]
  }
}
Le système ne fait aucune interpolation :
seules les valeurs réellement calculées par Dymola sont utilisées.

Utilisation
Lancer le viewer:
python -m http.server 8000
Puis ouvrir :
http://localhost:8000

Contrôles
Action:	Description
Curseur:	Navigation indexée sur les pas réels du solveur
Champ temps:	Permet de saisir un temps exact
OK:	Saute précisément à cet instant

Fonctionnement interne
Le moteur travaille en index de solveur, pas en temps flottant :
time[]  ← maillage réel Dymola  
signal[i] ← valeur exacte du solveur à l’instant i

Cela garantit :
zéro interpolation
cohérence physique
événements nets (commutations, diodes, etc.)

Signaux affichés
Par défaut :
["voltage.v", "diode.v", "capacitor.v", "load.v"]
Modifiables dans synoptic.js :
let currentSignals = [ ... ];

Extension possible:
détection automatique de commutation
coloration dynamique ON/OFF
animation de courant
surbrillance d’événements
export d’instantanés
comparateur multi-simulations
```
