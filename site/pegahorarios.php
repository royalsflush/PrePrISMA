<?php
	include "begin.php";
	include "functions.php";

	$cod = get("cod");

	if(empty($_SESSION["cod"])) die("Deve-se passar pela primeira parte antes!");

	$sql = "SELECT Nome, QtdCreditos FROM Disciplina WHERE PK_Codigo = '$cod';";

	$result = mysql_query($sql);

	if(!($row = mysql_fetch_array($result))) exit;

	echo $row["Nome"].";".$row["QtdCreditos"];

	$sql = "SELECT T.PK_Codigo as CodTurma, T.Nome as Turma, TH.DiaSemana, TH.HoraInicial, TH.HoraFinal
				FROM Turma T
					INNER JOIN TurmaHorario TH
						ON(T.PK_Codigo = TH.FK_CodTurma)
				WHERE T.FK_CodDisciplina = '$cod';";

	$result = mysql_query($sql) or die("Erro ao selecionar: ".mysql_error());

	while($row = mysql_fetch_array($result,true))
	{
		echo "\n";
		echo $row["CodTurma"];
		echo ";";
		echo $row["Turma"];
		echo ";";
		echo $row["DiaSemana"];
		echo ";";
		echo $row["HoraInicial"];
		echo ";";
		echo $row["HoraFinal"];
	}

	mysql_close($link);
?>
