-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2022 at 10:11 AM
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

--
-- Dumping data for table `tbl_authorise`
--

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
(3, 'Photography done right.', 'home', 'homeTitle', '2022-03-29 22:43:05'),
(4, 'Examples of our work', 'home', 'homeCarouselTitle', '2022-03-28 21:48:06'),
(5, 'Contact us', 'contact', 'contactTitle', '2022-03-28 23:55:49'),
(6, '<h2>Contact details</h2><h3>Address</h3><p><i>7 Midland Road, Bristol, UK, BS2 0JT</i></p><h3>Phone Number</h3><p>( 44)1282 98324 or ( 44)72402 23424</p><h3>Email</h3><p><a href=\"mailto:enquires@hazel-photography.com\">enquires@hazel-photography.com</a> (Main Email)</p><p><a href=\"mailto:admin@ws326200-awt.remote.ac\">admin@ws326200-awt.remote.ac</a> (Web admin)</p><h3>Opening Hours</h3><p><strong>Mon-Friday:</strong> 8am - 5:30pm&nbsp;</p><p><strong>Sat: </strong>11am - 3pm</p><p><strong>Sun: </strong>Closed</p>', 'contact', 'contactCardFirst', '2022-03-29 00:03:23'),
(7, 'Send us an email', 'contact', 'contactCardSecondTitle', '2022-03-28 23:55:57'),
(8, 'Find us', 'contact', 'contactCardThirdTitle', '2022-03-28 23:56:03'),
(9, 'About us', 'about', 'aboutTitle', '2022-04-02 04:06:16'),
(10, '<h2>Who we are</h2><p>Hazel photography is a do it all professional photography company; we are willing and able to take any project of any size.</p><p>One area of particular focus for the organisation is on nature and landscape photography, this being the area of interest that first got the founder interested in photography as a professional career.</p><p>We have a creative office based in the Bristol area, a natural home for the company considering this is where it all got started.</p><h3>Key facts&nbsp;</h3><ul><li>Operating since 2012.</li><li>Extensive stock photo library built up.</li><li>Team of four dedicated individuals.</li><li>234 Photoshoots in one year as of 2021</li></ul>', 'about', 'aboutCardFirst', '2022-04-02 04:10:23'),
(11, '<h2>Professional quality work</h2><p>We pride ourselves in carrying out professional quality photography - this is in part because we have the equipment to do it.</p><p>A recent investment in camera equipment has equipped us with the latest 8K DLSR cameras and various types of lenses, all so that we can now capture quality pictures like never before.</p><blockquote><p>“The new equipment includes 5 different types of DLSR cameras, alongside nearly two dozen different lenses, allowing us to now capture a larger variety and quality of photos than ever before”</p></blockquote><p><i>- Hans Frisch, Founder</i></p>', 'about', 'aboutCardSecond', '2022-04-02 04:15:09'),
(12, '<h2>Our Team</h2><p>Our team consists of four individuals, all with their own specialisms when it comes to photography&nbsp;</p><p><strong>Hans Frisch: </strong>Founder and CEO of Hazel, specialist photographer.</p><p><strong>Sarah Everard: </strong>Editor, graphics design graduate.</p><p><strong>Richard Gallic: </strong>Coordinator and location scout.</p><p><strong>John Smith: </strong>Photographer and videographer.&nbsp;</p>', 'about', 'aboutCardThird', '2022-04-02 04:18:13'),
(13, 'Our wide range of services.', 'services', 'servicesTitle', '2022-04-02 07:44:53'),
(14, '<h2>We offer a variety of services to suit your needs.</h2><p>Due to the differing sizes of our various clients, we offer a range of tailored photography services to meet your requirements; from landscaping photography to event photography, we can cover it all.</p>', 'services', 'servicesCardFirst', '2022-04-02 07:52:16'),
(15, '<h2>Small projects</h2><p>e.g. Weddings, events</p><p>One to two days</p><p>One photographer</p><p>Up to 1000 pictures</p><p>Starting from £1000  per day</p>', 'services', 'servicesCardSecond', '2022-04-02 07:51:02'),
(16, '<h2>Medium projects</h2><p>e.g. Buildings/architecture</p><p>One day to two weeks</p><p>One photographer</p><p>Up to 10,000 pictures</p><p>Starting from £1300  per day</p>', 'services', 'servicesCardThird', '2022-04-02 07:51:07'),
(17, '<h2>Large projects</h2><p>e.g. Cityscape, landscape</p><p>One week to as long as negociated</p><p>Two photographers</p><p>Professional editing</p><p>Up to 100,000 pictures</p><p>Starting from £2000  per day</p>', 'services', 'servicesCardFourth', '2022-04-02 07:51:11'),
(18, '<h2>Interested? We quote on a case by case basis</h2>\r\n                    <p>Use our enquiry form to request a quote for your photography needs, we quote on a case by case\r\n                        basis - so the prices above can be considered a guide to our regular pricing. Additional\r\n                        complexities in terms of location or scale of the shoot may drastically increase price.</p>', 'services', 'servicesCardFifth', '2022-04-02 07:44:53');

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
(3, 'Default', 'Admin', 'admin@ws326200-awt.remote.ac', '$2y$10$5KZpLswd7rXpdveIJO4pe.MV19xMoeTxz7BDu9j/vzT9Q7o1JCwAy', '2022-01-16 20:46:20', '2022-04-02 09:10:49');

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Uq_users_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_authorise`
--
ALTER TABLE `tbl_authorise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `tbl_page_sections`
--
ALTER TABLE `tbl_page_sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tbl_password_reset`
--
ALTER TABLE `tbl_password_reset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
