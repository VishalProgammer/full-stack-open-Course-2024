```mermaid
  ---
title: Diagram of how Notes Page Loads while adding a new note
---
flowchart LR
    id1[Browser]
    cmd1[/GET site URL/]
    id2[Server]
    id1-->cmd1-->id2

flowchart LR
  cmd2[/GET main.css file/]
  id1-->cmd2-->id2


```
