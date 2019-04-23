-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2018-03-04 09:03:00
-- 服务器版本： 5.7.18
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `workshopManage`
--

-- --------------------------------------------------------

--
-- 表的结构 `checkpointdb`
--

CREATE TABLE `checkpointdb` (
  `checkpointId` int(40) NOT NULL COMMENT '检查点Id',
  `workshopId` int(40) NOT NULL COMMENT '车间Id',
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '检查点名称',
  `times` int(40) NOT NULL COMMENT '检查次数'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 表的结构 `fixdb`
--

CREATE TABLE `fixdb` (
  `fixId` int(40) NOT NULL COMMENT '修复Id',
  `inspectId` int(40) NOT NULL COMMENT '检查Id',
  `date` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '时间',
  `description` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '简要说明',
  `photo` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '图片'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 表的结构 `groupdb`
--

CREATE TABLE `groupdb` (
  `groupId` int(40) NOT NULL COMMENT '部门Id',
  `groupName` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '部门名称',
  `groupCode` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '部门码',
  `groupCover` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '部门封面'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 表的结构 `inspectdb`
--

CREATE TABLE `inspectdb` (
  `inspectId` int(40) NOT NULL COMMENT '检查Id',
  `date` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '时间',
  `workshopId` int(40) NOT NULL COMMENT '车间Id',
  `checkpointId` int(40) NOT NULL COMMENT '检查点Id',
  `checkpointName` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '检查点名称',
  `error` int(10) NOT NULL COMMENT '状态',
  `admin` int(10) NOT NULL COMMENT '是否为管理员发现',
  `description` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '简要说明',
  `photo` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '图片',
  `openId` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '负责人openId'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 表的结构 `memberdb`
--

CREATE TABLE `memberdb` (
  `memberId` int(40) NOT NULL COMMENT '成员Id',
  `groupId` int(40) NOT NULL COMMENT '部门Id',
  `openId` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '成员openId',
  `label` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 表的结构 `messagedb`
--

CREATE TABLE `messagedb` (
  `messageId` int(40) NOT NULL,
  `date` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `groupId` int(40) NOT NULL,
  `superiorId` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `staffId` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ifRead` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 表的结构 `staffdb`
--

CREATE TABLE `staffdb` (
  `userId` int(40) NOT NULL COMMENT '用户Id',
  `name` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '姓名',
  `openId` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'openId',
  `staffId` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '工号',
  `sex` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '性别',
  `telNum` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '手机号',
  `avatar` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '头像'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 表的结构 `workshopdb`
--

CREATE TABLE `workshopdb` (
  `workshopId` int(40) NOT NULL COMMENT '车间Id',
  `groupId` int(40) NOT NULL COMMENT '部门Id',
  `workshopName` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '车间名',
  `checkpointNum` int(40) NOT NULL COMMENT '检查点数量',
  `openId` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '负责人openId'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `checkpointdb`
--
ALTER TABLE `checkpointdb`
  ADD PRIMARY KEY (`checkpointId`);

--
-- Indexes for table `fixdb`
--
ALTER TABLE `fixdb`
  ADD PRIMARY KEY (`fixId`);

--
-- Indexes for table `groupdb`
--
ALTER TABLE `groupdb`
  ADD PRIMARY KEY (`groupId`);

--
-- Indexes for table `inspectdb`
--
ALTER TABLE `inspectdb`
  ADD PRIMARY KEY (`inspectId`);

--
-- Indexes for table `memberdb`
--
ALTER TABLE `memberdb`
  ADD PRIMARY KEY (`memberId`);

--
-- Indexes for table `messagedb`
--
ALTER TABLE `messagedb`
  ADD PRIMARY KEY (`messageId`);

--
-- Indexes for table `staffdb`
--
ALTER TABLE `staffdb`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `workshopdb`
--
ALTER TABLE `workshopdb`
  ADD PRIMARY KEY (`workshopId`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `checkpointdb`
--
ALTER TABLE `checkpointdb`
  MODIFY `checkpointId` int(40) NOT NULL AUTO_INCREMENT COMMENT '检查点Id';
--
-- 使用表AUTO_INCREMENT `fixdb`
--
ALTER TABLE `fixdb`
  MODIFY `fixId` int(40) NOT NULL AUTO_INCREMENT COMMENT '修复Id';
--
-- 使用表AUTO_INCREMENT `groupdb`
--
ALTER TABLE `groupdb`
  MODIFY `groupId` int(40) NOT NULL AUTO_INCREMENT COMMENT '部门Id';
--
-- 使用表AUTO_INCREMENT `inspectdb`
--
ALTER TABLE `inspectdb`
  MODIFY `inspectId` int(40) NOT NULL AUTO_INCREMENT COMMENT '检查Id';
--
-- 使用表AUTO_INCREMENT `memberdb`
--
ALTER TABLE `memberdb`
  MODIFY `memberId` int(40) NOT NULL AUTO_INCREMENT COMMENT '成员Id';
--
-- 使用表AUTO_INCREMENT `messagedb`
--
ALTER TABLE `messagedb`
  MODIFY `messageId` int(40) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `staffdb`
--
ALTER TABLE `staffdb`
  MODIFY `userId` int(40) NOT NULL AUTO_INCREMENT COMMENT '用户Id';
--
-- 使用表AUTO_INCREMENT `workshopdb`
--
ALTER TABLE `workshopdb`
  MODIFY `workshopId` int(40) NOT NULL AUTO_INCREMENT COMMENT '车间Id';COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
