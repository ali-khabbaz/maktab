-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.5-10.0.10-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             8.0.0.4396
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for iteachyou.ir
DROP DATABASE IF EXISTS `iteachyou.ir`;
CREATE DATABASE IF NOT EXISTS `iteachyou.ir` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `iteachyou.ir`;


-- Dumping structure for table iteachyou.ir.articles
DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `author_id` int(10) DEFAULT NULL,
  `level_id` int(10) DEFAULT NULL,
  `resource_id` int(10) DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `insert_date` int(11) DEFAULT NULL,
  `released_date` int(11) DEFAULT NULL,
  `level_name` varchar(500) DEFAULT NULL,
  `author_name` varchar(500) DEFAULT NULL,
  `resource_name` varchar(500) DEFAULT NULL,
  `desc_small` longtext,
  `desc_big` longtext,
  `views` bigint(20) DEFAULT '0',
  `like` bigint(20) DEFAULT '0',
  `firstPage` enum('Y','N') DEFAULT 'N',
  `coursesShow` enum('Y','N') DEFAULT 'N',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table iteachyou.ir.articles: ~3 rows (approximately)
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
REPLACE INTO `articles` (`id`, `author_id`, `level_id`, `resource_id`, `name`, `duration`, `insert_date`, `released_date`, `level_name`, `author_name`, `resource_name`, `desc_small`, `desc_big`, `views`, `like`, `firstPage`, `coursesShow`) VALUES
	(1, 1, 1, 1, 'Building Mobile Apps With the Ionic Framework and AngularJS', 192, 13940810, 13930604, 'Intermediate', 'Steve Michelotti', 'Pluralsight', 'This code-focused course shows how to build mobile apps with the Ionic Framework and AngularJS. The Ionic Framework represents an exciting new way to quickly build professional quality mobile apps.', 'The Ionic Framework is a tremendous step forward for quickly building Cordova-based mobile apps. Built on top of AngularJS, developers are able to leverage all of their pre-existing AngularJS skills when working with the Ionic Framework, considered by many to be the "Bootstrap for mobile." In this course, we will see how to quickly get up and running with an Ionic app in seconds. We will then cover navigation and routing, followed by demonstrations of all the primary Ionic components. We will also cover data and caching for offline functionality, as well as mapping and providing driving directions. We will finish with a review of ngCordova to easily access native device features such as the camera, barcode scanner, and more. By the end of the course, you\'ll be able to start building your own mobile apps using the Ionic Framework and AngularJS!', 0, 0, 'Y', 'Y'),
	(2, 1, 1, 1, 'Navisworks Essential Training', 157, NULL, NULL, NULL, 'Eric Wing', 'Lynda', NULL, 'Navisworks spans the design and the construction worlds. This course is designed for residents of both: construction personnel, architects, and engineers who are looking to integrate design with the as-built world. Learn how to use Navisworks Manage and Navisworks Simulate to gain control and get a holistic view of your projects. Eric Wing shows how to manage models, clash the models for interference, and virtually construct a building using a construction timeline. He also shows how to create material takeoffs and conduct live, interactive walk-throughs with clients and contractors. On the surface, Navisworks might look like just a file viewer, but with this course, you\'ll learn things about its analysis and simulation tools that would be either impossible or impossibly expensive any other way.', 0, 0, 'Y', 'Y'),
	(3, 1, 1, 1, 'Design Aesthetics for Web Design', 125, NULL, NULL, NULL, 'Sue Jenkins', 'Lynda', NULL, 'A basic understanding of the principles of good design (such as contrast, unity, and balance) is the foundation for creating beautiful websites. In this course, Sue Jenkins explains design aesthetics in simple terms, and shows how to incorporate the principles of design in specific ways that improve your site. Learn how to adjust adjacent colors to add contrast, create depth with texture, incorporate movement, and use repeating shapes, patterns, and borders to unify your design. Then, in the final chapter, learn about special issues designers should address in their web layouts, such as responsive design for mobile devices, accessibility, and originality.', 0, 0, 'Y', 'Y');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;


-- Dumping structure for table iteachyou.ir.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Dumping data for table iteachyou.ir.category: ~9 rows (approximately)
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
REPLACE INTO `category` (`id`, `name`) VALUES
	(1, 'Developer'),
	(2, 'Design'),
	(3, 'Web'),
	(4, 'Photography'),
	(5, 'Business'),
	(6, 'Education'),
	(7, 'Animation'),
	(8, 'Video'),
	(9, 'Audio');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;


