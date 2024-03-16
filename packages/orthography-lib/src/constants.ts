export const SYSTEM_CONTENT = `Du bist ein Experte in deutscher Rechtschreibung und Grammatik.
Prüfe den Nutzertext auf Grammatik und Rechtschreibung.
Es bestehen folgende Anforderungen:
 - Die Antwort muss eine Liste von JSON Objekten sein.
 - Jedes JSON Objekt muss die folgende Felder haben: 'startPos', 'endPos', 'outputSequence'.
 - Jedes JSON Objekte kann ein Feld 'explanation' haben.
 - Das Feld 'startPos' gibt die Startposition des fehlerhaften Textteils im Nutzertext an.
 - Das Feld 'endPos' gibt die Endposition des fehlerhaften Textteils im Nutzertext an.
 - Das Feld 'explanation' gibt eine Erklärung des Problems in ein bis zwei Sätzen an.`;

export const GET_USER_CONTENT_FEW_SHOT = (text: string) =>
  `Nutzertext: Eine Stein würd zum Fenster raus geworfen
[{"startPos": "1", "endPos": "4", "outputSequence": "Ein", "explanation": "Der unbestimmte Artikel 'Ein' bezieht sich auf das Sub
stantiv 'Stein', welches maskulin ist."}, {"startPos": "12", "endPos": "15", "outputSequence": "wird"}, {"startPos": "34", "endPo
s": "41", "outputSequence": "geworfen.", "explanation": "Das Satzende benötigt einen '.'."}]
##
Nutzertext: Der wolken ist schwarzes wird bald regnen.
[{"startPos": "1", "endPos": "3", "outputSequence": "Die", "explanation": "Der bestimmte Artikel 'Die' bezieht sich auf das Subst
antiv 'Wolken', welches im Plural steht und feminin ist."}, {"startPos": "5", "endPos": "10", "outputSequence": "Wolken"}, {"star
tPos": "16", "endPos": "24", "outputSequence": "schwarz. Es", "explanation": "Das Satzende benötigt einen '.' und der Anfang des 
nächsten Satzes muss groß geschrieben werden."}]
##
Nutzertext: Mein Hekke ist zu hoch
[{"startPos": "1", "endPos": "4", "outputSequence": "Meine", "explanation": "Das Possessivpronomen 'Meine' bezieht sich auf das S
ubstantiv 'Hecke', welches feminin ist."}, {"startPos": "6", "endPos": "10", "outputSequence": "Hecke"}, {"startPos": "19", "endP
os": "22", "outputSequence": "hoch.", "explanation": "Das Satzende benötigt einen '.'."}]
##
Nutzertext: Einkaufsliste:
 - ywei Tomaten
 - ein Packung Taschentücher
-sieben Mandarinen
[{"startPos": "19", "endPos": "22", "outputSequence": "zwei"}, {"startPos": "35", "endPos": "37", "outputSequence": "eine", "expl
anation": "Das Zahlwort 'eine' bezieht sich auf das Substantiv 'Packung', welches feminin ist."}, {"startPos": "61", "endPos": "6
7", "outputSequence": " - sieben"}]
##
Nutzertext: Der Pfarrer hielt sein Predigt Danach segnete sie die Gemeindemitglieder.
[{"startPos": "24", "endPos": "30", "outputSequence": "Predigt.", "explanation": "Am Ende eines Satzes muss ein '.' stehen."}, {"
startPos": "47", "endPos": "49", "outputSequence": "er", "explanation": "Das Personalpronomen 'er' bezieht sich auf 'Pfarrer' aus
 dem vorherigen Satz."}]
##
Nutzertext: Er sagte "Es tut mir leid!"
[{"startPos": "4", "endPos": "8", "outputSequence": "sagte:", "explanation": "Die direkte wörtliche Rede muss mit einem ':' einge
leitet werden."}, {"startPos": "22", "endPos": "27", "outputSequence": "leid!\".", "explanation": "Am Ende eines Satzes muss ein 
'.' stehen."}]
##
Nutzertext: xjd jasuhj xjaksd neask eansLustige Leute gehen auf die Straße.
[{"startPos": "1", "endPos": "4", "outputSequence": "", "explanation": "Dieses Wort ist nicht bekannt."}, {"startPos": "5", "endP
os": "11", "outputSequence": "", "explanation": "Dieses Wort ist nicht bekannt."}, {"startPos": "12", "endPos": "18", "outputSequ
ence": "", "explanation": "Dieses Wort ist nicht bekannt."}, {"startPos": "19", "endPos": "24", "outputSequence": "", "explanatio
n": "Dieses Wort ist nicht bekannt."}, {"startPos": "25", "endPos": "35", "outputSequence": "Lustige"}]
##
Nutzertext: Dieser Satz  ist in deutsch geschrieben.
[{"startPos": "12", "endPos": "13", "outputSequence": " "}]
##
Nutzertext: Die große Johann liebt Brokkoli.
[{"startPos": "1", "endPos": "3", "outputSequence": "Der", "explanation": "Der bestimmte Artikel 'Der' bezieht sich auf den Namen
 'Johann', welcher maskulin ist."}]
##
Nutzertext: Deine Aussage nach, verstehst du dich aufs kochen.
[{"startPos": "1", "endPos": "5", "outputSequence": "Deiner", "explanation": "Das Possessivpronomen 'Deiner' steht hier im Akkusa
tiv und bezieht sich auf das Substantiv 'Aussage', welches feminin ist."}, {"startPos": "39", "endPos": "42", "outputSequence": "
auf's"}]
##
Nutzertext: Grüner Papier wird zum Schreiben verwendet.
[{"startPos": "1", "endPos": "6", "outputSequence": "Grünes", "explanation": "Das Adjektiv 'Grünes' bezieht sich auf das Substant
iv 'Papier', welches sächlich ist."}]
##
Nutzertext: Diese Satzt ist flash.
[{"startPos": "1", "endPos": "5", "outputSequence": "Dieser", "explanation": "Das Adjektiv 'Dieser' bezieht sich auf das Substant
iv 'Satz', welches maskulin ist."}, {"startPos": "7", "endPos": "11", "outputSequence": "Satz"}, {"startPos": "17", "endPos": "22
", "outputSequence": "falsch."}]
##
Nutzertext: Diese Buc hat seiten.
[{"startPos": "1", "endPos": "5", "outputSequence": "Dieses", "explanation": "Das Adjektiv 'Dieses' bezieht sich auf das Substant
iv 'Buch', welches neutral ist."}, {"startPos": "7", "endPos": "9", "outputSequence": "Buch"}, {"startPos": "15", "endPos": "21",
 "outputSequence": "Seiten."}]
##
Nutzertext: ${text}`;
