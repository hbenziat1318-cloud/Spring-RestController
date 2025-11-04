# API Banque - Spring Boot REST Controller

##  Description du Projet
Ce projet est une API REST de gestion de comptes bancaires développée avec Spring Boot. L'application permet de gérer des comptes bancaires avec différentes opérations CRUD (Create, Read, Update, Delete) et fournit une interface Swagger UI pour la documentation et les tests d'API.

##  Architecture du Projet

```
SpringRestController-master/
├── src/main/java/com/example/demo/
│   ├── MsBanqueApplication.java          # Point d'entrée de l'application
│   ├── config/
│   │   └── SwaggerConfig.java           # Configuration Swagger
│   ├── Controller/
│   │   ├── CompteController.java        # Controller REST pour les comptes
│   │   └── ViewController.java          # Controller pour les vues
│   ├── entities/
│   │   └── Compte.java                  # Entité Compte
│   ├── enums/
│   │   └── TypeCompte.java              # Enumération des types de compte
│   └── repositories/
│       └── CompteRepository.java        # Repository JPA pour les comptes
├── src/main/resources/
│   ├── application.properties           # Configuration de l'application
│   ├── static/                          # Ressources statiques (CSS, JS)
│   └── templates/                       # Templates HTML
└── target/                              # Fichiers compilés
```

##  Fonctionnalités

### API Endpoints
- **GET** `/banque/comptes/{id}` - Récupérer un compte par ID
- **PUT** `/banque/comptes/{id}` - Mettre à jour un compte
- **DELETE** `/banque/comptes/{id}` - Supprimer un compte
- **GET** `/banque/comptes` - Lister tous les comptes
- **POST** `/banque/comptes` - Créer un nouveau compte

### Types de Comptes Supportés
- `COURANT` - Compte courant
- `EPARGNE` - Compte épargne

## 🛠️ Technologies Utilisées

- **Spring Boot** - Framework principal
- **Spring Data JPA** - Persistance des données
- **H2 Database** - Base de données en mémoire
- **Swagger/OpenAPI** - Documentation d'API
- **Maven** - Gestion des dépendances
- **Thymeleaf** - Moteur de templates (optionnel)

##  Interface Utilisateur

### 1. Swagger UI
Disponible à : [http://localhost:8082](http://localhost:8082)
- Documentation interactive de l'API
- Test des endpoints en direct
- Description détaillée des opérations

### 2. Console H2
Disponible à : [http://localhost:8082/h2-console](http://localhost:8082/h2-console)
- **Driver Class:** `org.h2.Driver`
- **JDBC URL:** `jdbc:h2:mem:test`
- **User Name:** `sa`
- **Password:** (vide)

 ### 3. Les démonstration(discription)
 <h3>http://localhost:8082/swagger-ui/index.html</h3>
 <img width="1918" height="1018" alt="swager ui" src="https://github.com/user-attachments/assets/d880972b-a0a5-4129-91dd-e6dcec621896" />
<br>
<h3>http://localhost:8082/h2-console/login.jsp?jsessionid=672fb26a3dd6c29ad593a0bbdc9af066</h3>
<img width="1918" height="1028" alt="H2 CONSOLE" src="https://github.com/user-attachments/assets/7aebce04-f09b-426f-9006-440b60a67027" />
<br>
<h3>http://localhost:8082/banque/comptes</h3>
<img width="1913" height="1031" alt="localhost 80820banque comptes" src="https://github.com/user-attachments/assets/70bd6a3d-14bb-42d4-8b3f-1a87eaaf691a" />
<br>
 <h3>http://localhost:8082/v3/api-docs</h3>
 <img width="1918" height="1008" alt="localhost api" src="https://github.com/user-attachments/assets/ad032caa-696b-41ad-b748-0eaa84a55228" />
<br>
<h3>video de la console</h3>
https://github.com/user-attachments/assets/6cd8c155-7a6d-4e46-ad58-e62ca7d6c483



##  Installation et Exécution

### Prérequis
- Java 8 ou supérieur
- Maven 3.6 ou supérieur

### Étapes d'installation

1. **Cloner le projet**
   ```bash
   git clone [url-du-repository]
   cd SpringRestController-master
   ```

2. **Compiler le projet**
   ```bash
   mvn clean compile
   ```

3. **Exécuter l'application**
   ```bash
   mvn spring-boot:run
   ```

4. **Accéder à l'application**
   - API: http://localhost:8082
   - Swagger UI: http://localhost:8082
   - Console H2: http://localhost:8082/h2-console

## Structure des Données

### Entité Compte
```java
public class Compte {
    private Long id;
    private Double solde;
    private Date dateCreation;
    private TypeCompte type;
}
```

### Exemple de Réponse XML
```xml
<list>
    <item>
        <id>1</id>
        <solde>4459.4927178666</solde>
        <dateCreation>2025-11-04</dateCreation>
        <type>EPARGNE</type>
    </item>
    <item>
        <id>2</id>
        <solde>8718.0391982876885</solde>
        <dateCreation>2025-11-04</dateCreation>
        <type>COURANT</type>
    </item>
</list>
```

##  Utilisation de l'API

### Créer un compte
```bash
POST /banque/comptes
Content-Type: application/json

{
    "solde": 1000.0,
    "type": "COURANT"
}
```

### Récupérer tous les comptes
```bash
GET /banque/comptes
```

### Récupérer un compte par ID
```bash
GET /banque/comptes/1
```

##  Configuration

### Fichier application.properties
```properties
# Configuration du serveur
server.port=8082

# Configuration de la base de données H2
spring.datasource.url=jdbc:h2:mem:test
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# Configuration JPA
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# Console H2
spring.h2.console.enabled=true
```
### Diagramme simplifié et  organisé le API Banque 
<img width="2207" height="3218" alt="deepseek_mermaid_20251104_c217c5" src="https://github.com/user-attachments/assets/38e2f01a-6d39-459a-8a18-393ef676a966" />


##  Support

Pour toute question ou problème concernant ce projet, veuillez consulter la documentation Swagger UI intégrée ou examiner les logs de l'application.

---
##  Réalisation & Encadrement 
Réalisée par: BENZIAT hana
<br>
Encadré par :Mr.LACHGAR mohammed
<br>
Etablissement:Ecole Normale Supérieur Marrakech
<br>
gmail:h.benziat1318@uca.ac.ma


