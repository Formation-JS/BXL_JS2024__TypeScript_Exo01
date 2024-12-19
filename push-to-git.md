# Envoyer un projet sur git
Vous avez créer votre projet sur votre ordinateur. \
Ensuite, vous voulez l'envoyé dans un répo git (github, gitlab, azure devops, ...).

## Dans le répo en ligne (GitHub par exemple)
- Créer un projet
- Ne pas initialiser le projet *(-> Sinon, cela genere un conflit !!!)*

## Dans le projet (via VSC ou le terminal)
- Commit le projet
- Ajouter l'acces à la "remote" dans le git
```
git remote add origin uri_git
```
- Envoyer le projet git sur la remote
```
git push -u origin main
```

## Configuration de l'authentification (A faire la 1er fois sur la machine)
Deux type d'authentification (en fonction uri_git): 
- via le "https" 
- utilisation de clef SSH

### HTTPS
Popup pour se connection via le nagivateur ou demande du "username" et "password" \
*Attention : Les access sont stocké dans la machine.*

### SSH
Necessite de générer une clef SSH (public et privé). \
Pour générer la clef, il est possible : 
- D'utiliser un commande \
*ssh-keygen -t ed25519 -C "your_email@example.com"*

- D'utiliser un logiciel tier (Exemple : PuTTy)

Sauvegarder les clefs public et privé dans "C:\Users\my_user_name\\.ssh" \
Ajouter la clef SSH public au compte 