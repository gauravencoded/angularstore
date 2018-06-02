-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 02, 2018 at 09:13 AM
-- Server version: 10.2.12-MariaDB
-- PHP Version: 7.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id297213_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `activation`
--

CREATE TABLE `activation` (
  `email` varchar(30) NOT NULL,
  `querystring` varchar(20) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `email` varchar(50) NOT NULL,
  `address` varchar(200) NOT NULL,
  `landmark` varchar(50) NOT NULL,
  `city` varchar(40) NOT NULL,
  `pincode` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`email`, `address`, `landmark`, `city`, `pincode`) VALUES
('gauravencoded@gmail.com', 'EWS 93 Kalindipuram Phase-1', 'Uttar Pradesh', 'Allahabad', 211011),
('gauravencoded@gmail.com', 'D 2/9 Vikalp Khand Gomati Nagar', 'rail vihar', 'Lucknow', 234567),
('gauravencoded@gmail.com', 'salamt', 'chowi', 'Allahabad', 233456);

-- --------------------------------------------------------

--
-- Table structure for table `authenticate`
--

CREATE TABLE `authenticate` (
  `email` varchar(30) NOT NULL,
  `token` varchar(16) NOT NULL,
  `gendate` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `authenticate`
--

INSERT INTO `authenticate` (`email`, `token`, `gendate`) VALUES
('surtrivedi92@gmail.com', '7Io2VtimCg8iXn4e', '5-12-2016'),
('surtrivedi92@gmail.com', 'tqjk3kTpBlRpEZAy', '5-12-2016'),
('singhgaurav4242@gmail.com', 'jBK9S83qWUwzzyat', '2-2-2017'),
('singhgaurav4242@gmail.com', 'MT3vDdLKQcixSWqi', '2-2-2017');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `productId` int(8) NOT NULL,
  `size` varchar(2) NOT NULL,
  `email` varchar(30) NOT NULL,
  `quantity` int(2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`productId`, `size`, `email`, `quantity`) VALUES
(13, 'M', '', 1),
(13, 'M', 'surtrivedi92@gmail.com', 1),
(19, '20', 'singhgaurav4242@gmail.com', 1),
(13, 'M', 'singhgaurav4242@gmail.com', 2),
(15, 'S', 'singhgaurav4242@gmail.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `name` varchar(30) NOT NULL,
  `dob` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `mobile` varchar(12) NOT NULL,
  `password` varchar(30) NOT NULL,
  `initDate` varchar(10) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`name`, `dob`, `email`, `mobile`, `password`, `initDate`, `status`) VALUES
('Surabhi Trivedi', '00-00-0000', 'surtrivedi92@gmail.com', '8687565319', 'colgconkt', '5-12-2016', 'Active'),
('Gaurav Singh', '00-00-0000', 'singhgaurav4242@gmail.com', '9821415965', 'colgconkt', '2-2-2017', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `matching`
--

CREATE TABLE `matching` (
  `productId` int(6) NOT NULL,
  `matchPId` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `matching`
--

INSERT INTO `matching` (`productId`, `matchPId`) VALUES
(1, 8),
(2, 7),
(1, 8),
(2, 7),
(3, 6),
(3, 5),
(1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `orderid` varchar(30) NOT NULL,
  `productId` int(7) NOT NULL,
  `size` varchar(3) NOT NULL,
  `quantity` int(4) NOT NULL,
  `discountValue` int(6) NOT NULL,
  `price` int(6) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`orderid`, `productId`, `size`, `quantity`, `discountValue`, `price`) VALUES
('201672133417_27876', 15, 'XL', 1, 76, 0),
('201672133417_27876', 13, 'M', 1, 56, 0),
('201672172750_89235', 7, 'S', 1, 19, 0),
('201672174610_26709', 15, 'XL', 1, 76, 0),
('201672174610_26709', 14, 'XL', 2, 36, 0),
('201672174610_26709', 16, 'XL', 1, 76, 0),
('2016730112528_77544', 22, 'S', 1, 5, 50),
('2016730112528_77544', 16, 'M', 2, 76, 235),
('2016913194950_33689', 2, '', 3, 20, 1100),
('2016918181654_25515', 12, 'S', 1, 76, 235),
('201692483235_43189', 2, '', 1, 20, 1100),
('201692483235_43189', 12, 'M', 2, 76, 235),
('20161023184253_85795', 4, '8', 1, 23, 1800);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` varchar(50) NOT NULL,
  `date` varchar(10) NOT NULL,
  `value` smallint(6) NOT NULL,
  `discountValue` int(10) NOT NULL,
  `email` varchar(40) NOT NULL,
  `status` varchar(20) NOT NULL,
  `paymentMethod` varchar(20) NOT NULL DEFAULT 'COD',
  `paymentStatus` varchar(8) NOT NULL DEFAULT 'Unpaid',
  `address` varchar(300) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `date`, `value`, `discountValue`, `email`, `status`, `paymentMethod`, `paymentStatus`, `address`) VALUES
('201672133417_27876', '201672', 584, 851, 'gauravencoded@gmail.com', 'Active', 'COD', 'Unpaid', ''),
('201672172750_89235', '201672', 620, 145, 'gauravencoded@gmail.com', '', 'COD', 'Unpaid', ''),
('201672174610_26709', '201672', 414, 526, 'gauravencoded@gmail.com', 'Cancelled', 'COD', 'Unpaid', ''),
('2016730112528_77544', '2016730', 160, 360, 'gauravencoded@gmail.com', 'Active', 'COD', 'Unpaid', 'salamt Allahabad 233456 chowi'),
('2016913194950_33689', '2016913', 2640, 660, 'gauravencoded@gmail.com', 'Active', 'COD', 'Unpaid', 'EWS 93 Kalindipuram Phase-1 Allahabad 211011 Uttar Pradesh'),
('2016918181654_25515', '2016918', 56, 179, 'gauravencoded@gmail.com', 'Active', 'COD', 'Unpaid', 'EWS 93 Kalindipuram Phase-1 Allahabad 211011 Uttar Pradesh'),
('201692483235_43189', '2016924', 993, 577, 'gauravencoded@gmail.com', 'Active', 'COD', 'Unpaid', 'EWS 93 Kalindipuram Phase-1 Allahabad 211011 Uttar Pradesh'),
('20161023184253_85795', '20161023', 1386, 414, 'gauravencoded@gmail.com', 'Active', 'COD', 'Unpaid', 'EWS 93 Kalindipuram Phase-1 Allahabad 211011 Uttar Pradesh');

-- --------------------------------------------------------

--
-- Table structure for table `posters`
--

CREATE TABLE `posters` (
  `productId` int(5) NOT NULL,
  `material` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posters`
--

INSERT INTO `posters` (`productId`, `material`, `type`) VALUES
(17, 'Paper', 'Framed'),
(18, 'Canvas', 'Unframed'),
(19, 'Paper', 'Framed'),
(21, 'Paper', 'Unframed'),
(22, 'Canvas', 'Unframed'),
(23, 'Paper', 'Framed'),
(24, 'Plastic', 'Framed');

-- --------------------------------------------------------

--
-- Table structure for table `productreviews`
--

CREATE TABLE `productreviews` (
  `productId` int(5) NOT NULL,
  `date` varchar(10) NOT NULL,
  `username` varchar(40) NOT NULL,
  `comment` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `productreviews`
--

INSERT INTO `productreviews` (`productId`, `date`, `username`, `comment`) VALUES
(1, '2016-11-3', 'Gaurav Singh', 'very good shoe'),
(1, '2016-11-3', 'Gaurav Singh', 'Amazing colors are there on the shoe they look so good i cant tell hoe good'),
(1, '2016-11-3', 'Gaurav Singh', 'Bad product'),
(1, '2016-11-3', 'Gaurav Singh', 'amazing shoes'),
(6, '2016-11-13', 'Gaurav Singh', 'bad ass shoe'),
(6, '2016-11-13', 'Gaurav Singh', 'coo sh'),
(6, '2016-11-13', 'Gaurav Singh', 'xcxcxcxc'),
(6, '2016-11-13', 'Gaurav Singh', 'sdfsdfsdfsdf'),
(6, '2016-11-13', 'Gaurav Singh', 'sdfsdfsdfsdf'),
(6, '2016-11-13', 'Gaurav Singh', ''),
(6, '2016-11-13', 'Gaurav Singh', 'xvxcvcxv'),
(6, '2016-11-13', 'Gaurav Singh', 'xvxcvcxvxdgxgxfg'),
(6, '2016-11-13', 'Gaurav Singh', 'zcfsfsdf'),
(6, '2016-11-13', 'Gaurav Singh', 'zcfsfsdfsdfsdfsdf'),
(9, '2016-11-13', 'Gaurav Singh', 'asdasdasd'),
(7, '2016-11-13', 'Gaurav Singh', 'zxfsdfsdfsdf'),
(7, '2016-11-13', 'Gaurav Singh', 'zcsfsdfsdfsdf');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `productCategory` varchar(20) NOT NULL,
  `subCategory` varchar(50) NOT NULL,
  `name` varchar(30) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `description` varchar(140) NOT NULL,
  `gender` varchar(1) NOT NULL DEFAULT 'M',
  `cult` varchar(20) NOT NULL,
  `content` varchar(60) NOT NULL,
  `search` varchar(200) NOT NULL,
  `designer` varchar(40) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `productCategory`, `subCategory`, `name`, `price`, `discount`, `description`, `gender`, `cult`, `content`, `search`, `designer`) VALUES
(1, 'Shoes', '', 'Shoe1', 1000, 35, 'this is the forst shoe', 'F', 'CollegeCult', 'GOT', 'Shoe for Girls college collegecult ', 'CraftHues'),
(2, 'Shoes', '', 'tshirt oe2', 1100, 0, 'this ist shirt the second shoe', 'F', 'CollegeCult', '', '', 'gauravencoded@gmail.com'),
(3, 'Shoes', '', 'Shoe3', 1200, 10, 'this is the third shoe', 'F', 'CollegeCult', '', '', ''),
(4, 'Shoes', '', 'Shoe4', 1800, 23, 'this is 4th shoe', 'F', '', '', '', 'gauravencoded@gmail.com'),
(5, 'Shoes', '', 'shoe5', 800, 32, 'fifth shoe', 'M', 'ComicCult', '', '', ''),
(6, 'Shoes', '', 'shoe 6', 435, 5, 'sixth shoe', 'M', 'ComicCult', '', 'shoes comiccult comic male', 'gauravencoded@gmail.com'),
(7, 'Shoes', '', 'sevent shoe', 765, 19, 'seventh shoe', 'M', 'ComicCult', '', 'shoes comiccult comic male casual', ''),
(8, 'Shoes', '', 'shoe', 238, 11, '8th shoe', 'M', 'CollegeCult', 'SouthPark', '', 'gauravencoded@gmail.com'),
(9, 'Shoes', '', 'shoe  9', 900, 50, 'ninth shoe', 'M', 'TvCult', '', '', ''),
(11, 'T-Shirts', '', 't2', 1200, 0, 'some more products', 'M', 'TvCult', '', '', ''),
(12, 'T-Shirts', '', 't1', 235, 76, 'some otehr t', 'M', 'SportsCult', 'BreakingBad', 'sportscult T shirts for males T shirts', 'gauravencoded@gmail.com'),
(13, 'T-Shirts', '', 't2', 1200, 56, 'some more products', 'M', 'ComicCult', '', 'T shirts male ', ''),
(14, 'T-Shirts', '', 't1', 235, 36, 'some otehr t', 'M', 'ComicCult', '', '', 'gauravencoded@gmail.com'),
(15, 'T-Shirts', '', 't1', 235, 76, 'some otehr t', 'M', 'ComicCult', '', 'T shirts male ', ''),
(16, 'T-Shirts', '', 't1', 235, 76, 'some otehr t', 'M', '', '', '', 'gauravencoded@gmail.com'),
(17, 'Posters', '', 'Comic Bam', 50, 5, 'Bright Colored Bam,Boom', 'U', 'ComicCult', '', 'Comics Poster Red', ''),
(18, 'Posters', '', 'Comic Faces', 50, 5, 'Bright Colored comic Faces', 'U', 'ComicCult', '', 'Comics Poster Red tounge faces', 'gauravencoded@gmail.com'),
(19, 'Posters', '', 'GymCult_100', 50, 0, 'Bright Colored  motivational', 'U', 'ComicCult', '', 'Comics Poster Red', ''),
(20, 'MobileCovers', '', 'MobileCovers', 50, 5, 'Classic Cycling poster', 'U', 'FitnessCult', 'Football', 'Gym Cycling Fitness Poster Workout weight lifting', 'gauravencoded@gmail.com'),
(21, 'Posters', '', 'Flyman', 50, 5, 'Superhuman than can fly', 'U', 'ComicCult', 'Cricket', 'Comics Poster Red Cartoons', ''),
(22, 'Posters', '', 'GymCult_101', 50, 5, 'Black and White fitness motivational poster', 'U', 'FitnessCult', '', 'Gym Fitness Poster Red Workout weight lifting', 'gauravencoded@gmail.com'),
(23, 'Posters', '', 'Middle Little Finger', 50, 3, 'Show to those Who do not agree', 'M', 'CollegeCult', 'Batman', 'Posters Middle Finger ', 'Heroes'),
(24, 'Posters', '', 'Super Hero', 40, 2, 'Anyone could be a Super Hero.', 'M', 'ComicCult', '', 'Comic Poster Comicult', 'gauravencoded@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `shoes`
--

CREATE TABLE `shoes` (
  `productId` int(6) NOT NULL,
  `description` varchar(500) NOT NULL,
  `material` varchar(50) NOT NULL,
  `color` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shoes`
--

INSERT INTO `shoes` (`productId`, `description`, `material`, `color`) VALUES
(1, 'very good amazing awseomvdfdof dfshoe of my life', 'Leather', 'Black'),
(2, 'very good amazing awseomvdfdof dfshoe of my life', 'Canvas', 'Grey'),
(6, 'very good amazing awseomvdfdof dfshoe of my life\r\nCanvas\r\nGrey', 'Leather', 'white'),
(3, 'Wsome shoe kamal ka', 'Leather', 'Black'),
(4, 'awsome shoe awsome design vagairah vagairah', 'Leather', 'Red'),
(5, 'awsome shoe awsome design vagairah vagairah', 'Leather', 'Black'),
(7, 'awsome shoe awsome design vagairah vagairah', 'Leather', 'Yelow'),
(8, 'awsome shoe awsome design vagairah vagairah', 'Canvas', 'Black'),
(9, 'Very god shoe with leather in the base material', 'Leather', 'Black');

-- --------------------------------------------------------

--
-- Table structure for table `sizeinventory`
--

CREATE TABLE `sizeinventory` (
  `productId` int(11) NOT NULL,
  `size` varchar(30) NOT NULL,
  `quantityAvailable` int(5) NOT NULL,
  `lastUpdatedOn` varchar(10) NOT NULL,
  `lastUpdateQuantity` int(5) NOT NULL,
  `sold` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sizeinventory`
--

INSERT INTO `sizeinventory` (`productId`, `size`, `quantityAvailable`, `lastUpdatedOn`, `lastUpdateQuantity`, `sold`) VALUES
(22, '8', 0, '', 0, 0),
(22, '9', 0, '', 0, 0),
(11, 'M', 100, '26-05-2016', 20, 120),
(11, 'L', 100, '26-05-2016', 20, 120),
(11, 'S', 100, '26-05-2016', 20, 120),
(12, 'XL', 100, '26-05-2016', 20, 120),
(12, 'M', 100, '26-05-2016', 20, 120),
(12, 'S', 100, '26-05-2016', 20, 120),
(13, 'L', 100, '26-05-2016', 20, 120),
(13, 'M', 100, '26-05-2016', 20, 120),
(14, 'L', 100, '26-05-2016', 20, 120),
(14, 'S', 100, '26-05-2016', 20, 120),
(15, 'S', 100, '26-05-2016', 20, 120),
(15, 'M', 100, '26-05-2016', 20, 120),
(16, 'M', 100, '26-05-2016', 20, 120),
(16, 'L', 100, '26-05-2016', 20, 120),
(16, 'XL', 100, '26-05-2016', 20, 120),
(17, '12 X 8', 100, '26-05-2016', 20, 120),
(17, '20 X 12', 100, '26-05-2016', 20, 120),
(18, '12 X 8', 100, '26-05-2016', 20, 120),
(18, '20 X 12', 100, '26-05-2016', 20, 120),
(19, '12 X 8', 100, '26-05-2016', 20, 120),
(19, '20 X 12', 100, '26-05-2016', 20, 120),
(20, 'I Phone', 100, '26-05-2016', 20, 120),
(20, 'Xiomi Note 3', 100, '26-05-2016', 20, 120),
(1, '7', 100, '26-05-2016', 20, 120),
(2, '8', 100, '26-05-2016', 20, 120),
(2, '7', 100, '26-05-2016', 20, 120),
(3, '8', 100, '26-05-2016', 20, 120),
(3, '7', 100, '26-05-2016', 20, 120),
(3, '9', 100, '26-05-2016', 20, 120),
(4, '8', 100, '26-05-2016', 20, 120),
(4, '9', 100, '26-05-2016', 20, 120),
(5, '9', 100, '26-05-2016', 20, 120),
(5, '8', 100, '26-05-2016', 20, 120),
(6, '7', 100, '26-05-2016', 20, 120),
(7, '6', 100, '26-05-2016', 20, 120),
(7, '7', 100, '26-05-2016', 20, 120),
(8, '8', 100, '26-05-2016', 20, 120),
(8, '9', 100, '26-05-2016', 20, 120),
(9, '7', 100, '26-05-2016', 20, 120),
(9, '8', 100, '26-05-2016', 20, 120),
(9, '9', 100, '26-05-2016', 20, 120),
(21, '12 x 8', 100, '30-10-2016', 50, 150),
(23, '12 x 10', 100, '30-10-2016', 50, 160);

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `storeType` varchar(20) NOT NULL,
  `storeName` varchar(30) NOT NULL,
  `storeId` varchar(5) NOT NULL,
  `storeDescription` varchar(400) NOT NULL,
  `key1` varchar(20) NOT NULL,
  `key2` varchar(30) NOT NULL,
  `storeStatus` varchar(10) NOT NULL,
  `priority` int(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`storeType`, `storeName`, `storeId`, `storeDescription`, `key1`, `key2`, `storeStatus`, `priority`) VALUES
('Men', 'T-Shirts', '1', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'M', 'T-Shirts', 'Active', 1),
('Men', 'Shorts', '2', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'M', 'Shorts', 'Active', 1),
('Men', 'Shoes', '3', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'M', 'Shoes', 'Active', 1),
('Men', 'Bags', '4', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'M', 'Bags', 'Active', 1),
('Men', 'Undergarments', '5', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'M', 'Undergarments', 'Active', 1),
('Women', 'Tops', '6', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'F', 'Tops', 'Active', 2),
('Women', 'Shorts', '7', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'F', 'Shorts', 'Active', 2),
('Women', 'Leggings', '8', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'F', 'Leggings', 'Active', 2),
('Women', 'Shrugs', '9', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'F', 'Shrugs', 'Active', 2),
('Gifts', 'Mobile Covers', '10', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Gifts', 'MobileCovers', 'Active', 3),
('Gifts', 'Laptop Skins', '11', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Gifts', 'LaptopSkins', 'Active', 3),
('Gifts', 'Mugs', '12', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Gifts', 'Mugs', 'Active', 3),
('Gifts', 'Posters', '13', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Gifts', 'Posters', 'Active', 3),
('Discounts', '10', '14', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Discounts', '10', 'Active', 4),
('Discounts', '30', '15', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Discounts', '30', 'Active', 4),
('Discounts', '50', '16', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Discounts', '50', 'Active', 4),
('Discounts', '70', '17', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Discounts', '70', 'Active', 4),
('Superheroes', 'Batman', '18', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Superheroes', 'Batman', 'Active', 5),
('Superheroes', 'Superman', '19', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Superheroes', 'SuperMan', 'Active', 5),
('Superheroes', 'Captain America', '20', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Superheroes', 'CaptainAmerica', 'Active', 5),
('Superheroes', 'Iron Man', '21', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Superheroes', 'Ironman', 'Active', 5),
('Superheroes', 'The Flash', '22', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Superheroes', 'The Flash', 'Active', 5),
('TV-Series', 'Game of Thrones', '23', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'TV', 'GOT', 'Active', 6),
('TV-Series', 'Breaking Bad', '24', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'TV', 'BreakingBad', 'Active', 6),
('TV-Series', 'South Park', '25', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'TV', 'SouthPark', 'Active', 6),
('Sports', 'Football', '26', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Sports', 'Football', 'Active', 7),
('Sports', 'Cricket', '27', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Sports', 'Cricket', 'Active', 7),
('Cult Stores', 'Political cult', '28', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Cults', 'Political', 'Active', 8),
('Exclusive Brands', 'CraftHues', '29', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Brand', 'CraftHues', 'Active', 0),
('Stationary', '', '30', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Stationary', 'Registers', 'Active', 9),
('Exclusive Brands', 'FaltuDesigns', '31', 'All the T-Shirts you want, innovative designs, finest qulaity of fabric and print on amazingly low prices', 'Brand', 'FaltuDesigns', 'Active', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tshirts`
--

CREATE TABLE `tshirts` (
  `productId` int(5) NOT NULL,
  `color` varchar(30) NOT NULL,
  `neck` varchar(30) NOT NULL,
  `fabric` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tshirts`
--

INSERT INTO `tshirts` (`productId`, `color`, `neck`, `fabric`) VALUES
(11, 'Maroon', 'Round neck', 'Cotton'),
(12, 'Red', 'Round neck', 'Cotton'),
(13, 'Black', 'Round neck', 'Cotton'),
(14, 'Blue', 'V neck', 'Cotton'),
(15, 'White', 'Round neck', 'Cotton'),
(16, 'White', 'Round neck', 'Cotton');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `productId` int(8) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`productId`, `email`) VALUES
(7, 'gauravencoded@gmail.com'),
(12, 'gauravencoded@gmail.com'),
(6, 'gauravencoded@gmail.com');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
