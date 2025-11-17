# CleanDiabeteApp — .NET 9 Clean Architecture

Solution minimaliste en **Clean Architecture** (Domain / Application / Infrastructure / WebApi), prête pour .NET 9.

## Piles et packages
- **Domain** : entités et modèles métier (`Prediction`)
- **Application** : CQRS avec **MediatR**, validation **FluentValidation**
- **Infrastructure** : **EF Core 9** (InMemory/SQLite), injection via `AddInfrastructure`
- **WebApi** : Minimal APIs + **Swagger**

## Démarrage
```bash
dotnet restore
dotnet build
dotnet run --project src/WebApi/WebApi.csproj
```
Par défaut, l'API démarre sur `http://localhost:5187` avec **UseInMemory=true** (voir `src/WebApi/appsettings.json`).

### Endpoints
- `POST /api/predictions` — crée une prédiction (valide les champs)
- `GET /api/predictions/{id}` — récupère une prédiction par Id

### Bascule vers SQLite
Dans `src/WebApi/appsettings.json`, mettez `"UseInMemory": false` et ajustez la chaîne de connexion `ConnectionStrings:Default`.

## Idées d'extensions
- Ajoutez une intégration vers votre modèle Flask (HTTP) dans **Infrastructure** et un **Command** spécifique dans **Application**.
- Ajoutez l'authentification (JWT) et la configuration Docker.
