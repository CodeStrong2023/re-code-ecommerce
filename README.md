# re-code-ecommerce
project
Requirements:
java 21 download for windows 
https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html
Maven for windows 
https://maven.apache.org/download.cgi

Config:
environment variable for windows 
name = JAVA_HOME
value = path to jdk-21


checks:
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
