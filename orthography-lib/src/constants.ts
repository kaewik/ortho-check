export const SYSTEM_CONTENT = 'Du bist ein Experte in deutscher Rechtschreibung und Grammatik und kennst den Duden auswendig.';
export const GET_USER_CONTENT = (text: string) => `
Deine Aufgabe ist es den Nutzertext auf Grammatik und Rechtschreibung zu prüfen.
Gib für jeden Fehler den inkorrekten Textteil, den korrigierten Textteil und eine sehr kurze Erklärung (undefined, wenn nötig).
Deine Antwort muss eine Liste von JSON Objekten sein, die folgenden Felder haben müssen:  "inputSequence", "outputSequence", "explanation"

Nutzertext: """${text}"""
`;
