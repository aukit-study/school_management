-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 10, 2025 at 07:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `student_name` varchar(255) DEFAULT NULL,
  `subject_id` int(11) NOT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `attendance_date` date NOT NULL,
  `คาบ` int(11) DEFAULT NULL,
  `status` enum('มา','ขาด','สาย','ลา') NOT NULL DEFAULT 'มา',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `student_id`, `student_name`, `subject_id`, `subject_name`, `teacher_id`, `attendance_date`, `คาบ`, `status`, `created_at`) VALUES
(0, 1, 'ด.ญ. ธนัญญา สุขสันต์', 1, 'คณิตศาสตร์', 2, '2025-10-10', 1, 'มา', '2025-10-10 16:35:23'),
(1, 14, 'ด.ช. กิตติพงษ์ รุ่งเรือง', 1, 'คณิตศาสตร์', 2, '2025-10-10', 1, 'ขาด', '2025-10-10 16:35:23'),
(2, 15, 'ด.ญ. ศศิธร มณีจันทร์', 1, 'คณิตศาสตร์', 2, '2025-10-10', 1, 'ขาด', '2025-10-10 16:35:23'),
(3, 16, 'ด.ช. ภาณุวัฒน์ มีสุข', 1, 'คณิตศาสตร์', 2, '2025-10-10', 1, 'มา', '2025-10-10 16:35:23'),
(4, 17, 'ด.ญ. จิรนันท์ เพ็ญดี', 1, 'คณิตศาสตร์', 2, '2025-10-10', 1, 'สาย', '2025-10-10 16:35:23'),
(5, 18, 'ด.ช. ปิยะพงษ์ อรุณรุ่ง', 1, 'คณิตศาสตร์', 2, '2025-10-10', 1, 'สาย', '2025-10-10 16:35:23'),
(6, 19, 'ด.ญ. สุธาสินี วงศ์สวัสดิ์', 1, 'คณิตศาสตร์', 2, '2025-10-10', 1, 'สาย', '2025-10-10 16:35:23'),
(7, 20, 'ด.ช. อรรถพล คำดี', 1, 'คณิตศาสตร์', 2, '2025-10-10', 1, 'มา', '2025-10-10 16:35:23'),
(8, 21, 'ด.ญ. มณฑิรา บุญมี', 1, 'คณิตศาสตร์', 2, '2025-10-10', 1, 'ขาด', '2025-10-10 16:35:23'),
(9, 22, 'ด.ญ. ธนัชชา สายทอง', 1, 'คณิตศาสตร์', 2, '2025-10-10', 1, 'มา', '2025-10-10 16:35:23'),
(10, 23, 'ด.ช. ชยพล อินทร์สุข', 1, 'คณิตศาสตร์', 2, '2025-10-10', 1, 'ขาด', '2025-10-10 16:35:23'),
(11, 24, 'ด.ช. วศิน โชติชัย', 1, 'คณิตศาสตร์', 2, '2025-10-10', 1, 'มา', '2025-10-10 16:35:23'),
(12, 25, 'ด.ญ. อริสา แก้วมณี', 1, 'คณิตศาสตร์', 2, '2025-10-10', 1, 'มา', '2025-10-10 16:35:23'),
(13, 26, 'ด.ช. พงศกร ดำรงค์', 1, 'คณิตศาสตร์', 2, '2025-10-10', 1, 'มา', '2025-10-10 16:35:23'),
(14, 27, 'ด.ญ. สุพิชชา ศรีทอง', 1, 'คณิตศาสตร์', 2, '2025-10-10', 1, 'สาย', '2025-10-10 16:35:23'),
(29, 14, 'ด.ช. กิตติพงษ์ รุ่งเรือง', 1, 'คณิตศาสตร์', 2, '2025-10-10', 2, 'มา', '2025-10-10 16:35:23'),
(30, 15, 'ด.ญ. ศศิธร มณีจันทร์', 1, 'คณิตศาสตร์', 2, '2025-10-10', 2, 'มา', '2025-10-10 16:35:23'),
(31, 16, 'ด.ช. ภาณุวัฒน์ มีสุข', 1, 'คณิตศาสตร์', 2, '2025-10-10', 2, 'มา', '2025-10-10 16:35:23'),
(32, 17, 'ด.ญ. จิรนันท์ เพ็ญดี', 1, 'คณิตศาสตร์', 2, '2025-10-10', 2, 'มา', '2025-10-10 16:35:23'),
(33, 18, 'ด.ช. ปิยะพงษ์ อรุณรุ่ง', 1, 'คณิตศาสตร์', 2, '2025-10-10', 2, 'มา', '2025-10-10 16:35:23'),
(34, 19, 'ด.ญ. สุธาสินี วงศ์สวัสดิ์', 1, 'คณิตศาสตร์', 2, '2025-10-10', 2, 'มา', '2025-10-10 16:35:23'),
(35, 20, 'ด.ช. อรรถพล คำดี', 1, 'คณิตศาสตร์', 2, '2025-10-10', 2, 'มา', '2025-10-10 16:35:23'),
(36, 21, 'ด.ญ. มณฑิรา บุญมี', 1, 'คณิตศาสตร์', 2, '2025-10-10', 2, 'มา', '2025-10-10 16:35:23'),
(37, 22, 'ด.ญ. ธนัชชา สายทอง', 1, 'คณิตศาสตร์', 2, '2025-10-10', 2, 'มา', '2025-10-10 16:35:23'),
(38, 23, 'ด.ช. ชยพล อินทร์สุข', 1, 'คณิตศาสตร์', 2, '2025-10-10', 2, 'มา', '2025-10-10 16:35:23'),
(39, 24, 'ด.ช. วศิน โชติชัย', 1, 'คณิตศาสตร์', 2, '2025-10-10', 2, 'มา', '2025-10-10 16:35:23'),
(40, 25, 'ด.ญ. อริสา แก้วมณี', 1, 'คณิตศาสตร์', 2, '2025-10-10', 2, 'มา', '2025-10-10 16:35:23'),
(41, 26, 'ด.ช. พงศกร ดำรงค์', 1, 'คณิตศาสตร์', 2, '2025-10-10', 2, 'มา', '2025-10-10 16:35:23'),
(42, 27, 'ด.ญ. สุพิชชา ศรีทอง', 1, 'คณิตศาสตร์', 2, '2025-10-10', 2, 'มา', '2025-10-10 16:35:23');

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `student_name` varchar(255) DEFAULT NULL,
  `subject_id` int(11) NOT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `score` float DEFAULT 0,
  `term` varchar(20) DEFAULT '1/2568',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id`, `student_id`, `student_name`, `subject_id`, `subject_name`, `category_id`, `score`, `term`, `updated_at`) VALUES
(27, 1, 'ด.ช. สมชาย ใจดี', 1, 'คณิตศาสตร์', 3, 5, '1/2568', '2025-10-10 17:18:01'),
(28, 2, 'ด.ญ. สมหญิง สุขใจ', 1, 'คณิตศาสตร์', 3, 4, '1/2568', '2025-10-10 17:16:28'),
(29, 3, 'ด.ช. ศักดิ์สิทธิ์ สายชล', 1, 'คณิตศาสตร์', 3, 4, '1/2568', '2025-10-10 17:16:28'),
(30, 4, 'ด.ช. อนุชา วงศ์ดี', 1, 'คณิตศาสตร์', 3, 4, '1/2568', '2025-10-10 17:16:28'),
(31, 5, 'ด.ญ. ปวีณา ศรีสุข', 1, 'คณิตศาสตร์', 3, 4, '1/2568', '2025-10-10 17:16:28'),
(32, 6, 'ด.ช. วรพล ทองแท้', 1, 'คณิตศาสตร์', 3, 4, '1/2568', '2025-10-10 17:16:28'),
(33, 7, 'ด.ญ. จิราภา แก้วใส', 1, 'คณิตศาสตร์', 3, 4, '1/2568', '2025-10-10 17:16:28'),
(34, 8, 'ด.ญ. ณิชกานต์ พรหมดี', 1, 'คณิตศาสตร์', 3, 4, '1/2568', '2025-10-10 17:16:28'),
(35, 9, 'ด.ช. ปรเมษฐ์ ชื่นสุข', 1, 'คณิตศาสตร์', 3, 4, '1/2568', '2025-10-10 17:16:28'),
(36, 1, 'ด.ช. สมชาย ใจดี', 1, 'คณิตศาสตร์', 4, 25, '1/2568', '2025-10-10 17:18:01'),
(37, 1, 'ด.ช. สมชาย ใจดี', 1, 'คณิตศาสตร์', 5, 30, '1/2568', '2025-10-10 17:18:01');

-- --------------------------------------------------------

--
-- Table structure for table `grade_categories`
--

CREATE TABLE `grade_categories` (
  `id` int(11) NOT NULL,
  `class` varchar(10) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `class_name` varchar(50) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `max_score` float DEFAULT 100,
  `weight` float DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grade_categories`
