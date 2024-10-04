```mermaid
 ---
title: Diagram of how Notes Page Loads while adding a new note
---
%%{init: {"flowchart": {"htmlLabels": false}} }%%
flowchart LR
 id1[Browser]
 cmd1[/GET site URL/]
 id2[Server]
 id1-->cmd1-->id2
 id2-->cmd1-->id1
end


flowchart LR
id3[Browser]
cmd1[/GET main.css/]
id4[Server]
id3-->cmd2-->id4
```
