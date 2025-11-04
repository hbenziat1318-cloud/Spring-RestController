
#  🏦 README - API BANQUE (Spring Boot REST)
# ============================================================🌟

projet:
  nom: "🏦 API Banque — Application REST"
  description: >
    Cette application Spring Boot gère des comptes bancaires
    et expose une API REST complète en JSON et XML.
    Elle inclut JPA, Swagger (OpenAPI 3), H2, et un initialiseur automatique.
  objectifs:
    - Création et gestion de comptes bancaires (CRUD)
    - Persistance avec Spring Data JPA
    - Documentation Swagger UI
    - Tests via Postman / Curl / SoapUI
# ============================================================
# 🎯 Technologies & Outils
# ============================================================
technologies:
  langage: "☕ Java 17 / 21"
  framework: "🌱 Spring Boot 3.2.x"
  base_donnees: "🗄️ H2 (en mémoire)"
  documentation: "📘 Swagger / Springdoc OpenAPI 2.3.0"
  outils_tests: "🧪 Postman, Curl, SoapUI"
  gestionnaire_dependances: "⚙️ Maven"

# ============================================================
# ⚙️ Configuration principale (application.properties)
# ============================================================
configuration:
  fichier: "src/main/resources/application.properties"
  contenu: |
    server.port=8082
    spring.datasource.url=jdbc:h2:mem:banque-db
    spring.datasource.driverClassName=org.h2.Driver
    spring.datasource.username=sa
    spring.datasource.password=
    spring.h2.console.enabled=true
    spring.jpa.hibernate.ddl-auto=create
    spring.jpa.show-sql=true

  console_h2:
    url: "🌐 http://localhost:8082/h2-console"
    jdbc: "jdbc:h2:mem:banque-db"
    utilisateur: "sa"
    mot_de_passe: "(vide)"
    
<img width="974" height="517" alt="image" src="https://github.com/user-attachments/assets/beadb016-21e7-41eb-b02c-f9b8cbd4162b" />
# ============================================================
# 🧱 Structure du projet
<img width="680" height="561" alt="image" src="https://github.com/user-attachments/assets/b2b72aee-f4fc-40f9-ba06-617e3cb8f546" />

# ⚙️ Technologies utilisées
| Composant                 | Version        | Rôle                        |
| ------------------------- | -------------- | --------------------------- |
| **Java**                  | 17 ou 21       | Langage principal           |
| **Spring Boot**           | 3.2.x ou 3.3.x | Framework principal         |
| **Spring Data JPA**       | —              | Accès aux données           |
| **H2 Database**           | —              | Base de données en mémoire  |
| **Jackson / Jackson XML** | —              | Sérialisation JSON et XML   |
| **Springdoc OpenAPI**     | 2.3.0          | Documentation Swagger       |
| **Maven**                 | —              | Gestionnaire de dépendances |
 # ============================================================
 # 🧩 Entité principale — Compte
 @Entity
public class Compte {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double solde;

    @Temporal(TemporalType.DATE)
    private Date dateCreation;

    @Enumerated(EnumType.STRING)
    private TypeCompte type;
}
 # ============================================================
# 🧠 Énumération
public enum TypeCompte {
    COURANT, EPARGNE
}
 # ============================================================
 # 🗄️ Repository JPA
 @Repository
public interface CompteRepository extends JpaRepository<Compte, Long> {
}
 # ============================================================
 # 🚀 Initialisation automatique
 Dans MsBanqueApplication.java :
 @Bean
CommandLineRunner start(CompteRepository compteRepository) {
    return args -> {
        compteRepository.save(new Compte(null, Math.random()*9000, new Date(), TypeCompte.EPARGNE));
        compteRepository.save(new Compte(null, Math.random()*9000, new Date(), TypeCompte.COURANT));
        compteRepository.save(new Compte(null, Math.random()*9000, new Date(), TypeCompte.EPARGNE));
        compteRepository.findAll().forEach(System.out::println);
    };
}
 # ====================================================
 # 🌐 API REST — Endpoints exposés
 | Méthode  | Endpoint               | Description                    | Format     |
| -------- | ---------------------- | ------------------------------ | ---------- |
| `GET`    | `/banque/comptes`      | Récupérer la liste des comptes | JSON / XML |
| `GET`    | `/banque/comptes/{id}` | Récupérer un compte par ID     | JSON / XML |
| `POST`   | `/banque/comptes`      | Créer un compte                | JSON / XML |
| `PUT`    | `/banque/comptes/{id}` | Mettre à jour un compte        | JSON / XML |
| `DELETE` | `/banque/comptes/{id}` | Supprimer un compte            | —          |
 # ============================================================
# 🧰 Tests avec Postman / Curl
🔹 Liste des comptes en JSON :
curl -X GET "http://localhost:8082/banque/comptes" -H "Accept: application/json"
 # ============================================================
 # 📚 Documentation Swagger (OpenAPI)

Swagger est automatiquement généré à partir des annotations Spring.

📍 Accès :

Interface Swagger : http://localhost:8082/swagger-ui/index.html

Spécification OpenAPI JSON : http://localhost:8082/v3/api-docs
<img width="1851" height="842" alt="image" src="https://github.com/user-attachments/assets/c566b3b0-842a-43ee-a2b1-759de7405eab" />
 # ================================================
 # auteur: "👩‍💻 Jamila Dabachine"
  etablissement: "🎓 École Normale Supérieure de Marrakech"
  formation: "Master Technologies Émergentes en Éducation"
  annee: "📅 2025"
