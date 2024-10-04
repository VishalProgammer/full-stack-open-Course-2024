```mermaid
 ---
title: Diagram of how Notes Page Loads while adding a new note
---
%%{init: {"flowchart": {"htmlLabels": false}} }%%

flowchart LR
  subgraph one
    id1[Browser]
    cmd1[/GET site URL/]
    id2[Server]
    id1-->cmd1-->id2
    id2-->cmd1-->id1

```
