
/* funcao para criar estruturas */
function makeStruct(names) 
{
	names = names.split(' ');
	var count = names.length;
	function constructor() 
	{
		for (var i = 0; i < count; i++) 
		{
			this[names[i]] = arguments[i];
		}
	}
	return constructor;
}

/* define tipo struct de horario de disciplina */
var Horario = makeStruct("turma nome semana inicio fim");
var Disciplina = makeStruct("cod nome creditos vetHorario selecionada");

/* registra os valores correntes de cada celula da tabela */
var ctrlTab = new Array();

/* registra os valores correntes da lista de disciplina */
var ctrlLst = new Array();

/* vetor de ira registrar todas as informacoes de todas as disciplinas */
var ctrlDisc = new Array();

/* vetor de conversao de codigos de dias da semana */
var convSem = new Array('', 'Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado');
var convSemAbrv = new Array('', 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab');

/* diz qual a opcao corrente */
var opcaoCorr = 1;

/* contadores de creditos e disciplinas */
var cntCredSel = new Array(undefined, 0, 0, 0);
var cntDiscSel = new Array(undefined, 0, 0, 0);
var cntCredLst = new Array(undefined, 0, 0, 0);
var cntDiscLst = new Array(undefined, 0, 0, 0);

function contaDisciplinaSelecionada(codDisc, sinal)
{
	var creditos = Number(ctrlDisc[codDisc].creditos);

	cntCredSel[opcaoCorr] += sinal*creditos;
	cntDiscSel[opcaoCorr] += sinal;

	$('#cntCredSel_'+opcaoCorr).html(cntCredSel[opcaoCorr]);
	$('#cntDiscSel_'+opcaoCorr).html(cntDiscSel[opcaoCorr]);
}

function contaDisciplinaListada(codDisc, sinal, opcao)
{
	var creditos = Number(ctrlDisc[codDisc].creditos);

	cntCredLst[opcao] += sinal*creditos;
	cntDiscLst[opcao] += sinal;

	$('#cntCredLst_'+opcao).html(cntCredLst[opcao]);
	$('#cntDiscLst_'+opcao).html(cntDiscLst[opcao]);
}

function inicializa()
{
	/* inicializa vetores de controle da tabela de horarios e da lista de disciplinas */
	for(var i = 1; i <= 3; i++)
	{
		ctrlTab[i] = new Array();
		ctrlLst[i] = new Array();

		for(var j = 2; j <= 7; j++)
		{
			ctrlTab[i][j] = new Array();

			for(var k = 7; k < 23; k++)
			{
				ctrlTab[i][j][k] = '0_0';
			}
		}
	}

	$('#div_h3').hide();
	$('#div_h2').hide();
	$('#div_h1').show();

}

/* backtracking que gera combinacao de horarios */
function automatic(codDisc)
{
	/* condicao de termino, qd ja tiver percorrido todas as disciplinas */
	if(codDisc == ctrlDisc.length) 
	{
		return true;
	}

	/* se a disciplina nao esta adicionada na opcao corrente, ignore-a */
	if(disciplinaAdicionada(codDisc, opcaoCorr) == false)
	{
		return automatic(codDisc+1);
	}

	/* pega vetor de horarios da disciplina especifica */
	var info = ctrlDisc[codDisc].vetHorario;
	var qtd = info.length;

	/* deve-se ignorar a disciplina que nao tem horarios */
	if(qtd == 0)
	{ 
		return automatic(codDisc+1);
	}

	/* tenta encaixar cada horario */
	for(var i = 0; i < Number(qtd); i++)
	{
		/* se o primeiro horario estiver vazio */
		//if($('#_'+opcaoCorr+'_'+info[i].semana+'_'+info[i].inicio).val() == '0_0')
		if(ctrlTab[opcaoCorr][info[i].semana][info[i].inicio] == '0_0')
		{
			/* tenta encaixar o resto */
			$('#_'+opcaoCorr+'_'+info[i].semana+'_'+info[i].inicio).val(info[i].turma+'_'+codDisc);
			if(!atualizaTab(info[i].semana, info[i].inicio, 0)) continue;

			/* passa para a proxima disciplina */
			if(automatic(codDisc+1)) return true;

			/* desmarca horario selecionado, para tentar o proximo */
			$('#_'+opcaoCorr+'_'+info[i].semana+'_'+info[i].inicio).val('0_0');
			atualizaTab(info[i].semana, info[i].inicio, 0);
		}
	}

	return false;
}

function ctrlAutomatic()
{
	if(cntCredLst[opcaoCorr] > 30)
	{
		alert('Disciplinas a serem combinadas somam mais de 30 creditos. Favor remover alguma.');

		return false;
	}

	for(var i = 0; i < ctrlDisc.length; i++)
	{
		var tmp = ctrlLst[opcaoCorr][i];

		if(tmp != '0_0' && tmp != undefined)
		{
			alert('Limpe a tabela primeiro');
			return;
		}
	}

	if(automatic(0))
	{
		alert('Foi possivel combinar todas as disciplinas automaticamente');
	}
	else
	{
		alert('Nao foi possivel combinar todas as disciplinas automaticamente');
	}
}

function atualizaTab(sem, hor, aviso)
{
	/* pega o valor antigo e o novo do campo que foi modificado */
	var valorAntigo = ctrlTab[opcaoCorr][sem][hor];
	var valorNovo = $('#_'+opcaoCorr+'_'+sem+'_'+hor).val();

	var vetValorAntigo = valorAntigo.split('_');
	var vetValorNovo = valorNovo.split('_');

	if(ctrlDisc[vetValorNovo[1]].selecionada[opcaoCorr] && vetValorNovo[0] != 0)
	{
		$('#_'+opcaoCorr+'_'+sem+'_'+hor).val(valorAntigo);

		if(aviso) alert('Disciplina ja selecionada');

		return false;
	}

	if(valorNovo != '0_0')
	{
		var cntCreditoInt = cntCredSel[opcaoCorr];
		if(valorAntigo != '0_0') 
		{
			cntCreditoInt -= Number(ctrlDisc[vetValorAntigo[1]].creditos);
		}

		cntCreditoInt += Number(ctrlDisc[vetValorNovo[1]].creditos);

		if(cntCreditoInt > 30)
		{
			$('#_'+opcaoCorr+'_'+sem+'_'+hor).val(valorAntigo);

			if(aviso) alert('Quantidade de creditos nao pode ser maior que 30');

			return false;
		}
	}

	if(valorNovo != valorAntigo)
	{
		var vetHorNovo = ctrlDisc[vetValorNovo[1]].vetHorario;
		var qtdNovo = vetHorNovo.length;

		var vetHorAnt = ctrlDisc[vetValorAntigo[1]].vetHorario;
		var qtdAnt = vetHorAnt.length;

		if(vetValorNovo[0] > 0) /* se o novo valor nao eh vazio */
		{
			for(var i = 0; i < Number(qtdNovo); i++)
			{
				if(vetHorNovo[i].turma == vetValorNovo[0])
				{
					for(var j = Number(vetHorNovo[i].inicio); j < Number(vetHorNovo[i].fim); j++)
					{
						var tmp = ctrlTab[opcaoCorr][vetHorNovo[i].semana][j];
						var vetTmp = tmp.split('_');

						if(tmp != '0_0' && tmp != valorAntigo)
						{
							if(aviso) alert(vetHorNovo[i].semana+' as '+j+'h ja esta ocupado pela disciplina '+ctrlDisc[vetTmp[1]].nome)

							$('#_'+opcaoCorr+'_'+sem+'_'+hor).val(valorAntigo);

							return false;
						}
					}
				}
			}
		}

		if(vetValorAntigo[0] > 0) /* se valor antigo nao era vazio */
		{
			for(var i = 0; i < Number(qtdAnt); i++)
			{
				if(vetHorAnt[i].turma == vetValorAntigo[0])
				{
					for(var j = Number(vetHorAnt[i].inicio); j < Number(vetHorAnt[i].fim); j++)
					{
						$('#_'+opcaoCorr+'_'+vetHorAnt[i].semana+'_'+j).val('0_0');
						ctrlTab[opcaoCorr][vetHorAnt[i].semana][j] = '0_0';
					}
				}
			}
			ctrlDisc[vetValorAntigo[1]].selecionada[opcaoCorr] = false;

			$('#lst_'+opcaoCorr+'_'+vetValorAntigo[1]).val('0_0');
			ctrlLst[opcaoCorr][vetValorAntigo[1]] = '0_0';

			contaDisciplinaSelecionada(vetValorAntigo[1], -1);
		}

		if(vetValorNovo[0] > 0) /* se valor novo nao eh vazio */
		{
			for(var i = 0; i < Number(qtdNovo); i++)
			{
				if(vetHorNovo[i].turma == vetValorNovo[0])
				{
					for(var j = Number(vetHorNovo[i].inicio); j < Number(vetHorNovo[i].fim); j++)
					{
						$('#_'+opcaoCorr+'_'+vetHorNovo[i].semana+'_'+j).val(valorNovo);
						ctrlTab[opcaoCorr][vetHorNovo[i].semana][j] = valorNovo;
					}
				}
			}
			ctrlDisc[vetValorNovo[1]].selecionada[opcaoCorr] = true;

			$('#lst_'+opcaoCorr+'_'+vetValorNovo[1]).val(valorNovo);
			ctrlLst[opcaoCorr][vetValorNovo[1]] = valorNovo;

			contaDisciplinaSelecionada(vetValorNovo[1], 1);
		}
	}

	return true;
}

/* atualiza lista lateral de disciplina */
function atualizaLst(codDisc)
{
	/* pega o valor antigo e o novo do campo que foi modificado */
	var valorAntigo = ctrlLst[opcaoCorr][codDisc];
	var valorNovo = $('#lst_'+opcaoCorr+'_'+codDisc).val();

	var vetValorAntigo = valorAntigo.split('_');
	var vetValorNovo = valorNovo.split('_');

	var vetHor = ctrlDisc[codDisc].vetHorario;
	var qtd = vetHor.length;

	var idx = -1;

	if(valorAntigo == '0_0' && valorNovo != '0_0' && (cntCredSel[opcaoCorr] + Number(ctrlDisc[codDisc].creditos)) > 30)
	{

		alert('Quantidade de creditos nao pode ser maior que 30');

		$('#lst_'+opcaoCorr+'_'+codDisc).val(valorAntigo);

		return false;
	}

	if(valorAntigo != valorNovo)
	{
		if(vetValorNovo[0] > 0)
		{
			for(var i = 0; i < Number(qtd); i++)
			{
				if(vetValorNovo[0] == vetHor[i].turma)
				{
					var tmp = ctrlTab[opcaoCorr][vetHor[i].semana][vetHor[i].inicio];
					var vetTmp = tmp.split('_');

					if(tmp != '0_0' && tmp != valorAntigo)
					{
						alert('Horario de '+convSem[vetHor[i].semana]+' as '+vetHor[i].inicio+'h ja esta ocupado pela disciplina '+ctrlDisc[vetTmp[1]].nome);

						$('#lst_'+opcaoCorr+'_'+codDisc).val(valorAntigo);

						return false;
					}

					idx = i;
					break;
				}
			}
		}
		if(vetValorAntigo[0] > 0)
		{
			for(var i = 0; i < Number(qtd); i++)
			{
				if(vetValorAntigo[0] == vetHor[i].turma)
				{
					var tmp = ctrlTab[opcaoCorr][vetHor[i].semana][vetHor[i].inicio];

					$('#_'+opcaoCorr+'_'+vetHor[i].semana+'_'+vetHor[i].inicio).val('0_0');
					atualizaTab(vetHor[i].semana, vetHor[i].inicio, 1);
				}
			}
		}
	}
	if(idx > -1)
	{
		$('#_'+opcaoCorr+'_'+vetHor[idx].semana+'_'+vetHor[idx].inicio).val(valorNovo);
		return atualizaTab(vetHor[idx].semana, vetHor[idx].inicio, 1);
	}
	
	return true;
}

/* alterna entre as 3 opcoes de matricula */
function mostrarOpcao(opcao)
{
	for(i = 1; i <= 3; i++)
	{
		if(i != opcao)
		{
			$('#div_h'+i).hide();
		}
	}
	$('#div_h'+opcao).show();

	opcaoCorr = opcao;
}

function disciplinaAdicionada(numDisc, opcao)
{
	if(ctrlLst[opcao][numDisc] == undefined)
	{
		return false;
	}
	else
	{
		return true;
	}
}

function adicionarDisciplinaHTML(numDisc, opcao)
{
	var qtd = ctrlDisc[numDisc].vetHorario.length;

	var k = 0;
	var vetDisc = new Array();
	var vetCodDisc = new Array();
	var vetDiscVal = new Array();

	/* verificando se a disciplina ja foi adicionada */
	if(disciplinaAdicionada(numDisc, opcao))
	{
		alert('Disciplina ja adicionada');
		return;
	}

	/* adiciona disciplina na lista de disciplinas */
	$('#listagem_'+opcao).append('<div id="div_lst_'+opcao+'_'+numDisc+'"><p align="left">'+ctrlDisc[numDisc].cod+' - '+ctrlDisc[numDisc].nome+' - '+ctrlDisc[numDisc].creditos+'CR <input type="button" onclick="javascript:if(confirm(\'Deseja mesmo remover esta disciplina?\'))removerDisciplina('+numDisc+', '+opcao+')" value="X"/><br><select id="lst_'+opcao+'_'+numDisc+'" onclick="javascript:atualizaLst('+numDisc+');"><option value="0_0"></option></select></div>');

	/* zera vetor do controle da listagem de disciplinas */
	ctrlLst[opcao][numDisc] = '0_0';

	contaDisciplinaListada(numDisc, 1, opcao);

	/* percorre todos os horarios disponiveis para aquela disciplina */
	for(var i = 0; i < Number(qtd); i++)
	{
		var hor = ctrlDisc[numDisc].vetHorario[i];

		/* percorre todos os horarios daquele dia, para preencher as celulas da tabela */
		for(var j = Number(hor.inicio); j < Number(hor.fim); j++)
		{
			$('#_'+opcao+'_'+hor.semana+'_'+j).append('<option value=\''+hor.turma+'_'+numDisc+'\'>'+ctrlDisc[numDisc].cod+' - '+hor.nome+'</option>');
			$('#_'+opcao+'_'+hor.semana+'_'+j).show();
		}

		/* cria string que sera visualizada nos options da listagem de disciplinas */
		if(vetDisc[hor.turma] == undefined)
		{
			vetDisc[hor.turma] = hor.nome+': '+convSemAbrv[hor.semana]+' de '+hor.inicio+' as '+hor.fim+'h';
			vetDiscVal[k] = hor.turma+'_'+numDisc;
			vetCodDisc[k++] = hor.turma;
		}	
		else
		{
			vetDisc[hor.turma] += ', '+convSemAbrv[hor.semana]+' de '+hor.inicio+' as '+hor.fim+'h';
		}
	}

	/* preenche os options da lisatgem de disciplinas */
	for(var i = 0; i < Number(vetCodDisc.length); i++)
	{
		$('#lst_'+opcao+'_'+numDisc).append('<option value=\''+vetDiscVal[i]+'\'>'+vetDisc[vetCodDisc[i]]+'</option>');
	}
}

/* solicita os dados da disciplina por ajax e preenche a tela */
function adicionarDisciplina(codDisc, opcao)
{
	if(codDisc == '')
	{
		alert('Enre com um codigo de disciplina, por favor.');
		return;
	}

	var flag = -1;

	/* faz o codigo da disciplina ficar todo maiusculo */
	codDisc = codDisc.toUpperCase();

	/* verifica se a disciplina ja foi adicionada */
	for(i = 0; i < Number(ctrlDisc.length); i++)
	{
		if(ctrlDisc[i].cod == codDisc)
		{
			flag = i;
			break;
		}
	}

	if(flag == -1)
	{
		/* ajax */
		$.get(	"pegahorarios.php",
			{ 'cod': codDisc },
			function(data)
			{
				if(data == '')
				{
					alert('Nao foi possivel adicionar a disciplina '+codDisc);
					return ;
				}

				var tmp = data.split('\n');
				tmp[0] = tmp[0].split(';');

				/* vetor que armazenara os horarios da disciplina */
				var horarios = new Array();

				/* percorre todos os horarios retornados */
				for(i = 1; i < Number(tmp.length); i++) 
				{
					tmp[i] = tmp[i].split(';');

					/* Horario => "turma nome semana inicio fim" */
					horarios.push(new Horario(tmp[i][0], tmp[i][1], tmp[i][2], tmp[i][3], tmp[i][4]));
				}
	
				/* Disciplina => "cod nome creditos vetHorario selecionada" */
				ctrlDisc.push(new Disciplina(codDisc, tmp[0][0], tmp[0][1], horarios, new Array(undefined, false, false, false)));

				var position = ctrlDisc.length - 1;

				/* adiciona o codigo html em todas as opcoes, ou nao */
				if(opcao == 0)
				{
					for(var i = 1; i <= 3; i++)
					{
						adicionarDisciplinaHTML(position, i);
					}
				}
				else
				{
					adicionarDisciplinaHTML(position, opcao);
				}
			});
	}
	else
	{
		/* adiciona o codigo html em todas as opcoes, ou nao */
		if(opcao == 0)
		{
			for(var i = 1; i <= 3; i++)
			{
				adicionarDisciplinaHTML(flag, i);
			}
		}
		else
		{
			adicionarDisciplinaHTML(flag, opcao);
		}
	}
}

function removerDisciplina(numDisc, opcao)
{
	var lstHor = ctrlDisc[numDisc].vetHorario;
	var qtd = lstHor.length;

	var value = ctrlLst[opcao][numDisc];

	ctrlLst[opcao][numDisc] = undefined;
	$('#div_lst_'+opcao+'_'+numDisc).remove();

	contaDisciplinaListada(numDisc, -1, opcao);

	var selecionada = false;

	for(var i = 0; i < Number(qtd); i++)
	{
		for(var j = Number(lstHor[i].inicio); j < Number(lstHor[i].fim); j++)
		{
			var tmp = ctrlTab[opcao][lstHor[i].semana][j];

			if(tmp == value && value != '0_0')
			{
				$('#_'+opcao+'_'+lstHor[i].semana+'_'+j+' option:selected').remove();
				$('#_'+opcao+'_'+lstHor[i].semana+'_'+j).val('0_0');
				ctrlTab[opcao][lstHor[i].semana][j] = '0_0';

				selecionada = true;
			}
			else
			{
				$('#_'+opcao+'_'+lstHor[i].semana+'_'+j+' option[value="'+lstHor[i].turma+'_'+numDisc+'"]').remove();
			}
		}
	}

	if(selecionada)
	{
		contaDisciplinaSelecionada(numDisc, -1);
	}
}

function limpaTabela()
{
	for(var i = 0; i < Number(ctrlDisc.length); i++)
	{
		if(disciplinaAdicionada(i, opcaoCorr))
		{
			$('#lst_'+opcaoCorr+'_'+i).val('0_0');
			atualizaLst(i);
		}
	}
}
