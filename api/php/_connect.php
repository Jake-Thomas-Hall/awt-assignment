<?php
// Ensure timezone is set correctly when rendering pages.
date_default_timezone_set("Europe/London");

$dbPassword = "5D6t6thF5JLOalzN";
$dbUserName = "awt-assignment";
$dbServer = "localhost";
$dbName = "awt-assignment";

$connection = new mysqli($dbServer, $dbUserName, $dbPassword, $dbName);

if ($connection->connect_errno) {
    exit("Database connection failed. Reason:".$connection->connect_error);
}