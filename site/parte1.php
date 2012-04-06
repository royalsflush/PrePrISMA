<?php
	include "begin.php";
	include "functions.php";

	$cod = get("cod");

	$_SESSION["cod"] = $cod;

	if(empty($cod)) die("Favor entrar com um codigo valido");

	$sql = "SELECT DA.PeriodoCursar, DA.CodDisciplina, D.Nome, D.QtdCreditos
			FROM DisciplinaAlunoApto DA
				INNER JOIN Disciplina D
					ON(DA.CodDisciplina = D.PK_Codigo)
			WHERE DA.CodAluno = $cod;";

	$result = mysql_query($sql) or die("Nao foi possivel selecionar disciplinas aptas");
?>
<html> 
<head> 
	<title>Selecao de Disciplinas Aptas</title> 
</head> 
<body> 
<div width="700" align="center"> 
	<form name="aptas" method="post" action="parte2.php"  enctype="application/x-www-form-urlencoded"> 
		<input name="qtd" type="hidden" value="<?php echo mysql_num_rows($result)?>"/> 
		<table border = 1> 
			<tr> 
				<td></td> 
				<th>Periodo</th> 
				<th>Codigo</th> 
				<th>Nome</th> 
				<th>Creditos</th>
				<th>Ementa</th> 
			</tr>
<?php
	$cnt = 0;
	while($row = mysql_fetch_array($result))
	{
?> 
			<tr> 
				<td>
					<input name="flag_<?php echo $cnt?>" type="checkbox"/>
					<input name="cod_<?php echo $cnt?>" type="hidden" value="<?php echo $row["CodDisciplina"]?>"/>
				</td>
				<td align="center"><?php echo $row["PeriodoCursar"]?></td> 
				<td align="center"><?php echo $row["CodDisciplina"]?></td> 
				<td><?php echo $row["Nome"]?></td> 
				<td align="center"><?php echo $row["QtdCreditos"]?></td>
				<td align="center"><a href="#" onclick="javascript:window.open('http://www.puc-rio.br/ferramentas/ementas/ementa.aspx?cd=<?php echo $row["CodDisciplina"]?>', 'Ementa', 'height=500,width=430,scrollbars=yes')">Link</a></td> 
			</tr> 
<?php
		$cnt++;
	}
?>
			<tr> 
				<td colspan="6" align="center"><input value="Enviar" type="submit"/></td> 
			</tr> 
		</table> 
	</form> 
</div> 
</body> 
</html> 
