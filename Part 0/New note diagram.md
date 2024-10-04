```mermaid
  ---
title: Diagram of how Notes Page Loads while adding a new note
---
flowchart LR
    id1[Browser]
    cmd1[/GET site URL/]
    id2[Server]
    cmd[/GET main.css/]
    id1-->cmd1-->id2
    id2-->cmd1-->id1
    id1-->cmd2-->id2




```