-- Dumping structure for table iteachyou.ir.subcategory_article_map
DROP TABLE IF EXISTS `subcategory_article_map`;
CREATE TABLE IF NOT EXISTS `subcategory_article_map` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `subCategory_id` int(10) DEFAULT '0',
  `article_id` int(10) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_subCategory_article_map_sub_category` (`subCategory_id`),
  KEY `FK_subCategory_article_map_articles` (`article_id`),
  CONSTRAINT `FK_subCategory_article_map_articles` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `FK_subCategory_article_map_sub_category` FOREIGN KEY (`subCategory_id`) REFERENCES `sub_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table iteachyou.ir.subcategory_article_map: ~3 rows (approximately)
/*!40000 ALTER TABLE `subcategory_article_map` DISABLE KEYS */;
REPLACE INTO `subcategory_article_map` (`id`, `subCategory_id`, `article_id`) VALUES
	(1, 4, 2),
	(2, 6, 1),
	(4, 6, 3);
/*!40000 ALTER TABLE `subcategory_article_map` ENABLE KEYS */;


-- Dumping structure for table iteachyou.ir.sub_category
DROP TABLE IF EXISTS `sub_category`;
CREATE TABLE IF NOT EXISTS `sub_category` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `category_id` int(10) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `order` int(10) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  `logo` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_sub_category_category` (`category_id`),
  CONSTRAINT `FK_sub_category_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table iteachyou.ir.sub_category: ~6 rows (approximately)
/*!40000 ALTER TABLE `sub_category` DISABLE KEYS */;
REPLACE INTO `sub_category` (`id`, `category_id`, `name`, `order`, `img`, `logo`) VALUES
	(1, 1, 'Game Development', 6, '', NULL),
	(2, 1, 'Database', 5, NULL, NULL),
	(3, 2, 'Logo Design', 4, NULL, NULL),
	(4, 2, 'Interior Design', 3, 'topic-bg-excel.jpg', 'python4.png'),
	(5, 3, 'CMS', 2, 'topic-bg-java.jpg', 'microsoft-excel.png'),
	(6, 3, 'Web Design', 1, 'topic-bg-python.jpg', 'logotype49.png');
/*!40000 ALTER TABLE `sub_category` ENABLE KEYS */;


-- Dumping structure for table iteachyou.ir.times
DROP TABLE IF EXISTS `times`;
CREATE TABLE IF NOT EXISTS `times` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) DEFAULT NULL,
  `begin` time DEFAULT NULL,
  `end` time DEFAULT NULL,
  `date` int(8) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Dumping data for table iteachyou.ir.times: ~6 rows (approximately)
/*!40000 ALTER TABLE `times` DISABLE KEYS */;
REPLACE INTO `times` (`ID`, `user_id`, `begin`, `end`, `date`) VALUES
	(1, 12, '08:00:00', '09:00:00', 13940404),
	(2, 12, '09:00:00', '10:00:00', 13940404),
	(3, 12, '09:00:00', '10:00:00', 13940405),
	(4, 12, '11:00:00', '12:00:00', 13940405),
	(6, 12, '13:00:00', '14:00:00', 13940405),
	(7, 12, '15:00:00', '16:00:00', 13940405);
/*!40000 ALTER TABLE `times` ENABLE KEYS */;


-- Dumping structure for table iteachyou.ir.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `google_id` varchar(100) NOT NULL DEFAULT '0',
  `email` varchar(50) NOT NULL,
  `password` varchar(500) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `picture` varchar(500) DEFAULT NULL,
  `google_profile` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

