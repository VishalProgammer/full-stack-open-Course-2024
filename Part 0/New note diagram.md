````mermaid
    sequenceDiagram
        participant browser
        participant server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
        activate server
        server-->>browser: HTML document
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate server
        server-->>browser: the css file
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
        activate server
        server-->>browser: the JavaScript file
        deactivate server

        Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate server
        server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
        deactivate server

    Note right of browser: The browser executes the callback function that renders the notes```

<<<<<<< HEAD
    ---
title: Note Diagram of how page loads
---
flowchart LR
    id1[browser]
=======
  graph TD;
      browser-->server;
      A-->C;
      B-->D;
      C-->D;
>>>>>>> aa30e9ef05c15fd5ac2b31d42be535c9049d260a

````
