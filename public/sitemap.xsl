<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - Progineer</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            margin: 0;
            padding: 20px;
          }
          h1 {
            color: #787346;
            font-size: 1.5em;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
            color: #333;
          }
          tr:hover {
            background-color: #f5f5f5;
          }
          a {
            color: #787346;
          }
          .url {
            max-width: 400px;
            word-break: break-all;
          }
          .header {
            background-color: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 20px;
          }
          .footer {
            font-size: 0.8em;
            color: #666;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Plan du site XML de Progineer</h1>
          <p>Ce fichier XML est utilisé par les moteurs de recherche pour découvrir toutes les pages du site.</p>
        </div>
        <div>
          <table>
            <tr>
              <th>URL</th>
              <th>Dernière modification</th>
              <th>Fréquence</th>
              <th>Priorité</th>
            </tr>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td class="url"><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                <td><xsl:value-of select="sitemap:lastmod"/></td>
                <td><xsl:value-of select="sitemap:changefreq"/></td>
                <td><xsl:value-of select="sitemap:priority"/></td>
              </tr>
            </xsl:for-each>
          </table>
        </div>
        <div class="footer">
          <p>Généré par Progineer - <a href="https://progineer.fr">progineer.fr</a></p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