-- Dumping data for table iteachyou.ir.users: ~6 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE INTO `users` (`ID`, `google_id`, `email`, `password`, `gender`, `name`, `first_name`, `last_name`, `picture`, `google_profile`) VALUES
	(12, '0', 'ali.khabbaz14@gmail.com', 'bahbah', '', NULL, NULL, NULL, NULL, NULL),
	(30, '0', 'salam', 'salam', '', NULL, NULL, NULL, NULL, NULL),
	(31, '0', 'bahbah', 'bahbah', '', NULL, NULL, NULL, NULL, NULL),
	(32, '115140063390688620000', 'ali.khabbaz14@gmail.com', NULL, 'male', 'ali khabbaz', 'ali', 'khabbaz', 'https://lh4.googleusercontent.com/-P6L52H8PdQQ/AAAAAAAAAAI/AAAAAAAAAjU/_n14IWscF2g/photo.jpg?sz=50', 'https://plus.google.com/115140063390688631647'),
	(33, '104580232447524810000', 'hamid.k1050@gmail.com', NULL, 'male', 'hamid khabbaz', 'hamid', 'khabbaz', 'https://lh3.googleusercontent.com/-lJdjEIJCLdc/AAAAAAAAAAI/AAAAAAAAAI8/w68HjwAuSfc/photo.jpg?sz=50', 'https://plus.google.com/104580232447524815787'),
	(34, 'NaN', 'undefined', NULL, 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;


-- Dumping structure for table iteachyou.ir.videos
DROP TABLE IF EXISTS `videos`;
CREATE TABLE IF NOT EXISTS `videos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `article_id` int(10) DEFAULT NULL,
  `section_id` int(10) DEFAULT NULL,
  `video_id` int(10) DEFAULT NULL,
  `section_name` varchar(500) DEFAULT NULL,
  `video_name` varchar(500) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `views` int(11) DEFAULT '0',
  `like` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Index 3` (`article_id`,`section_id`,`video_id`),
  CONSTRAINT `FK_videos_articles` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

-- Dumping data for table iteachyou.ir.videos: ~21 rows (approximately)
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
REPLACE INTO `videos` (`id`, `article_id`, `section_id`, `video_id`, `section_name`, `video_name`, `duration`, `views`, `like`) VALUES
	(1, 1, 1, NULL, 'Introduction', 'Introduction.mp4', NULL, 0, 0),
	(3, 1, 1, NULL, 'Introduction', 'Course Overview.mp4', NULL, 0, 0),
	(4, 1, 1, NULL, 'Introduction', 'What Is Ionic.mp4', NULL, 0, 0),
	(5, 1, 1, NULL, 'Introduction', 'Cordova - What and Why.mp4', NULL, 0, 0),
	(6, 1, 1, NULL, 'Introduction', 'What We\'ll Be Building.mp4', NULL, 0, 0),
	(7, 1, 2, NULL, 'Getting Started With Ionic', 'Overview.mp4', NULL, 0, 0),
	(8, 1, 2, NULL, 'Getting Started With Ionic', 'Ionic Command Line Features.mp4', NULL, 0, 0),
	(9, 1, 2, NULL, 'Getting Started With Ionic', 'Installing Ionic.mp4', NULL, 0, 0),
	(10, 1, 2, NULL, 'Getting Started With Ionic', 'Starting a New Project.mp4', NULL, 0, 0),
	(11, 1, 2, NULL, 'Getting Started With Ionic', 'Run the App With a Browser.mp4', NULL, 0, 0),
	(12, 1, 2, NULL, 'Getting Started With Ionic', 'Run the App With an Emulator.mp4', NULL, 0, 0),
	(13, 1, 2, NULL, 'Getting Started With Ionic', 'Run the App on a Mobile Device.mp4', NULL, 0, 0),
	(14, 1, 2, NULL, 'Getting Started With Ionic', 'Ionic Starter Templates.mp4', NULL, 0, 0),
	(15, 1, 2, NULL, 'Getting Started With Ionic', 'Setting Up a Development Environment With Sublime Text.mp4', NULL, 0, 0),
	(16, 1, 2, NULL, 'Getting Started With Ionic', 'Setting Up a Development Environment With Visual Studio.mp4', NULL, 0, 0),
	(17, 1, 2, NULL, 'Getting Started With Ionic', 'Setting Up CodePen.mp4', NULL, 0, 0),
	(18, 1, 2, NULL, 'Getting Started With Ionic', 'Summary.mp4', NULL, 0, 0),
	(19, 2, 1, 1, 'Introduction', 'Welcome.mp4', NULL, 0, 0),
	(20, 2, 1, 2, 'Introduction', 'Using the exercise files.mp4', NULL, 0, 0),
	(21, 2, 2, 1, 'The Navisworks File System', 'The three Navisworks versions.mp4', NULL, 0, 0),
	(22, 2, 2, 2, 'The Navisworks File System', 'Navisworks file types.mp4', NULL, 0, 0);
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
