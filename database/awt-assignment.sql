-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2022 at 01:54 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `awt-assignment`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_authorise`
--

CREATE TABLE `tbl_authorise` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `token` varchar(36) NOT NULL DEFAULT uuid(),
  `created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_page_sections`
--

CREATE TABLE `tbl_page_sections` (
  `id` int(11) NOT NULL,
  `content` mediumtext NOT NULL,
  `page` varchar(100) NOT NULL,
  `pageSection` varchar(100) NOT NULL,
  `updated` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_page_sections`
--

INSERT INTO `tbl_page_sections` (`id`, `content`, `page`, `pageSection`, `updated`) VALUES
(1, '<h2>About us</h2><p>Read our origins as a company and our company values.</p>', 'home', 'homeCardFirst', '2022-03-28 21:49:31'),
(2, '<h2>Our services</h2><p>We provide a variety of services to meet our client\'s needs; from small to large we have a services plan that should suit.</p>', 'home', 'homeCardSecond', '2022-03-28 17:08:42'),
(3, 'Photography done right.', 'home', 'homeTitle', '2022-03-28 21:48:22'),
(4, 'Examples of our work', 'home', 'homeCarouselTitle', '2022-03-28 21:48:06'),
(5, 'Contact us', 'contact', 'contactTitle', '2022-03-28 23:55:49'),
(6, '<h2>Contact details</h2><h3>Address</h3><p><i>7 Midland Road, Bristol, UK, BS2 0JT</i></p><h3>Phone Number</h3><p>( 44)1282 98324 or ( 44)72402 23424</p><h3>Email</h3><p><a href=\"mailto:enquires@hazel-photography.com\">enquires@hazel-photography.com</a> (Main Email)</p><p><a href=\"mailto:admin@ws326200-awt.remote.ac\">admin@ws326200-awt.remote.ac</a> (Web admin)</p><h3>Opening Hours</h3><p><strong>Mon-Friday:</strong> 8am - 5:30pm&nbsp;</p><p><strong>Sat: </strong>11am - 3pm</p><p><strong>Sun: </strong>Closed</p>', 'contact', 'contactCardFirst', '2022-03-29 00:03:23'),
(7, 'Send us an email', 'contact', 'contactCardSecondTitle', '2022-03-28 23:55:57'),
(8, 'Find us', 'contact', 'contactCardThirdTitle', '2022-03-28 23:56:03');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_password_reset`
--

CREATE TABLE `tbl_password_reset` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `token` varchar(36) NOT NULL DEFAULT uuid(),
  `created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `lastLogin` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `firstName`, `lastName`, `email`, `password`, `created`, `lastLogin`) VALUES
(3, 'Default', 'Admin', 'admin@ws326200-awt.remote.ac', '$2y$10$xZwnL2GkSv1V2aGBJcDQFeu.JK72J3FPkYFtJZkNykhYOw3m4ugLu', '2022-01-16 20:46:20', '2022-03-29 00:46:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_authorise`
--
ALTER TABLE `tbl_authorise`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Fk_User_Authorise` (`userId`);

--
-- Indexes for table `tbl_page_sections`
--
ALTER TABLE `tbl_page_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_password_reset`
--
ALTER TABLE `tbl_password_reset`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Fk_User_PasswordReset` (`userId`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_authorise`
--
ALTER TABLE `tbl_authorise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `tbl_page_sections`
--
ALTER TABLE `tbl_page_sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_password_reset`
--
ALTER TABLE `tbl_password_reset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_authorise`
--
ALTER TABLE `tbl_authorise`
  ADD CONSTRAINT `Fk_User_Authorise` FOREIGN KEY (`userId`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_password_reset`
--
ALTER TABLE `tbl_password_reset`
  ADD CONSTRAINT `Fk_User_PasswordReset` FOREIGN KEY (`userId`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
