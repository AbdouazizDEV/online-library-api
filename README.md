## 📜 **Nouveau `README.md` optimisé**

```md
# 📚 Online Library API

Bienvenue dans **Online Library API**, une API développée avec [NestJS](https://nestjs.com/) pour gérer une bibliothèque en ligne.

## 🚀 Installation

### 📌 1. Prérequis

Avant de commencer, assure-toi d’avoir les éléments suivants installés sur ton système :

- [Node.js](https://nodejs.org/) (Version recommandée : **LTS**)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (si l’API utilise MongoDB comme base de données)

### 📌 2. Cloner le projet

```sh
git clone https://github.com/VOTRE_UTILISATEUR/online-library-api.git
cd online-library-api
```

### 📌 3. Installer les dépendances

```sh
npm install
# ou avec yarn
yarn install
```

---

## ▶️ **Démarrer l’API**

### 🌱 Mode développement

```sh
npm run start:dev
```

L’API tournera en mode **watch**, ce qui signifie qu’elle se relancera automatiquement à chaque modification.

### 🚀 Mode production

```sh
npm run build
npm run start:prod
```

Le projet sera compilé dans le dossier **`dist/`** et exécuté avec Node.js.

### 🛠 Mode debug

```sh
npm run start:debug
```

---

## 🧪 **Tests**

### 🔹 Lancer les tests unitaires

```sh
npm run test
```

### 🔹 Lancer les tests en mode **watch**

```sh
npm run test:watch
```

### 🔹 Vérifier la couverture des tests

```sh
npm run test:cov
```

### 🔹 Tests End-to-End (e2e)

```sh
npm run test:e2e
```

---

## ⚙️ **Configuration**

Le projet utilise **dotenv** (`@nestjs/config`) pour gérer la configuration.  
Crée un fichier `.env` à la racine du projet et ajoute tes variables d’environnement.

Exemple de `.env` :

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/online-library
JWT_SECRET=mysecretkey
```

---

## 📦 **Déploiement**

### 🔹 Déploiement manuel

1. Construire le projet :

   ```sh
   npm run build
   ```

2. Démarrer l’API :

   ```sh
   node dist/main
   ```

### 🔹 Déploiement sur une plateforme Cloud

Pour déployer sur une plateforme comme **Heroku, AWS, DigitalOcean** ou **Railway**, assure-toi que :

- Tu as configuré un fichier **`.env`** sur ton serveur.
- Tu utilises un gestionnaire de processus comme **PM2** pour gérer le processus :

  ```sh
  npm install -g pm2
  pm2 start dist/main.js --name online-library-api
  ```

---

## 📜 **Documentation API**

Ce projet inclut la documentation Swagger. Une fois le serveur lancé, accède à :

📌 `http://localhost:3000/api` pour voir la documentation interactive.

---

## 📌 **Bonnes pratiques**

- Assure-toi d’exécuter `npm run lint` pour vérifier que le code respecte les standards.
- Utilise `prettier` pour formater le code (`npm run format`).
- Pense à versionner ton projet avec Git avant chaque mise en production.

---

## 📞 **Support & Contact**

Si tu rencontres un problème, tu peux :

- Vérifier la documentation officielle de [NestJS](https://docs.nestjs.com/).
- Créer une **issue** sur le dépôt GitHub.
- Me contacter via [LinkedIn](https://www.linkedin.com/in/abdou-aziz-diop-b1aa05287/).

---

## 📜 **Licence**
Ce projet est sous licence **UNLICENSED** et ne peut pas être redistribué sans autorisation.

---

## 🎯 **Conclusion**
Ce fichier `README.md` fournit toutes les informations nécessaires pour bien installer, exécuter et tester mon API **Online Library**. 🚀📚  

