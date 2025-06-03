#  Library App

Ce projet est une interface web pour la bibliothèque municipale, réalisée en React. Il interagit avec l'API [Open Library](https://openlibrary.org/developers/api) pour permettre la recherche et l'affichage de livres.

---

##  Fonctionnalités

-  **Recherche rapide** (dans le header) accessible depuis toutes les pages
-  **Recherche avancée** (par auteur, date, sujet, etc.)
-  Affichage des **changements récents** (page d’accueil)
-  Détail d’un **livre** (titre, couverture, année, auteur, etc.)
-  Intégration d’un résumé Wikipedia pour chaque livre
-  Application responsive & accessible

---

##  Stack technique

- **React 19** 
- **Vite** pour le bundling et le dev server
- **Tailwind CSS** pour le style
- **React Query** pour la gestion des requêtes API
- **Vitest + Testing Library** pour les tests unitaires
- **API externes** : [Open Library](https://openlibrary.org/dev/docs/api) & [Wikipedia](https://www.mediawiki.org/wiki/API:Main_page)

---

##  Installation


# Cloner le projet
```bash
git clone https://github.com/zakaribel-dev/library-app
```


# Installer les dépendances
```bash
npm install
```
# Lancer en développement
```bash
npm run dev
```
# Testing
```bash
npx vitest run
```

**Sinon c'est disponible en ligne** : [https://library-app.supchat.fun](https://library-app.supchat.fun)
