
# Service d'envoi d'email pour les estimations Progineer

Cette Supabase Edge Function permet d'envoyer des emails aux clients contenant les détails de leurs estimations de projet.

## Configuration

### Variables d'environnement requises

Pour que cette fonction fonctionne correctement, vous devez configurer les variables d'environnement suivantes dans le tableau de bord Supabase:

```
SMTP_HOSTNAME=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=progineer.moe@gmail.com
SMTP_PASSWORD=votre_mot_de_passe_ou_clé_app
SMTP_FROM=Progineer <progineer.moe@gmail.com>
```

### Comment configurer dans Supabase

1. Allez dans le tableau de bord Supabase
2. Naviguez vers "Fonctions Edge" 
3. Sélectionnez la fonction "send-estimation-email"
4. Cliquez sur "Variables d'environnement"
5. Ajoutez les variables listées ci-dessus

## Utilisation

La fonction attend une requête POST avec les données suivantes:

```json
{
  "to": "email@client.com",
  "subject": "Votre estimation de projet",
  "html": "<p>Contenu HTML de l'email</p>",
  "cc": "progineer.moe@gmail.com", // Optionnel
  "formData": {}, // Données du formulaire
  "estimationAmount": 50000 // Montant de l'estimation
}
```

## Déploiement

Pour déployer les modifications:

```bash
supabase functions deploy send-estimation-email --project-ref votre-ref-projet
```

## Notes importantes

- Pour Gmail, vous devrez probablement créer une "Clé d'application" plutôt qu'utiliser votre mot de passe normal
- Assurez-vous que le port SMTP n'est pas bloqué par votre fournisseur
