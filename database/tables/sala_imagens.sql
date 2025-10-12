-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 12-Out-2025 às 12:19
-- Versão do servidor: 8.3.0
-- versão do PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `www_gestao_salas_localizacao`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `sala_imagens`
--

DROP TABLE IF EXISTS `sala_imagens`;
CREATE TABLE IF NOT EXISTS `sala_imagens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `sala_id` bigint UNSIGNED NOT NULL,
  `nome_arquivo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caminho_arquivo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_mime` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tamanho_arquivo` int NOT NULL,
  `descricao` text COLLATE utf8mb4_unicode_ci,
  `principal` tinyint(1) NOT NULL DEFAULT '0',
  `estado` tinyint NOT NULL DEFAULT '1' COMMENT '1-Activo, 2-Inactivo',
  `ordem` int NOT NULL DEFAULT '0',
  `observacoes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sala_imagens_sala_id_foreign` (`sala_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `sala_imagens`
--

INSERT INTO `sala_imagens` (`id`, `sala_id`, `nome_arquivo`, `caminho_arquivo`, `tipo_mime`, `tamanho_arquivo`, `descricao`, `principal`, `estado`, `ordem`, `observacoes`, `created_at`, `updated_at`) VALUES
(1, 1, '1759663665_0.png', 'salas_imagens/1759663665_0.png', 'image/png', 869715, NULL, 1, 1, 0, NULL, '2025-10-05 11:27:45', '2025-10-05 10:51:49');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
