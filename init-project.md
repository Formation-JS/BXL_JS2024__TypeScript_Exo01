# Récap pour initialiser le projet : 

## Mise en place de la structure de fichiers  : 
``` 
┝╸public
│ ┝╸css
│ │ ┕╸style.css
│ ┝╸images
│ │ ┝╸image1.png
│ │ ┕╸image2.png
│ ┝╸js
│ │ ┕╸script.js
│ ┕╸index.html
┝╸src
│ ┕╸script.ts 
┝╸.gitignore
┕╸readme.md
```

## Configurer le projet et le TypeScript
```
# Initialiser le projet
npm init

# Installer le TypeScript
npm i typescript --save-dev

# Générer le fichier de config pour TypeScript
npx tsc --init
```

## Customiser le projet

### Le fichier « tsconfig.json »
Quelques options interessantes : 
- target : *Choisir la version de ECMAScript* 
- rootDir : *Répertoire avec le code TS*
- outDir : *Répertoire destination pour le code JS compilé*
- alwaysStrict : *Ajout le strict mode du JavaScript*

### Le fichier « package.json »
Ajouter les commande suivants dans les scripts : 
```
"scripts": {
"compile": "tsc",
"watch": "tsc --watch",
},
```