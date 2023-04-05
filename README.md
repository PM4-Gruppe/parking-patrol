## Night Parking Patrol

## Beschreibung
Night Parking Patrol soll Polizisten helfen, die Parkkontrolle durchzuführen. NPP führt eine Liste kontrollierter Autos. So können die Polizisten schneller feststellen, welche Autos gebüsst werden müssen.

## Projekt lokal installieren
1. GitHub Repository clonen
2. Einen Branch checkouten (```git checkout dev-prisma```)
3. Um alle Dependencies (siehe [*package.json*](https://github.com/PM4-Gruppe/parking-patrol/blob/main/package.json)) herunterzuladen ```npm install``` ausführen.
4. Wenn noch kein PostgreSQL installiert ist, sollte man die neuste Version installieren (empfohlen wird [pgAdmin 4](https://www.pgadmin.org/download/))
5. Erstelle im Root Verzeichnis eine neue Datei mit dem Namen ```.env``` ([mehr Infos dazu](https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj)).
6. Füge die Zeile ```DATABASE_URL=postgres://postgres:'DEIN-DB-PASSWORT'@localhost:5432/postgres``` in ```.env``` ein.
7. Führe ```npx prisma migrate dev``` aus, um die Tabellen und Relationen in deiner lokal laufenden Datenbank zu erstellen.

## Projekt starten
1. Führe ```npm run dev``` aus um das Projekt zu kompilieren und den Server zu starten.
2. Öffne deinen Browser und besuche die Webseite [localhost:3000](http://localhost:3000/).

## Branching rules

**Branch naming conventions:** Types -> feature, bugfix, refactoring

- \<type\>/\<issueNumber from Jira\>_\<individual name\>
  e.g. bugfix/npp-44_multi-threaded-server

**Commit message guidelines:**

- "issueNumber: <commit message>" e.g. "npp-44: Missing Javadoc"

## This project is based on the following tutorial
A great sample project of the tech-stack we're using https://github.com/prisma/awesome-links

# Frontend Component Design
https://bradfrost.com/blog/post/atomic-web-design/

# Extensions
ESLint as part of your continuous integration pipeline.

## References

Tailwindcss: https://tailwindcss.com/docs/editor-setup

## Test Azure DevOps
