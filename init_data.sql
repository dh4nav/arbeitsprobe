CREATE TABLE addresses (id INTEGER PRIMARY KEY, name TEXT, city TEXT, street TEXT, postal_code TEXT);
CREATE TABLE texts (id INTEGER PRIMARY KEY, beschreibung TEXT, content TEXT);

INSERT INTO addresses (id, name, city, street, postal_code)
VALUES (1, 'Fritz Müller', 'Berlin', 'Berliner Straße 1', '10115');

INSERT INTO addresses (id, name, city, street, postal_code)
VALUES (2, 'Georg Heinz Sauerbier', 'München', 'Odeonsplatz 3', '80510');

INSERT INTO addresses (id, name, city, street, postal_code)
VALUES (3, 'Gabriele Merkel', 'Berlin', 'Hamburger Allee 33', '10133');

INSERT INTO addresses (id, name, city, street, postal_code)
VALUES (4, 'Karl-Heinz Wolter', 'Offenbach', 'Hanauer Straße 22b', '50505');

INSERT INTO texts (id, beschreibung, content)
VALUES (1, 'Einladung zum Sommerfest', '$$ADRESSE$$\n\n\nSehr geehrte oder geehrter $$NAME$$\n\nWir möchsten Sie und eine Person zur Begleitung sehr herzlich zu unserem diesjährigen Sommerfest einladen.\n\nDas Sommerfest beginnt am 31. August 2025 um 18 Uhr in unserem Garten.\n\nUm formale Abendgarterobe wird gebeten.\n\n\nMit besten Grüßen\n\nDer Vorstand');

INSERT INTO texts (id, beschreibung, content)
VALUES (2, 'Kaffeebestellung', '$$ADRESSE$$\n\n\nSehr geehrte Damen und Herren\n\nWir möchten hiermit 452 Verpackungseinheiten Kaffee der Sorte "Goldröstung" zur Lieferung an die Ihnen bekannte Adresse bestellen.\n\nUnsere Kundennummer ist 47110815123\n\n\nMit besten Grüßen\n\nDer vorstand');