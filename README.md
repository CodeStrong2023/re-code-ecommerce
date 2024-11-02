
project

java 21 download for windows 
https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html
Maven for windows 
https://maven.apache.org/download.cgi

Config:
environment variable for windows 
name = JAVA_HOME
value = path to jdk-21



java -version
return 
java version "21.0.4" 2024-07-16 LTS
mvn -version
Apache Maven 3.9.0 (9b58d2bad23a66be161c4664ef21ce219c2c8584)
Maven home: C:\maven
Java version: 21.0.4, vendor: Oracle Corporation, runtime: C:\Program Files\Java\jdk-21
Default locale: es_AR, platform encoding: UTF-8
Ejecucion :
cd cd backend/bulf
mvn clean
mvn install
mvn spring-boot:run


    <h1># re-code-ecommerce</h1>

    <h2>Requirements:</h2>
    <ul>
        <li><strong>Java 21</strong>: <a href="https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html">Descargar para Windows</a></li>
        <li><strong>Maven</strong>: <a href="https://maven.apache.org/download.cgi">Descargar para Windows</a></li>
    </ul>

    <h2>Config environment variable for windows :</h2>
    <ul>
        <li><strong>variable</strong>: <code>JAVA_HOME</code></li>
        <li><strong>Value</strong>: path to jdk-21 (por ejemplo: <code>path\jdk-21</code>)</li>
    </ul>
    <blockquote>
        <p><strong>Nota</strong>: Asegúrate de agregar <code>%JAVA_HOME%\bin</code> a la variable <code>Path</code> para que el sistema reconozca los comandos de Java desde cualquier ubicación.</p>
    </blockquote>

    <h2>checks:</h2>
    <ul>
        <li><strong>Java</strong>:  
            <code>java -version</code> return: 
            <blockquote><code>java version "21.0.4" 2024-07-16 LTS</code></blockquote>
        </li>
        <li><strong>Maven</strong>:  
            <code>mvn -version</code> returns maybe: 
            <blockquote>
                <code>Apache Maven 3.9.0 (9b58d2bad23a66be161c4664ef21ce219c2c8584)<br>
                Maven home: C:\maven<br>
                Java version: 21.0.4, vendor: Oracle Corporation, runtime: C:\Program Files\Java\jdk-21<br>
                Default locale: es_AR, platform encoding: UTF-8</code>
            </blockquote>
        </li>
    </ul>

    <h2>exceute</h2>
    <ol>
        <li>move to: 
            <code>cd backend/bulf</code>
        </li>
        <li>execute:
            <code>mvn clean install</code>
        </li>
        <li>starts:
            <code>mvn spring-boot:run</code>
        </li>
    </ol>


