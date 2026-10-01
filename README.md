# SmartCheck Frontend

## À propos

**SmartCheck** est une application web responsive de gestion de présence par QR code dynamique.

- Le professeur affiche un QR code au tableau. Ce QR code change automatiquement toutes les 5 secondes.
- Chaque étudiant scanne le QR code depuis son compte dans l'application.
- L'étudiant est alors marqué présent automatiquement.

Comme le code change en permanence, il est impossible de le partager à distance pour se faire marquer présent sans être en classe.

Ce dépôt contient l'interface graphique de la plateforme.

## Technologies

- React
- Vite
- React Router
- Axios
- QR code (génération et scan)

## Hiérarchie du projet

```
smartcheck_frontend/
├── public/             # Fichiers statiques
├── src/                # Code source de l'application
├── index.html          # Point d'entrée HTML
├── package.json        # Dépendances et scripts
├── vite.config.js      # Configuration de Vite
├── eslint.config.js    # Configuration d'ESLint
└── README.md
```

## Démarrer le projet

**Prérequis :** [Node.js](https://nodejs.org/) (version 20.19 ou supérieure) et le backend SmartCheck lancé.

```bash
# 1. Cloner le dépôt
git clone https://github.com/sallouch/smartcheck_frontend.git
cd smartcheck_frontend

# 2. Installer les dépendances
npm install

# 3. Lancer l'application
npm run dev
```

L'application est disponible sur http://localhost:5173

## Commandes utiles

| Commande | Description |
| --- | --- |
| `npm run dev` | Lance l'application en développement |
| `npm run build` | Génère la version de production dans `dist/` |
| `npm run preview` | Teste la version de production en local |
| `npm run lint` | Vérifie le code |
