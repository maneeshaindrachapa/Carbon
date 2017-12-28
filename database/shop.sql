-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 28, 2017 at 08:44 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(200) NOT NULL,
  `username` varchar(40) NOT NULL,
  `id` int(100) NOT NULL,
  `quantity` int(10) NOT NULL,
  `pricePay` decimal(20,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `username`, `id`, `quantity`, `pricePay`) VALUES
(5, 'nn', 24, 5, '9250'),
(12, 'nn', 25, 1, '2550'),
(18, 'nn', 1, 3, '4500'),
(19, 'nn', 27, 1, '1850'),
(20, 'nn', 23, 2, '5000');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(200) NOT NULL,
  `firstname` varchar(40) NOT NULL,
  `lastname` varchar(40) NOT NULL,
  `shop_id` int(10) NOT NULL,
  `product_id` int(100) NOT NULL,
  `productname` varchar(100) NOT NULL,
  `quantity` int(10) NOT NULL,
  `pricePay` decimal(20,0) NOT NULL,
  `city` varchar(100) NOT NULL,
  `street` varchar(100) NOT NULL,
  `email` varchar(80) NOT NULL,
  `telephone` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `firstname`, `lastname`, `shop_id`, `product_id`, `productname`, `quantity`, `pricePay`, `city`, `street`, `email`, `telephone`) VALUES
