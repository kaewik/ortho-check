# Fine Tuning for Germand Orthography Checking

## Requirements

- python 3

## Generate Few Shot Prompt

```
$ python ./create-few-shot-prompt.py
```

This will create a file called `out/few_shot_prompt.json`, which contains a single open ai api compatible prompt.
The data used to generate this file can be found in `training_input.json`.

### Get the User Prompt

```
$ cat out/few_shot_prompt.json | jq '.messages[1].content' -r
```

### Get the System Prompt

```
$ cat out/few_shot_prompt.json | jq '.messages[0].content' -r
```

## Generate Training Data

```
$ python ./create-training-data.py
```

This will create a file called `out/training.jsonl`, which can be uploaded to open ai.
The training examples can be found in `training_input.json`.
