
CREATE OR REPLACE VIEW DisciplinaAlunoAprovado AS
SELECT H1.FK_CodAluno, H1.FK_CodDisciplina 
	FROM Historico H1
	WHERE H1.SituacaoFinal = 'AP' OR H1.SituacaoFinal = 'CP'
UNION
(SELECT H2.FK_CodAluno, ED.FK_EquivaleA 
	FROM Historico H2
		INNER JOIN EquivalenciaDisciplina ED
			ON(ED.FK_CodDisciplina = H2.FK_CodDisciplina)
	WHERE H2.SituacaoFinal = 'AP' OR H2.SituacaoFinal = 'CP'
)
UNION
(SELECT H2.FK_CodAluno, ED.FK_CodDisciplina 
	FROM Historico H2
		INNER JOIN EquivalenciaDisciplina ED
			ON(ED.FK_EquivaleA = H2.FK_CodDisciplina)
	WHERE H2.SituacaoFinal = 'AP' OR H2.SituacaoFinal = 'CP'
);

CREATE OR REPLACE VIEW DisciplinaAlunoApto AS
SELECT A.PK_Matricula AS CodAluno, CD.FK_CodDisciplina AS CodDisciplina, CD.PeriodoCursar
	FROM Aluno A
		INNER JOIN CursoDisciplina CD
			ON(A.FK_CodCurso = CD.FK_CodCurso)
	WHERE 	CD.FK_CodDisciplina NOT IN (
				SELECT FK_CodDisciplina 
					FROM DisciplinaAlunoAprovado
					WHERE FK_CodAluno = A.PK_Matricula
			)
		AND
			NOT EXISTS(
				SELECT PR.FK_CodDisciplina 
					FROM PreRequisito PR 
					WHERE PR.FK_CodDisciplina = CD.FK_CodDisciplina AND
						FK_CodDisciplina NOT IN(
							SELECT FK_CodDisciplina 
								FROM DisciplinaAlunoAprovado
								WHERE FK_CodAluno = A.PK_Matricula
						)
			)
	ORDER BY CD.PeriodoCursar, CD.FK_CodDisciplina;

CREATE OR REPLACE VIEW AlunoCreditosCursados AS
SELECT H.FK_CodAluno, COALESCE(sum(D.QtdCreditos),0) as TotalCreditos
	FROM Historico H
		LEFT JOIN Disciplina D
			ON (D.PK_Codigo = H.FK_CodDisciplina)
	WHERE H.SituacaoFinal = 'AP' OR H.SituacaoFinal = 'CP'
	GROUP BY H.FK_CodAluno;
