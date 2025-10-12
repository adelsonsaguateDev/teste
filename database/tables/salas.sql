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
-- Estrutura da tabela `salas`
--

DROP TABLE IF EXISTS `salas`;
CREATE TABLE IF NOT EXISTS `salas` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `localID` bigint UNSIGNED NOT NULL,
  `provinciaID` bigint UNSIGNED NOT NULL,
  `No_Sala` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Andar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Em_Uso` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` double NOT NULL,
  `longitute` double NOT NULL,
  `caminho_ficheiro` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` bigint UNSIGNED NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `salas_localid_foreign` (`localID`),
  KEY `salas_provinciaid_foreign` (`provinciaID`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `salas`
--

INSERT INTO `salas` (`id`, `localID`, `provinciaID`, `No_Sala`, `Andar`, `Em_Uso`, `latitude`, `longitute`, `caminho_ficheiro`, `estado`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'A101', '1º Andar', 'Sim', -25.965, 32.583, 'salas/a101.png', 1, '2025-05-08 14:11:09', '2025-09-28 16:54:06'),
(2, 1, 9, 'B202', '2º Andar', 'Não', -25.966, 32.584, 'salas/b202.png', 1, '2025-05-08 14:11:09', '2025-07-16 20:02:55'),
(3, 1, 2, 'A102', '3º Andar', 'Sim', -25.966, 32.584, 'salas/b202.png', 1, '2025-05-08 14:14:39', '2025-06-14 13:49:27'),
(4, 1, 2, 'A103', '3º Andar', 'Não', -25.966, 32.884, 'salas/b205.png', 1, '2025-05-08 14:19:57', '2025-05-08 14:19:57'),
(5, 1, 1, 'B201', '1º Andar', 'Não', -25.965, 32.583, 'salas/a101.png', 1, '2025-05-23 17:23:52', '2025-05-23 17:23:52'),
(6, 1, 1, 'B32', '1º Andar', 'Não', -25.966, 32.584, 'salas/b202.png', 1, '2025-05-23 17:23:52', '2025-05-23 17:23:52'),
(7, 1, 1, 'B21', '1º Andar', 'Sim', -25.966, 32.884, 'salas/b205.png', 1, '2025-05-23 17:23:52', '2025-06-05 17:30:55'),
(8, 1, 1, 'C1', 'N/A', 'Não', -25.966, 22.884, 'salas/b205.png', 1, '2025-06-05 17:30:55', '2025-06-05 17:30:55');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
