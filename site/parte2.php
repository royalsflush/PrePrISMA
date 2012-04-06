<?php
	include "begin.php";
	include "functions.php";

	$qtd = post("qtd");

	if(empty($_SESSION["cod"])) die("Deve-se passar pela primeira parte antes!");
?>
<html> 
<head> 
	<title>Selecao de Horarios</title>
	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="parte2.js"></script>
	<script type="text/javascript">

		/* esta funcao sera executada exatamente apos o carregamento da pagina */
		$(document).ready(function()
		{
<?php
	for($i = $j = 1; $i <= $qtd; $i++)
	{
		if(post("flag_".$i)) /* se a disciplina foi selecionada */
		{
			$disc = post("cod_".$i);
?>
			adicionarDisciplina('<?php echo $disc?>',0);
<?php
		}
	}
?>

			inicializa();
		});

	</script>
</head> 
<body> 
<div name="tabela" id="tabela_horario" align="center">
	<h2>Selecao de horarios das disciplinas</h2>
	<input type="button" name="but_1" id="but_1" value="Opcao 1" onclick="javascript:mostrarOpcao(1)"/>
	<input type="button" name="but_2" id="but_2" value="Opcao 2" onclick="javascript:mostrarOpcao(2)"/>
	<input type="button" name="but_3" id="but_3" value="Opcao 3" onclick="javascript:mostrarOpcao(3)"/>
<?php
	for($h = 1; $h <= 3; $h++)
	{
?>
	<div id="div_h<?php echo $h?>"><br>
	<form name="horario_h<?php echo $h?>" method="post" action="#" enctype="application/x-www-form-urlencoded">
		<table border="0">
			<tr>
				<th colspan="2">Selecionado</th>
				<th width="50"></th>
				<th colspan="3">Listado</th>
			</tr>
			<tr>
				<td>QTD de Disciplinas:</td>
				<td align="center"><span id="cntDiscSel_<?php echo $h?>">0</span></td>
				<td><td>
				<td>QTD de Disciplinas:</td>
				<td align="center"><span id="cntDiscLst_<?php echo $h?>">0</span></td>
			</tr>
			<tr>
				<td>QTD de Creditos:</td>
				<td align="center"><span id="cntCredSel_<?php echo $h?>">0</span></td>
				<td><td>
				<td>QTD de Creditos:</td>
				<td align="center"><span id="cntCredLst_<?php echo $h?>">0</span></td>
			</tr>
		</table><br>
	<table>
		<tr><td align="center">
		<table border = 1>
			<tr>
				<th>Horarios</th>
				<th>Segunda-feira</th>
				<th>Terca-feira</th>
				<th>Quarta-feira</th>
				<th>Quinta-feira</th>
				<th>Sexta-feira</th>
				<th>Sabado</th>
			</tr>
<?php
	for($i = 7; $i < 23; $i++)
	{
?> 
			<tr> 
				<th align="center"><?php echo $i?> as <?php echo $i+1?>h</th>
<?php
		for($j = 2; $j < 8; $j++)
		{
?> 
				<td align="center"><div id="div_<?php echo $h?>_<?php echo $j?>_<?php echo $i?>">
					<select type="select" style="display: none;" name="_<?php echo $h?>_<?php echo $j?>_<?php echo $i?>" id="_<?php echo $h?>_<?php echo $j?>_<?php echo $i?>" onchange="javascript:atualizaTab(<?php echo $j?>, <?php echo $i?>, 1)">
						<option value="0_0"></option>
					</select>
				</div></td>
<?php
		}
?>
			</tr> 
<?php
	}
?>
		</table>
		<input type="button" value="Limpar Tabela" onclick="javascript:limpaTabela()"> 
		<input type="button" value="Preencher tabela automaticamente" onclick="javascript:ctrlAutomatic()"> 
		</td><td width="30">
		</td><td align="center">
			<h3><u>Opcao <?php echo $h?></u></h3>
			<div id="contador_<?php echo $h?>">
				<p>
				</p>
			</div>
			<div name="listagem_<?php echo $h?>" id="listagem_<?php echo $h?>" align="center">
			</div>	
			<div>
				<p align="left">Codigo da disciplina a ser adicionada: <br>
				<input type="text" id="codDisciplina_<?php echo $h?>" name="codDisciplina_<?php echo $h?>" value=""/>
				<input type="button" value="Adicionar" onclick="javascript:adicionarDisciplina($('#codDisciplina_<?php echo $h?>').val(),<?php echo $h?>);$('#codDisciplina_<?php echo $h?>').val('');"/>
			</div>
		<td><tr>
	</table>
	</form> 
	</div>
<?php
	}
?>
</div>
</body> 
</html> 
