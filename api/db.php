<?php


function pdo_mysql(){
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "soaq";

try {
return new PDO('mysql:host=' . $servername . ';dbname=' . $dbname . ';charset=utf8', $username, $password);
} catch (PDOException $exception) {
}}

?>
