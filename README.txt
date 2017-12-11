Zinc Platform Coding Challenge

Backend: Node.js
Front-end: jQuery, bootstrap
Testing: Mocha, Chai, Sinon, Nock

Takes an XML file that adheres to DTD "play.dtd" and counts the number of speakers. Works for
any of the Shakespearian plays on http://www.ibiblio.org/xml/examples/shakespeare/ 

I created two main classes, Poet and CountManager which are the scraper object and data store object
respectively. Separating data from application logic makes the store object swappable and
easier for testing.

Application logic:
AJAX request to API Endpoint -> Backend uses XML/HTML parser to count info -> JSON is returned and displayed

On the front-end, I opted to using jQuery because I did not want to reload a new page
every time the user typed in a new XML file link.
