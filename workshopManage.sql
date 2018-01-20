-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2018-01-20 10:50:34
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
  `name` varchar(40) CHARACTER SET gbk COLLATE gbk_bin NOT NULL COMMENT '检查点名称'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `fixdb`
--

CREATE TABLE `fixdb` (
  `fixId` int(40) NOT NULL COMMENT '修复Id',
  `inspectId` int(40) NOT NULL COMMENT '检查Id',
  `date` varchar(40) NOT NULL COMMENT '时间',
  `error` int(10) NOT NULL COMMENT '状态',
  `describtion` text CHARACTER SET gbk COLLATE gbk_bin NOT NULL COMMENT '简要说明',
  `photo` text NOT NULL COMMENT '图片'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `groupdb`
--

CREATE TABLE `groupdb` (
  `groupId` int(40) NOT NULL COMMENT '部门Id',
  `groupName` varchar(40) CHARACTER SET gbk COLLATE gbk_bin NOT NULL COMMENT '部门名称',
  `adminId` varchar(40) NOT NULL COMMENT '管理员Id',
  `groupCode` varchar(40) NOT NULL COMMENT '部门码',
  `groupCover` text NOT NULL COMMENT '部门封面'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `inspectdb`
--

CREATE TABLE `inspectdb` (
  `inspectId` int(40) NOT NULL COMMENT '检查Id',
  `date` varchar(40) NOT NULL COMMENT '时间',
  `workshopId` int(40) NOT NULL COMMENT '车间Id',
  `checkpointId` int(40) NOT NULL COMMENT '检查点Id',
  `error` int(10) NOT NULL COMMENT '状态',
  `admin` int(10) NOT NULL COMMENT '是否为管理员发现',
  `description` varchar(100) CHARACTER SET gbk COLLATE gbk_bin NOT NULL COMMENT '简要说明',
  `photo` varchar(100) NOT NULL COMMENT '图片',
  `openId` varchar(40) NOT NULL COMMENT '负责人openId'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `memberdb`
--

CREATE TABLE `memberdb` (
  `memberId` int(40) NOT NULL COMMENT '成员Id',
  `groupId` int(40) NOT NULL COMMENT '部门Id',
  `openId` varchar(40) CHARACTER SET gbk COLLATE gbk_bin NOT NULL COMMENT '成员openId'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `staffdb`
--

CREATE TABLE `staffdb` (
  `userId` int(40) NOT NULL COMMENT '用户Id',
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '姓名',
  `openId` varchar(40) NOT NULL COMMENT 'openId',
  `staffId` varchar(40) NOT NULL COMMENT '工号',
  `sex` varchar(10) CHARACTER SET gbk COLLATE gbk_bin NOT NULL COMMENT '性别',
  `telNum` varchar(40) NOT NULL COMMENT '手机号',
  `avatar` text NOT NULL COMMENT '头像'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `staffdb`
--

INSERT INTO `staffdb` (`userId`, `name`, `openId`, `staffId`, `sex`, `telNum`, `avatar`) VALUES
(4, '李林峰😬', 'o1AEi0Y2YH6BORGIanQuOFROWpq4', '32131232', '男', '12321312312', 'https://wx.qlogo.cn/mmopen/vi_32/BagUJIjSicHFuh5XlbyaCbpkjhcMCmZ476bUPBzNo7LBn026AaZ6kpr6vwgkSibOqyk8wO6jC756BBryMmLjXiaicg/0'),
(5, '徐涛', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E', '00000001', '男', '15360591018', 'https://wx.qlogo.cn/mmopen/vi_32/FIGiaicNWZEzU4U83CQKczjjeBJLSR77jk3OFpc5UpfsMqjxiaJnuiaDpy9TCvzmajSqiaPZvHicktLkpOQia51ca9bTg/0');

-- --------------------------------------------------------

--
-- 表的结构 `timesdb`
--

CREATE TABLE `timesdb` (
  `timesId` int(40) NOT NULL COMMENT '检查轮数Id',
  `workshopId` int(40) NOT NULL COMMENT '车间Id',
  `date` varchar(40) NOT NULL COMMENT '时间'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `workshopdb`
--

CREATE TABLE `workshopdb` (
  `workshopId` int(40) NOT NULL COMMENT '车间Id',
  `groupId` int(40) NOT NULL COMMENT '部门Id',
  `workshopName` varchar(40) CHARACTER SET gbk COLLATE gbk_bin NOT NULL COMMENT '车间名',
  `checkpointNum` int(40) NOT NULL COMMENT '检查点数量',
  `openId` varchar(40) NOT NULL COMMENT '负责人openId',
  `times` int(10) NOT NULL COMMENT '每月检查次数'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Indexes for table `staffdb`
--
ALTER TABLE `staffdb`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `timesdb`
--
ALTER TABLE `timesdb`
  ADD PRIMARY KEY (`timesId`);

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
  MODIFY `checkpointId` int(40) NOT NULL AUTO_INCREMENT COMMENT '检查点Id', AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `fixdb`
--
ALTER TABLE `fixdb`
  MODIFY `fixId` int(40) NOT NULL AUTO_INCREMENT COMMENT '修复Id';
--
-- 使用表AUTO_INCREMENT `groupdb`
--
ALTER TABLE `groupdb`
  MODIFY `groupId` int(40) NOT NULL AUTO_INCREMENT COMMENT '部门Id', AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `inspectdb`
--
ALTER TABLE `inspectdb`
  MODIFY `inspectId` int(40) NOT NULL AUTO_INCREMENT COMMENT '检查Id', AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `memberdb`
--
ALTER TABLE `memberdb`
  MODIFY `memberId` int(40) NOT NULL AUTO_INCREMENT COMMENT '成员Id', AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `staffdb`
--
ALTER TABLE `staffdb`
  MODIFY `userId` int(40) NOT NULL AUTO_INCREMENT COMMENT '用户Id', AUTO_INCREMENT=6;
--
-- 使用表AUTO_INCREMENT `timesdb`
--
ALTER TABLE `timesdb`
  MODIFY `timesId` int(40) NOT NULL AUTO_INCREMENT COMMENT '检查轮数Id', AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `workshopdb`
--
ALTER TABLE `workshopdb`
  MODIFY `workshopId` int(40) NOT NULL AUTO_INCREMENT COMMENT '车间Id', AUTO_INCREMENT=5;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
