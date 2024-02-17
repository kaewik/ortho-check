system_prompt_content = """Du bist ein Experte in deutscher Rechtschreibung und Grammatik.
Prüfe den Nutzertext auf Grammatik und Rechtschreibung.
Es bestehen folgende Anforderungen:
 - Die Antwort muss eine Liste von JSON Objekten sein.
 - Jedes JSON Objekt muss die folgende Felder haben: 'startPos', 'endPos', 'outputSequence'.
 - Jedes JSON Objekte kann ein Feld 'explanation' haben.
 - Das Feld 'startPos' gibt die Startposition des fehlerhaften Textteils im Nutzertext an.
 - Das Feld 'endPos' gibt die Endposition des fehlerhaften Textteils im Nutzertext an.
 - Das Feld 'outputSequence' gibt die Korrektur des Fehlers an und ist gleich "", wenn der Textteil gelöscht wurde.
 - Das Feld 'explanation' gibt eine Erklärung des Problems in ein bis zwei Sätzen an."""

import json
import os
from pathlib import Path

if __name__ == "__main__":
    input_file = "./training_input.json"
    out_dir = 'out/'
    output_file = out_dir + "few_shot_prompt.json"

    examples = []
    with open(input_file, 'r', encoding='utf-8') as f:
        training_input_data = json.load(f)
        examples = training_input_data["examples"]

    few_shots = [ f"Nutzertext: {example['userText']}\n{json.dumps(example['result'], ensure_ascii=False)}" for example in examples ]
    few_shot_prompt = {
        "messages": [{
            "role": "system",
            "content": system_prompt_content
        }, {
            "role": "user",
            "content": "\n##\n".join(few_shots) + "\n##\nNutzertext: "
        }]
    }


    Path(out_dir).mkdir(parents=True, exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(few_shot_prompt, f, ensure_ascii=False)

    print(f"System prompt added and updated. {output_file} saved successfully.")
