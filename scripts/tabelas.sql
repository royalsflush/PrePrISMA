-- phpMyAdmin SQL Dump
-- version 3.3.2deb1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tempo de Geração: Nov 19, 2010 as 02:16 PM
-- Versão do Servidor: 5.1.41
-- Versão do PHP: 5.3.2-1ubuntu4.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Banco de Dados: `20102bd1`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `Aluno`
--

CREATE TABLE IF NOT EXISTS `Aluno` (
  `PK_Matricula` int(7) unsigned zerofill NOT NULL,
  `FK_CodCurso` int(11) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `CR` int(3) unsigned NOT NULL,
  PRIMARY KEY (`PK_Matricula`),
  KEY `FK_CodCurso` (`FK_CodCurso`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `Curso`
--

CREATE TABLE IF NOT EXISTS `Curso` (
  `PK_Codigo` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(50) NOT NULL,
  PRIMARY KEY (`PK_Codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `CursoDisciplina`
--

CREATE TABLE IF NOT EXISTS `CursoDisciplina` (
  `FK_CodCurso` int(11) NOT NULL,
  `FK_CodDisciplina` varchar(7) NOT NULL,
  `PeriodoCursar` int(2) unsigned NOT NULL,
  UNIQUE KEY `FK_CodCurso_2` (`FK_CodCurso`,`FK_CodDisciplina`),
  KEY `FK_CodCurso` (`FK_CodCurso`),
  KEY `FK_CodDisciplina` (`FK_CodDisciplina`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `Disciplina`
--

CREATE TABLE IF NOT EXISTS `Disciplina` (
  `PK_Codigo` varchar(7) NOT NULL,
  `Nome` varchar(50) NOT NULL,
  `QtdCreditos` int(2) NOT NULL,
  PRIMARY KEY (`PK_Codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `EquivalenciaDisciplina`
--

CREATE TABLE IF NOT EXISTS `EquivalenciaDisciplina` (
  `FK_CodDisciplina` varchar(7) NOT NULL,
  `FK_EquivaleA` varchar(7) NOT NULL,
  UNIQUE KEY `FK_CodDisciplina_2` (`FK_CodDisciplina`,`FK_EquivaleA`),
  KEY `FK_CodDisciplina` (`FK_CodDisciplina`),
  KEY `FK_EquivaleA` (`FK_EquivaleA`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `Historico`
--

CREATE TABLE IF NOT EXISTS `Historico` (
  `FK_CodAluno` int(7) unsigned zerofill NOT NULL,
  `FK_CodDisciplina` varchar(7) NOT NULL,
  `SituacaoFinal` varchar(2) NOT NULL,
  `GrauFinal` int(3) unsigned DEFAULT NULL,
  `Periodo` int(5) unsigned zerofill NOT NULL,
  KEY `FK_CodAluno` (`FK_CodAluno`),
  KEY `FK_CodDisciplina` (`FK_CodDisciplina`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `PreRequisito`
--

CREATE TABLE IF NOT EXISTS `PreRequisito` (
  `FK_CodDisciplina` varchar(7) NOT NULL,
  `FK_DependeDe` varchar(7) NOT NULL,
  UNIQUE KEY `FK_CodDisciplina_2` (`FK_CodDisciplina`,`FK_DependeDe`),
  KEY `FK_CodDisciplina` (`FK_CodDisciplina`),
  KEY `FK_DependeDe` (`FK_DependeDe`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `Professor`
--

CREATE TABLE IF NOT EXISTS `Professor` (
  `PK_Codigo` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL,
  PRIMARY KEY (`PK_Codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=64 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `Turma`
--

CREATE TABLE IF NOT EXISTS `Turma` (
  `PK_Codigo` int(11) NOT NULL AUTO_INCREMENT,
  `FK_CodDisciplina` varchar(7) NOT NULL,
  `FK_CodProfessor` int(11) NOT NULL,
  `Nome` varchar(3) NOT NULL,
  `Periodo` int(5) unsigned zerofill NOT NULL,
  PRIMARY KEY (`PK_Codigo`),
  KEY `FK_CodDisciplina` (`FK_CodDisciplina`),
  KEY `FK_CodProfessor` (`FK_CodProfessor`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=531 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `TurmaHorario`
--

CREATE TABLE IF NOT EXISTS `TurmaHorario` (
  `FK_CodTurma` int(11) NOT NULL,
  `DiaSemana` int(1) NOT NULL,
  `HoraInicial` int(2) unsigned NOT NULL,
  `HoraFinal` int(2) unsigned NOT NULL,
  KEY `FK_CodTurma` (`FK_CodTurma`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

-- Restrições para a tabela `Aluno`
--
ALTER TABLE `Aluno`
  ADD CONSTRAINT `Aluno_ibfk_1` FOREIGN KEY (`FK_CodCurso`) REFERENCES `Curso` (`PK_Codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para a tabela `CursoDisciplina`
--
ALTER TABLE `CursoDisciplina`
  ADD CONSTRAINT `CursoDisciplina_ibfk_1` FOREIGN KEY (`FK_CodCurso`) REFERENCES `Curso` (`PK_Codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CursoDisciplina_ibfk_2` FOREIGN KEY (`FK_CodDisciplina`) REFERENCES `Disciplina` (`PK_Codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para a tabela `EquivalenciaDisciplina`
--
ALTER TABLE `EquivalenciaDisciplina`
  ADD CONSTRAINT `EquivalenciaDisciplina_ibfk_1` FOREIGN KEY (`FK_CodDisciplina`) REFERENCES `Disciplina` (`PK_Codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `EquivalenciaDisciplina_ibfk_2` FOREIGN KEY (`FK_EquivaleA`) REFERENCES `Disciplina` (`PK_Codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para a tabela `Historico`
--
ALTER TABLE `Historico`
  ADD CONSTRAINT `Historico_ibfk_1` FOREIGN KEY (`FK_CodAluno`) REFERENCES `Aluno` (`PK_Matricula`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Historico_ibfk_2` FOREIGN KEY (`FK_CodDisciplina`) REFERENCES `Disciplina` (`PK_Codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para a tabela `PreRequisito`
--
ALTER TABLE `PreRequisito`
  ADD CONSTRAINT `PreRequisito_ibfk_1` FOREIGN KEY (`FK_CodDisciplina`) REFERENCES `Disciplina` (`PK_Codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `PreRequisito_ibfk_2` FOREIGN KEY (`FK_DependeDe`) REFERENCES `Disciplina` (`PK_Codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para a tabela `Turma`
--
ALTER TABLE `Turma`
  ADD CONSTRAINT `Turma_ibfk_1` FOREIGN KEY (`FK_CodDisciplina`) REFERENCES `Disciplina` (`PK_Codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Turma_ibfk_2` FOREIGN KEY (`FK_CodProfessor`) REFERENCES `Professor` (`PK_Codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para a tabela `TurmaHorario`
--
ALTER TABLE `TurmaHorario`
  ADD CONSTRAINT `TurmaHorario_ibfk_1` FOREIGN KEY (`FK_CodTurma`) REFERENCES `Turma` (`PK_Codigo`) ON DELETE CASCADE ON UPDATE CASCADE;
