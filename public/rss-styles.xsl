<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html><head><title>DevDiary.uk RSS Feed</title>
<style>body{font-family:system-ui,sans-serif;max-width:680px;margin:40px auto;padding:0 20px;background:#0a0e1a;color:#e8edf8}a{color:#7c9fff}h1{font-family:Georgia,serif}li{margin:16px 0}small{color:#5a6a8a}</style>
</head><body>
<h1>DevDiary.uk — RSS Feed</h1>
<p style="color:#8a9bbf">Subscribe in your reader of choice.</p>
<ul><xsl:for-each select="rss/channel/item">
<li><a href="{link}"><xsl:value-of select="title"/></a><br/><small><xsl:value-of select="pubDate"/></small></li>
</xsl:for-each></ul>
</body></html>
</xsl:template>
</xsl:stylesheet>
