# Belote Stats

Application web de comptage et de statistiques de belote, à déployer sur GitHub Pages.

## Contenu (à garder ensemble, à la racine du dépôt)

| Fichier | Rôle |
|---|---|
| `index.html` | l'application |
| `sw.js` | mode hors ligne |
| `manifest.webmanifest` | nom et icônes de l'application installée |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | icônes |
| `.nojekyll` | fichier vide : demande à GitHub de ne rien transformer |

## 1. Déployer sur GitHub Pages

1. Sur github.com, créez un dépôt (public pour Pages gratuit).
2. **Add file → Upload files** : glissez les fichiers eux-mêmes (pas le dossier qui les contient), puis **Commit changes**. `index.html` doit être à la racine.
3. **Settings → Pages → Deploy from a branch** → branche `main`, dossier `/ (root)` → **Save**.
4. Après une à deux minutes, l'application est en ligne sur `https://VOTRE-NOM.github.io/NOM-DU-DEPOT/`.

## 2. Installer sur le téléphone (Android)

Ouvrez l'adresse dans Chrome, puis menu ⋮ → **Installer l'application**.

Pour obtenir un fichier APK : sur [pwabuilder.com](https://www.pwabuilder.com), collez l'adresse de l'application, puis *Package for stores* → Android.

## 3. Sessions partagées (Firebase)

La base Firebase est déjà configurée dans `index.html`. Dans la console Firebase → **Realtime Database → Règles**, collez ceci puis **Publier** :

```json
{
  "rules": {
    "sessions": { ".read": true, ".write": true },
    "session_data": {
      "$key": { ".read": true, ".write": true }
    }
  }
}
```

Sans ces règles, l'application affiche « Accès refusé ».

Chaque session est protégée par un code d'accès choisi à sa création (4 caractères minimum, 6 à 8 recommandés). Ce n'est pas une sécurité forte : la base reste ouverte à qui en connaît l'adresse. Pour une vraie sécurité, il faudrait des comptes (Firebase Auth).

## 4. Mettre à jour l'application

Remplacez `index.html` (et `sw.js` quand cela est précisé) dans le dépôt : **Add file → Upload files**, même nom de fichier, puis **Commit changes**.

En bas de l'accueil, le libellé « Version … » indique la version chargée. Si l'ancienne s'affiche, fermez complètement l'application et rouvrez-la.

## 5. Données

- **Sans session** : les données restent dans le navigateur de chaque appareil.
- **Avec une session** : elles sont dans la base Firebase, partagées entre tous ceux qui ont le code.
- **Exporter / Importer** (en haut de l'accueil) : sauvegarde et restauration par fichier.
- **PDF** : la bibliothèque est chargée depuis internet. Ouvrez l'application une première fois en ligne pour qu'elle soit mise en cache.
