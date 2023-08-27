# Soylent Application
Configurable simple CMS for easy link access.

System requirements:
- Web Server Apache or Nginx or online Hosting.
- PHP 7.4 or higher.
- It does not need MySQL database.

1) Extract all files from the release Zip archive and copy them to the root directory of the server or to
one of its subfolders.
2) Open your browser and point to that folder on the server.
3) The main page will appear.
4) To start editing, click on the symbol at the top right header and use the default credentials:
- User: admin
- Psw: admin

6) To finish editing, click again the symbol at the top right header.

# Update to new release:

To update to a new release:

1) Extract all files from the latest release Zip archive.
2) With something like FileZilla keep the following folders on the server (do not delete) to maintain your data:
- Config
- img
- itemicons
- sec
3) Delete and replace all the remaining folders and files with the ones that come with the new release:
- api
- static
- asset-manifest.json
- index.html
- manifest.json
- robots.txt
- .htaccess
4) Refresh the page. Update is complete.

Follow the /public/doc for more details.
