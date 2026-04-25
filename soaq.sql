-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 25, 2026 at 06:41 AM
-- Server version: 10.11.13-MariaDB-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `soaq`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `u_id` int(200) NOT NULL,
  `p_id` int(200) NOT NULL,
  `q` int(200) NOT NULL,
  `deke` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `u_id`, `p_id`, `q`, `deke`) VALUES
(1, 2, 2, 1, 0),
(2, 2, 1, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `prodc`
--

CREATE TABLE `prodc` (
  `id` int(11) NOT NULL,
  `prod_n` varchar(30) NOT NULL,
  `des` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prodc`
--

INSERT INTO `prodc` (`id`, `prod_n`, `des`) VALUES
(1, 'labtops', NULL),
(2, 'phones', NULL),
(3, 'playstations', NULL),
(4, 'watches', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `price` decimal(30,0) NOT NULL,
  `quantity` int(30) NOT NULL,
  `cid` int(11) DEFAULT NULL,
  `descrip` varchar(200) NOT NULL,
  `src` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `quantity`, `cid`, `descrip`, `src`) VALUES
(1, 'asus tuf f16', 6500, 2, 1, 'ASUS TUF Gaming F16 Laptop 16\" FHD+ 165Hz Display, Intel Core i7-14650HX, 32GB RAM, 1TB SSD, NVIDIA GeForce RTX 5060 8GB, Windows 11, High Performance Gray Gaming Notebook ', 'uploads/img/asus.jpg'),
(2, 'lenovo legion', 18000, 3, 1, 'Lenovo Legion Pro 7i Gen 10, AI Gaming Laptop, Intel Ultra 9 275HX, 16\" OLED 2.6K  240Hz 500 nits, 64GB DDR5, 4TB SSD, NVIDIA RTX 5090 Wi-Fi 7, Win 11 Pro - Black', 'uploads/img/lenovo.jpeg'),
(3, 'HP Victus', 3100, 1, 1, 'HP Laptop Gamer Victus NVIDIA GeForce RTX 4050 AMD Ryzen 7 7445HS 16GB RAM 512GB SSD 15.6\" Windows 11 Home English Keyboard ', 'uploads/img/hp.jpeg'),
(4, 'MSI Thin 15', 300, 2, 1, 'msi Thin 15 Gaming Laptop, 15.6\" FHD IPS 144Hz, Intel 8-core i5-13420H, NVIDIA GeForce RTX 3050, 16GB RAM, 1TB SSD, Backlit Keyboard, WiFi 6E, Bluetooth, Gray, Windows 11, EAT Laptop Foldable Stand ', 'uploads/img/msi thin.jpg'),
(5, 'ACER Nitro v 16', 3600, 3, 1, 'nullAcer Nitro V 16 AI WUXGA IPS 180Hz Gaming Laptop AI PC, AMD Ryzen 5 240 Processor, 16GB RAM, 512GB SSD, NVIDIA® GeForce RTX™ 5050 8GB GDDR7 Graphics, Windows 11,English Keyboard, Obsidian Black ', 'uploads/img/acer.jpg'),
(6, 'Lenovo LOQ', 2600, 3, 1, 'Lenovo LOQ Essential – AI-Powered Student Gaming Laptop - Intel® Core™i5-12450HX - 15.6\" FHD IPS Display–144Hz Refresh Rate  NVIDIA® GeForce RTX™ 4050 – 8GB Memory 512GB SSD Storage Luna Grey ', 'uploads/img/log.jpg'),
(11, 'xiaomi 17', 620, 5, 2, '6.3-inch 1.5K 120Hz OLED display (3500 nits peak), Snapdragon 8 Elite Gen 5 processor, 12/16GB RAM, and a 6300mAh battery with 100W wired/50W wireless charging. phone game ', 'uploads/img/xia-+69787708a13a3.jpeg'),
(46, 'Redmagic 11 Pro', 650, 4, 2, 'phone gameing', 'uploads/img/redmagic-+6979b0a8be5c6.jpeg'),
(47, 'switch one', 300, 5, 3, 'game console', 'uploads/img/sw-+6979f0f868951.webp'),
(48, 'switch two', 500, 9, 3, 'game console', 'uploads/img/sw2-+6979f12ac3236.webp'),
(49, 'Playstation 5', 500, 9, 3, 'game console', 'uploads/img/ps5-+6979f16cdbb0b.webp'),
(56, 'Xbox Serise X', 650, 4, 3, 'game console', 'uploads/img/x-sx-+6979f4b96c6b3.webp'),
(57, 'Xbox Serise S', 400, 8, 3, 'game console', 'uploads/img/x-ss-+6979f4e756f12.webp'),
(58, 'Playstation 4', 150, 12, 3, 'game console', 'uploads/img/ps4-+6979f53564e67.webp');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `usern` varchar(30) NOT NULL,
  `pass` varchar(20) NOT NULL,
  `keyp` int(5) NOT NULL,
  `cart` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `usern`, `pass`, `keyp`, `cart`) VALUES
(1, 'moaz', 'moaz', 12345, ''),
(2, 'one', '123', 3341, ''),
(3, 'ahmed', '123', 445, ''),
(4, 'ahmed', '123', 445, ''),
(5, 'ahmed', '123', 123, ''),
(6, 'moneb', 'mo@', 442, ''),
(7, 'monebs', '33', 442, ''),
(8, 'root', 'root', 666, ''),
(9, 'one', '123', 123, ''),
(10, '1', '1', 1, ''),
(11, 'no', '123', 123, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`u_id`),
  ADD KEY `fk_prod` (`p_id`);

--
-- Indexes for table `prodc`
--
ALTER TABLE `prodc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cat_id` (`cid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `prodc`
--
ALTER TABLE `prodc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_prod` FOREIGN KEY (`p_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`u_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `cat_id` FOREIGN KEY (`cid`) REFERENCES `prodc` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
