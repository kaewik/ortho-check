# Fine Tuning for Germand Orthography Checking

## Requirements

- python 3

## Build Training Data

```
$ python ./create-training-data.py
```

This will create a file called `out/training.jsonl`, which can be uploaded to open ai.
The training examples can be found in `training_input.json`.
