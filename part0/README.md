## Part 0 - Exercises 0.1.-0.6.

<br/>

### 0.4: new note

###### Sequence diagram depicting the situation where the user creates a new note on [notes page](https://studies.cs.helsinki.fi/exampleapp/notes) by writing something into the text field and clicking the submit button.

<img src="./images/new_note.png"/>

<pre>
<code> 
browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
note over  server
server asks the browser
to do a new HTTP GET request
to the address defined 
in the header's Location

* the address notes.

end note
server-->browser: URL Redirect to /exampleapp/notes
note over  browser
brower redirect to the header's location

* exampleapp/notes

end note
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
</code>
</pre>
<br/>

### 0.5: Single page app

###### Sequence diagram depicting the situation where the user goes to the single page app version of the [notes app](https://studies.cs.helsinki.fi/exampleapp/spa).

<img src="./images/spa.png"/>

<pre>
<code> 
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
</code>
</pre>
<br/>

### 0.6: New note

###### Sequence diagram depicting the situation where the user creates a new note using the single page version of the app.

<img src="./images/new_note_spa.png"/>

<pre>
<code> 
note over browser:
when the user submit the form, the browser executes the
event handler that append the new note to the DOM to
display and send HTTP POST with new JSON file to the server
end note
browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
</code>
</pre>
