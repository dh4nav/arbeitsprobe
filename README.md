# Arbeitsprobe

## Anwendung

Diese Arbeitsprobe zeit beispielhaft ein Korrespondenzformular mit Adress- und Standardtextdatenbank, PDF-Erzeugung, sowie KI-gestützten Textentwurf. 

### Beschreibung der Elemente der Bedienoberfläche von oben nach unten

* Adressauswahlelement

Das Adressauswahlelement dient sowohl zur Auswahl der in der Datenbank gespeicherten Adressen als auch als Suchfeld. Anklicken des Dreieckes rechts offnet die Liste der gespeicherten Adressen. Eingeben eines Teils einer Adresse in das Eingabefeld links daneben filtert die Liste der Adressen mit dem Suchbegriff

* Adresseingabefeld

Das Adresseingabefeld zeigt die ausgewählte Adresse sobald eine aus der Datenbank ausgewählt wurde, dient aber auch zum Editieren oder komplett manuellen Eingeben einer Adresse

* Textauswahlelement

Analog zum Adressauswahlelement zeigt das Textauswahlelement die gespeicherten Standardtexte, und erlaubt ebenfalls die Suche darin.

* Texteingabefeld

Das Texteingabefeld zeigt den ausgewählten Text, erlaubt aber auch, den Text zu editieren oder frei einzugeben. 

* PDF-Erzeugen-Knopf

Das Anklicken des PDF-Erzeugen-Knopfes erzeugt ein als Brief formatiertes PDF mit der im Adresseingabefeld befindlichen Adresse sowie dem im Texteingabefeld befindlichen Text und läd dieses auf den Webbrowser des Benutzers herunter

* KI-Anfrageeingabefeld

Im KI-Anfrageeingabefeld kann eine Anfrage an die KI eingegeben werden, nach welchder die KI einen Textentwurf erstellt. Dieser wird dann im Texteingabefeld eingefügt

* KI-Anfrage-Knopf

Der KI-Anfrage-Knopf schickt die im KI-Anfrageeingabefeld eingegebene Anfrage an die KI ab. Bitte beachten Sie, dass die Verarbeitung der Anfrage 1 bis 2 Minuten dauern kann. 

## Technische Beschreibung

Das Webformular stützt sich auf die Bibiliotheken Svelte, SvelteKit und TailwindCSS. Dabei dient Svelte zur Erzeugung der Bedienelemente, SvelteKit zur Bereitstellung des Backends, und TailwindCSS zur Bereitstellung einheitlicher stilistischer Elemente.

Als technische Grundlage dient Node JS, die Applikation ist in HTML5, CSS und JavaScript erstellt. 

Zusätzlich ist noch ein Reverse Proxy zur Lastverteilung und entkopplung des Backends installiert. Hierzu dient Caddy, welcher sich auch automatisch um SSL/TLS-Zertifikate kümmert, so dass der Zugriff über eine gesicherte Verbidnung mit SSL/TLS/HTTPS erfolgt.

## Installation

Die Demonstrationswebseite kann auf einem Linuxserver oder einem Äquivalent (Kontainer, Vagrant, etc) installiert werden.

* Installation der Voraussetzungen

```bash

sudo apt update && sudo apt install git npm caddy

curl -fsSL https://ollama.com/install.sh | sh
ollama serve
ollama pull llama3:latest

```

* Klonen und Installation des Repositories

```bash

git clone git@github.com:dh4nav/arbeitsprobe.git
cd arbeitsprobe
npm install


```
#### Starten des Webservers

##### Entwicklerbetrieb

Der Entwicklerbetrieb kann mit 

```bash

npm run dev

```

gestartet werden. Die Webseite ist dann unter der angezeigten Adresse lokal erreichbar.

##### Produktivbetrieb

An dieser Stelle muss  in die Dateil Caddyfile im Grundverzeichnis des Repositories statt der Beispieldomain beispiel.do die tatsächliche Domain des Webservers eingetragen werden.

Außerdem muss für den Produktivbetrieb in der Datei sveltekit.service im Grundverzeichnis des Repositories statt des beispielbenutzers USER der tatsächliche Benutzer, unter dem der Werbserver laufen soll eingetragen werden.

```bash
sudo cp Caddyfile /etc/caddy/Caddyfile
sudo cat sveltekit.service > /etc/systemd/system/sveltekit.service
npm run build
sudo systemctl restart caddy 
sudo systemctl restart sveltekit

```

