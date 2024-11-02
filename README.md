<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1># re-code-ecommerce</h1>
    <h2>Requirements:</h2>
    <ul>
        <li><strong>Java 21</strong>: <a href="https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html">Descargar para Windows</a></li>
        <li><strong>Maven</strong>: <a href="https://maven.apache.org/download.cgi">Descargar para Windows</a></li>
    </ul>
    <h2>Config environment variable for windows :</h2>
    <ul>
        <li><strong>variable</strong>: <code>JAVA_HOME</code></li>
        <li><strong>Value</strong>: path to jdk-21 (example: <code>path\jdk-21</code>)</li>
    </ul>
    <h2>checks:</h2>
    <ul>
        <li><strong>Java:</strong><br>
            <code>java -version</code><br>
            return: 
            <blockquote>java version "21.0.4" 2024-07-16 LTS</blockquote>
        </li>
        <li><strong>Maven:</strong><br> 
            <code>mvn -version</code><br>
            returns maybe: 
            <blockquote>
                Apache Maven 3.9.0 (hash)<br>
                Maven home: path\maven<br>
                Java version: 21.0.4, vendor: Oracle Corporation, runtime: path\jdk-21<br>
                Default locale: es_AR, platform encoding: UTF-8
            </blockquote>
        </li>
    </ul>
    <h2>exceute</h2>
    <ol>
        <li>move to:<br>
            <code>cd backend/bulf</code>
        </li>
        <li>execute:<br>
            <code>mvn clean</code><br>
            <code>mvn install</code>
        </li>
        <li>start:<br>
            <code>mvn spring-boot:run</code>
        </li>
    </ol>
</body>
</html>