--

INSERT INTO `grade_categories` (`id`, `class`, `subject_id`, `class_name`, `category_name`, `max_score`, `weight`, `created_at`) VALUES
(3, '1', 1, 'ป.1', 'งาน1', 10, 1, '2025-10-10 16:38:40'),
(4, '', 1, 'ป.1', 'สอบ', 30, 1, '2025-10-10 17:17:48'),
(5, '', 1, 'ป.1', 'การเข้าชั้นเรียน', 10, 1, '2025-10-10 17:17:55'),
(6, '', 1, 'ป.3', 'งานเขียน', 10, 1, '2025-10-10 17:20:13'),
(7, '', 1, 'ป.3', 'งานวาด', 10, 1, '2025-10-10 17:20:29'),
(8, '', 1, 'ป.3', 'สอบกลางภาค', 30, 1, '2025-10-10 17:23:01');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `prefix` varchar(10) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `class` varchar(10) NOT NULL,
  `parent_name` varchar(255) DEFAULT NULL,
  `contact` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `number`, `prefix`, `fullname`, `class`, `parent_name`, `contact`) VALUES
(1, 1, 'ด.ช.', 'สมชาย ใจดี', 'ป.1', 'นายสมบัติ ใจดี', '0811111111'),
(2, 2, 'ด.ญ.', 'สมหญิง สุขใจ', 'ป.1', 'นางสมศรี สุขใจ', '0811111112'),
(3, 3, 'ด.ช.', 'ศักดิ์สิทธิ์ สายชล', 'ป.1', 'นายสมหมาย สายชล', '0811111113'),
(4, 4, 'ด.ช.', 'อนุชา วงศ์ดี', 'ป.1', 'นางอารี วงศ์ดี', '0811111114'),
(5, 5, 'ด.ญ.', 'ปวีณา ศรีสุข', 'ป.1', 'นางพรรณี ศรีสุข', '0811111115'),
(6, 6, 'ด.ช.', 'วรพล ทองแท้', 'ป.1', 'นายวิโรจน์ ทองแท้', '0811111116'),
(7, 7, 'ด.ญ.', 'จิราภา แก้วใส', 'ป.1', 'นางจิตรา แก้วใส', '0811111117'),
(8, 8, 'ด.ญ.', 'ณิชกานต์ พรหมดี', 'ป.1', 'นายพิเชษฐ์ พรหมดี', '0811111118'),
(9, 9, 'ด.ช.', 'ปรเมษฐ์ ชื่นสุข', 'ป.1', 'นางสาวพิมพ์ใจ ชื่นสุข', '0811111119'),
(10, 10, 'ด.ญ.', 'อรณิชา ธรรมดี', 'ป.1', 'นายอำนาจ ธรรมดี', '0811111120'),
(11, 11, 'ด.ช.', 'ภูวดล สายใจ', 'ป.1', 'นายพิทักษ์ สายใจ', '0811111121'),
(12, 12, 'ด.ญ.', 'สุพัตรา วัฒนะ', 'ป.1', 'นางสาวสุนิสา วัฒนะ', '0811111122'),
(13, 13, 'ด.ช.', 'นพพล ศรีสวัสดิ์', 'ป.1', 'นางพิมพ์พร ศรีสวัสดิ์', '0811111123'),
(14, 1, 'ด.ช.', 'กิตติพงษ์ รุ่งเรือง', 'ป.2', 'นายก้องภพ รุ่งเรือง', '0811111201'),
(15, 2, 'ด.ญ.', 'ศศิธร มณีจันทร์', 'ป.2', 'นางสาวสมฤดี มณีจันทร์', '0811111202'),
(16, 3, 'ด.ช.', 'ภาณุวัฒน์ มีสุข', 'ป.2', 'นายพงษ์เทพ มีสุข', '0811111203'),
(17, 4, 'ด.ญ.', 'จิรนันท์ เพ็ญดี', 'ป.2', 'นางพรทิพย์ เพ็ญดี', '0811111204'),
(18, 5, 'ด.ช.', 'ปิยะพงษ์ อรุณรุ่ง', 'ป.2', 'นายพิชัย อรุณรุ่ง', '0811111205'),
(19, 6, 'ด.ญ.', 'สุธาสินี วงศ์สวัสดิ์', 'ป.2', 'นางสาวศิริพร วงศ์สวัสดิ์', '0811111206'),
(20, 7, 'ด.ช.', 'อรรถพล คำดี', 'ป.2', 'นายอาทิตย์ คำดี', '0811111207'),
(21, 8, 'ด.ญ.', 'มณฑิรา บุญมี', 'ป.2', 'นางมาลี บุญมี', '0811111208'),
(22, 9, 'ด.ญ.', 'ธนัชชา สายทอง', 'ป.2', 'นายธงชัย สายทอง', '0811111209'),
(23, 10, 'ด.ช.', 'ชยพล อินทร์สุข', 'ป.2', 'นางสาวศิริขวัญ อินทร์สุข', '0811111210'),
(24, 11, 'ด.ช.', 'วศิน โชติชัย', 'ป.2', 'นายวีรชัย โชติชัย', '0811111211'),
(25, 12, 'ด.ญ.', 'อริสา แก้วมณี', 'ป.2', 'นางอัมพร แก้วมณี', '0811111212'),
(26, 13, 'ด.ช.', 'พงศกร ดำรงค์', 'ป.2', 'นายภิญโญ ดำรงค์', '0811111213'),
(27, 14, 'ด.ญ.', 'สุพิชชา ศรีทอง', 'ป.2', 'นางสุดา ศรีทอง', '0811111214'),
(28, 1, 'ด.ญ.', 'ปิยนุช พูนสุข', 'ป.3', 'นายสมชาย พูนสุข', '0811111301'),
(29, 2, 'ด.ช.', 'ณัฐพล รัตนกุล', 'ป.3', 'นางรัตนา รัตนกุล', '0811111302'),
(30, 3, 'ด.ญ.', 'กัญญาณัฐ แสงทอง', 'ป.3', 'นางสุภาวดี แสงทอง', '0811111303'),
(31, 4, 'ด.ช.', 'อานนท์ แก้วทอง', 'ป.3', 'นายธวัชชัย แก้วทอง', '0811111304'),
(32, 5, 'ด.ญ.', 'วริศรา นาคดี', 'ป.3', 'นางอรนุช นาคดี', '0811111305'),
(33, 6, 'ด.ช.', 'ภคิน พัฒนชัย', 'ป.3', 'นายอำนวย พัฒนชัย', '0811111306'),
(34, 1, 'ด.ญ.', 'ชลธิชา วงศ์ไทย', 'ป.4', 'นางอารีย์ วงศ์ไทย', '0811111401'),
(35, 2, 'ด.ช.', 'ปิยะภพ แสนสุข', 'ป.4', 'นายพิทักษ์ แสนสุข', '0811111402'),
(36, 3, 'ด.ญ.', 'สุกัญญา รุ่งแสง', 'ป.4', 'นางรัชนี รุ่งแสง', '0811111403'),
(37, 4, 'ด.ช.', 'ภูวเดช คำดี', 'ป.4', 'นายบุญช่วย คำดี', '0811111404'),
(38, 5, 'ด.ญ.', 'วราภรณ์ ทองแท้', 'ป.4', 'นางทองใบ ทองแท้', '0811111405'),
(39, 6, 'ด.ช.', 'ฐิติกร อินทรสุข', 'ป.4', 'นายเอก อินทรสุข', '0811111406'),
(40, 7, 'ด.ญ.', 'กัญญาภัค ศรีวงศ์', 'ป.4', 'นางสาวกัญญา ศรีวงศ์', '0811111407'),
(41, 8, 'ด.ญ.', 'พัชริดา สายทอง', 'ป.4', 'นายวรพจน์ สายทอง', '0811111408'),
(42, 9, 'ด.ช.', 'วศิน รัตนชัย', 'ป.4', 'นางรัตนา รัตนชัย', '0811111409'),
(43, 10, 'ด.ช.', 'ธนกฤต ศรีสุข', 'ป.4', 'นายพงษ์พันธ์ ศรีสุข', '0811111410'),
(44, 11, 'ด.ญ.', 'สุธิดา วัฒนะ', 'ป.4', 'นางสาวศศิธร วัฒนะ', '0811111411'),
(45, 12, 'ด.ญ.', 'ชนากานต์ ทองดี', 'ป.4', 'นายชาญชัย ทองดี', '0811111412'),
(46, 13, 'ด.ช.', 'ณัฐวุฒิ ชูศรี', 'ป.4', 'นายไพศาล ชูศรี', '0811111413'),
(47, 14, 'ด.ญ.', 'นลินี มณีทอง', 'ป.4', 'นางมาลี มณีทอง', '0811111414'),
(48, 15, 'ด.ช.', 'ภัทรพล จันทร์เพ็ญ', 'ป.4', 'นายพิเชษฐ์ จันทร์เพ็ญ', '0811111415'),
(49, 1, 'ด.ญ.', 'ปาณิสรา ศรีบุญ', 'ป.5', 'นางสาวพรพรรณ ศรีบุญ', '0811111501'),
(50, 2, 'ด.ช.', 'นเรศ จิตดี', 'ป.5', 'นายสมบูรณ์ จิตดี', '0811111502'),
(51, 3, 'ด.ญ.', 'ธนัญญา สุขสันต์', 'ป.5', 'นางสาวจิราพร สุขสันต์', '0811111503'),
(52, 1, 'ด.ช.', 'ปิยะวัฒน์ อุดมชัย', 'ป.6', 'นายอุทัย อุดมชัย', '0811111601'),
(53, 2, 'ด.ญ.', 'ศุภัชญา แสงดาว', 'ป.6', 'นางสาวปาริชาติ แสงดาว', '0811111602'),
(54, 3, 'ด.ญ.', 'นภัสสร ใจงาม', 'ป.6', 'นายสมนึก ใจงาม', '0811111603'),
(55, 4, 'ด.ช.', 'ชาญชัย บัวทอง', 'ป.6', 'นางสาวสมใจ บัวทอง', '0811111604'),
(56, 5, 'ด.ญ.', 'ธนภรณ์ รัตนเพชร', 'ป.6', 'นายอำนาจ รัตนเพชร', '0811111605'),
(57, 6, 'ด.ช.', 'วรเมธ สายบุญ', 'ป.6', 'นางอารีย์ สายบุญ', '0811111606'),
(58, 7, 'ด.ญ.', 'พิมพ์ชนก คำดี', 'ป.6', 'นายมานพ คำดี', '0811111607'),
(59, 8, 'ด.ญ.', 'ฐิติพร มีชัย', 'ป.6', 'นางสาวพัชรี มีชัย', '0811111608'),
(60, 9, 'ด.ช.', 'ธนวัฒน์ พรหมดี', 'ป.6', 'นายพิชิต พรหมดี', '0811111609'),
(61, 10, 'ด.ญ.', 'อรทัย ศรีวิเศษ', 'ป.6', 'นางสาวจิตรา ศรีวิเศษ', '0811111610'),
(62, 11, 'ด.ช.', 'สุรชัย วงศ์ดี', 'ป.6', 'นายสุทัศน์ วงศ์ดี', '0811111611'),
(63, 12, 'ด.ญ.', 'อัญชัน บุญมาก', 'ป.6', 'นางสาวบุษบา บุญมาก', '0811111612');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `subject_name` varchar(100) NOT NULL,
  `total_classes` int(11) NOT NULL DEFAULT 0,
  `teacher_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `subject_name`, `total_classes`, `teacher_id`) VALUES
(1, 'คณิตศาสตร์', 10, 2),
(2, 'วิทยาศาสตร์', 5, 3),
(3, 'ภาษาไทย', 10, 4),
(4, 'ภาษาอังกฤษ', 5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('Admin','Teacher') DEFAULT 'Teacher',
  `subject` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `role`, `subject`) VALUES
(1, 'Admin User', 'admin', '1234', 'Admin', NULL),
(2, 'ครูสมชาย แสงดารา', 'teacher1', '1234', 'Teacher', 'คณิตศาสตร์'),
(3, 'ครูสมหญิง สุขสวัสดิ์', 'teacher2', '1234', 'Teacher', 'วิทยาศาสตร์'),
(4, 'ครู ธนาบดี ภัชรปรีดา', 'teacher3', '1234', 'Teacher', 'ภาษาไทย'),
(5, 'ครู กิตติเดช เจริญกาณต์ ', 'teacher4', '1234', 'Teacher', 'ภาษาอังกฤษ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_attendance` (`student_id`,`subject_name`,`teacher_id`,`attendance_date`,`คาบ`) USING BTREE,
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- Indexes for table `grade_categories`
--
ALTER TABLE `grade_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `grade_categories`
--
ALTER TABLE `grade_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `grades_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `grade_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `grades_ibfk_3` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `grade_categories`
--
ALTER TABLE `grade_categories`
  ADD CONSTRAINT `grade_categories_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
