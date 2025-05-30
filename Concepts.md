# Server Side Rendering (SSR)
Flow:
Browser → Server: The browser sends a request for the webpage.
Server → Appwrite: The server fetches data from Appwrite (backend service).
Appwrite → Server: Appwrite sends back the data.
Server: The server renders the complete HTML page with the fetched data.
Server → Browser: The server sends the fully rendered HTML to the browser.

## Key Points:
Rendering happens on the server.
The user gets a fully rendered page immediately.
Better for SEO and initial load performance.
Server bears the rendering load.

# 🖥️ Client Side Rendering (CSR)
Flow:
Browser → Server: The browser requests the webpage.
Server → Browser: The server sends basic HTML (likely with a JavaScript bundle).
Browser → Appwrite: The browser (client-side JavaScript) fetches data from Appwrite.
Appwrite → Browser: Appwrite sends back the data.
Browser: The browser renders the page using JavaScript and the fetched data.

## Key Points:
Rendering happens on the client (browser).
Initial load is faster, but actual content takes longer to appear.
Better for interactive apps, but not ideal for SEO.
Client bears the rendering load.

{Summary Table}
Feature	                 SSR	                     CSR
Where rendering happens	Server	                    Client (Browser)
SEO-friendly?	       ✅ Yes	                  ❌ No (requires extra setup)
First Load Speed	   ✅ Fast content delivery	  ❌ Slower content display
Ideal for	           Blogs, news, SEO content	    Dashboards, SPAs, dynamic apps
