<html>
<head>
<title>MYSQL Test</title>
</head>
<body>
<?php
    /* Connecting, selecting database */
    include "begin.php";

    print "Connected successfully<br>\n";
    print "Database selected successfully<br>\n";

    /* Creating table */
    $q = "CREATE TABLE usuario (
          login text NOT NULL,
          nome text NOT NULL,
          email text NOT NULL,
          senha text NOT NULL )";

    mysql_query($q) or die("Could not create table: ".mysql_error()."<br>\n");
    print "Table created successfully<br>\n";

    /* Inserting row */
    $q = "INSERT INTO usuario (login, nome, email, senha) VALUES ('login_test', 'nome_test', 'email@test', 'senha_test' )";
    mysql_query($q) or die("Could not insert row: ".mysql_error()."<br>\n");
    print "Row inserted successfully<br>\n";

    /* Performing SQL query */
    $query = "SELECT * FROM usuario";
    $result = mysql_query($query) or die("Query failed, cannot find table<br>\n");
    print "Query selected successfully<br>\n";

    /* Printing results in HTML */
    print "<table>\n";
    while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {
        print "\t<tr>\n";
        foreach ($line as $col_value) {
            print "\t\t<td>$col_value</td>\n";
        }
        print "\t</tr>\n";
    }
    print "</table>\n";

    /* Free resultset */
    mysql_free_result($result);

    /* Dropping table */
    $q = "DROP TABLE usuario";
    mysql_query($q) or die("Could not drop table: ".mysql_error()."<br>\n");
    print "Table dropped successfully<br>\n";

    /* Closing connection */
    mysql_close($link);
?>
</body>
</html>