(5, 'maneesha', 'indrachapa', 2, 23, 'Nike Running Shoes', 5, '12500', 'galle', 'isuru pesdes,mampitiya', 'maneesha@gmail.com', 715238973),
(7, 'maneesha', 'indrachapa', 2, 23, 'Nike Running Shoes', 5, '12500', 'galle', 'isurupedesa,mampitiya', 'mane.132@gmail.com', 715238973),
(10, 'maneesha', 'indrachapa', 2, 23, 'Nike Running Shoes', 1, '2500', 'galle', 'isuru pedesa,mampitiya', 'maneesha@gmail.com', 715238973),
(11, 'maneesha', 'indrachapa', 1, 27, 'Devilled Pizza', 1, '1850', 'galle', 'isuru pedesa,mampitiya', 'maneesha@gmail.com', 715238973);

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE `owners` (
  `owner_id` int(10) NOT NULL,
  `ownername` varchar(40) NOT NULL,
  `shop_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`owner_id`, `ownername`, `shop_id`) VALUES
(1, 'mm', 1),
(2, 'nipuna', 2),
(4, 'mmm', 3);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(100) NOT NULL,
  `shop_id` int(10) NOT NULL,
  `productname` varchar(40) NOT NULL,
  `price` decimal(20,0) NOT NULL,
  `details` varchar(500) NOT NULL,
  `picture` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `shop_id`, `productname`, `price`, `details`, `picture`) VALUES
(1, 1, 'Sausage Pizza', '1500', 'Bake at 400 degrees for 10-12 minutes or until lightly browned. Meanwhile, in a large skillet, cook the sausage, onion, mushrooms and green pepper over medium heat until sausage is no longer pink; drain. Spread pizza sauce over crust. Top with sausage mixture; sprinkle with cheese.', 'http://www.simplecomfortfood.com/wp-content/uploads/2013/08/kale-sausage-pizza-high.jpg'),
(23, 2, 'Nike Running Shoes', '2500', 'The Nike Free RN Distance 2 is a flexible daily running shoe designed for the neutral runner seeking a more natural foot motion. The Nike Zoom Pegasus 34 is a neutral running shoe that offers high cushioning in a responsive package.', 'https://i1.adis.ws/i/jpl/jd_282723_a?qlt=80'),
(27, 1, 'Devilled Pizza', '1850', 'Sizzling red-hot devilled chicken infused with bold and feisty flavours. ... Season chicken with Knorr Chicken Powder Mix and crushed pepper. ... To get that crispy golden colour on your fried chicken, just add a pinch of turmeric and chilli powder when marinating.', 'http://d3d74jl2pfp5da.cloudfront.net/wp-content/uploads/2014/01/Dominos-Gluten-Free-Pizza-Review.jpg'),
(28, 1, 'Chicken Pizza', '2500', '1/2 recipe homemade pizza crust. 1/3 cup + 2 Tablespoons your favorite BBQ sauce. 1 cup cooked, sliced chicken breast (about one 8-ounce breast) 2/3 cup shredded mozzarella cheese. 2/3 cup shredded smoked gouda cheese.', 'http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/recipes/ck/12/01/chicken-pizza-ck-x.jpg?itok=yr-46yrI');

-- --------------------------------------------------------

--
-- Stand-in structure for view `productfull`
-- (See below for the actual view)
--
CREATE TABLE `productfull` (
`shop_id` int(10)
,`shopname` varchar(100)
,`description` varchar(500)
,`profilePic` varchar(100)
,`id` int(100)
,`productname` varchar(40)
,`price` decimal(20,0)
,`details` varchar(500)
,`picture` varchar(200)
);

-- --------------------------------------------------------

--
-- Table structure for table `shopdetails`
--

CREATE TABLE `shopdetails` (
  `shop_id` int(10) NOT NULL,
  `shopname` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `profilePic` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shopdetails`
--

INSERT INTO `shopdetails` (`shop_id`, `shopname`, `description`, `profilePic`) VALUES
(1, 'Pizza Hut', 'Pizza Hut is an American restaurant chain and international franchise founded in 1958 by Dan and Frank Carney. The company is known for its Italian-American cuisine menu including pizza and pasta, as well as side dishes and desserts. Pizza Hut has over 16,000 locations worldwide as of 2015, and is a subsidiary of Yum!', 'http://www.adweek.com/agencyspy/wp-content/uploads/sites/7/2016/03/pizza_hut_logo_detail.png'),
(2, 'NIKE', 'The Company\'s portfolio brands include the NIKE Brand, Jordan Brand, Hurley and Converse. ... The Company\'s athletic footwear products are designed primarily for specific athletic use. Its products are also worn for casual or leisure purposes. The Company also sells sports apparel.', 'http://www.livetradingnews.com/wp-content/uploads/2017/12/nike.png'),
(3, 'KFC', 'The chain is a subsidiary of Yum! Brands, a restaurant company that also owns the Pizza Hut and Taco Bell chains. KFC was founded by Colonel Harland Sanders, an entrepreneur who began selling fried chicken from his roadside restaurant in Corbin, Kentucky during the Great Depression.', 'https://d30v2pzvrfyzpo.cloudfront.net/images/chains/kfc-opengraph-1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `username` varchar(40) NOT NULL,
  `firstname` varchar(40) NOT NULL,
  `lastname` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  `type` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `firstname`, `lastname`, `password`, `type`) VALUES
(1, 'maneesha', 'manee', 'indra', '123', 3),
(3, 'nipuna', 'nipuna', 'upeksha', '123', 2),
(4, 'nn', 'nn', 'nn', '12', 1),
(7, 'mm', 'maneesha', 'indrachapa', '123', 2),
(8, 'mmm', 'maneesha', 'indrachapa', '123', 2);

-- --------------------------------------------------------

--
-- Structure for view `productfull`
--
DROP TABLE IF EXISTS `productfull`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `productfull`  AS  select `shopdetails`.`shop_id` AS `shop_id`,`shopdetails`.`shopname` AS `shopname`,`shopdetails`.`description` AS `description`,`shopdetails`.`profilePic` AS `profilePic`,`product`.`id` AS `id`,`product`.`productname` AS `productname`,`product`.`price` AS `price`,`product`.`details` AS `details`,`product`.`picture` AS `picture` from (`shopdetails` join `product` on((`shopdetails`.`shop_id` = `product`.`shop_id`))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`owner_id`),
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `ownername` (`ownername`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Indexes for table `shopdetails`
--
ALTER TABLE `shopdetails`
  ADD PRIMARY KEY (`shop_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
  MODIFY `owner_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `shopdetails`
--
ALTER TABLE `shopdetails`
  MODIFY `shop_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `owners`
--
ALTER TABLE `owners`
  ADD CONSTRAINT `owners_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shopdetails` (`shop_id`),
  ADD CONSTRAINT `owners_ibfk_2` FOREIGN KEY (`ownername`) REFERENCES `users` (`username`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shopdetails` (`shop_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
