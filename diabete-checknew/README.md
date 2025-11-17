# DiabèteCheck (Angular 20, Standalone)

Projet prêt à lancer avec la syntaxe de contrôle **@if / @for / @switch** activée.

## Lancer
```bash
npm install
npm start
```
Puis ouvrez http://localhost:4200

## API
- Prédiction: `POST http://127.0.0.1:5000/predict`
- Sauvegarde (optionnelle): `POST /save_prediction.php`

Ajustez `apiBase` et `saveUrl` dans `src/app/app.config.ts` si besoin.
