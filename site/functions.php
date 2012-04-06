<?php
	function get($string)
	{
		if(!isset($_GET[$string])) return false;

		return mysql_real_escape_string(trim($_GET[$string]));
	}

	function post($string)
	{
		if(!isset($_POST[$string])) return false;

		return mysql_real_escape_string(trim($_POST[$string]));
	}

	$convSemAbrv[0] = "";
	$convSemAbrv[1] = "Dom";
	$convSemAbrv[2] = "Seg";
	$convSemAbrv[3] = "Ter";
	$convSemAbrv[4] = "Qua";
	$convSemAbrv[5] = "Qui";
	$convSemAbrv[6] = "Sex";
	$convSemAbrv[7] = "Sab";

	$convSem[0] = "";
	$convSem[1] = "Domingo";
	$convSem[2] = "Segunda-feira";
	$convSem[3] = "Terca-feira";
	$convSem[4] = "Quarta-feira";
	$convSem[5] = "Quinta-feira";
	$convSem[6] = "Sexta-feira";
	$convSem[7] = "Sabado";
?>
