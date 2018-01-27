-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2018-01-27 08:22:34
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

--
-- 转存表中的数据 `checkpointdb`
--

INSERT INTO `checkpointdb` (`checkpointId`, `workshopId`, `name`) VALUES
(18, 8, '检查点2'),
(19, 8, '检查点3'),
(20, 9, '检查点0'),
(21, 9, '检查点1'),
(22, 9, '检查点2'),
(23, 10, '检查点0'),
(24, 10, '检查点1'),
(25, 10, '检查点2'),
(26, 11, '检查点0'),
(28, 11, '检查点2'),
(30, 7, '检查点1'),
(31, 7, '检查点2'),
(32, 7, '检查点3');

-- --------------------------------------------------------

--
-- 表的结构 `fixdb`
--

CREATE TABLE `fixdb` (
  `fixId` int(40) NOT NULL COMMENT '修复Id',
  `inspectId` int(40) NOT NULL COMMENT '检查Id',
  `date` varchar(40) NOT NULL COMMENT '时间',
  `description` text CHARACTER SET gbk COLLATE gbk_bin NOT NULL COMMENT '简要说明',
  `photo` text NOT NULL COMMENT '图片'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `fixdb`
--

INSERT INTO `fixdb` (`fixId`, `inspectId`, `date`, `description`, `photo`) VALUES
(9, 67, '2018-01-24', '已修复', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516761484723-SyB9-drHM.jpg'),
(10, 53, '2018-01-24', '123', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516775999639-rJdr5sSrz.jpg'),
(11, 72, '2018-01-26', '修复成功', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516896278634-rJyQgFPBf.jpg'),
(12, 71, '2018-01-26', '修复成功', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516896304914-ByKNgYvBG.jpg'),
(13, 70, '2018-01-26', '修复成功', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516896324120-S1nretwrM.jpg');

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

--
-- 转存表中的数据 `groupdb`
--

INSERT INTO `groupdb` (`groupId`, `groupName`, `adminId`, `groupCode`, `groupCover`) VALUES
(6, '天龙九部', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E', '123456', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516613493241-ByTuyVXBz.jpg'),
(7, '3213231', 'o1AEi0Y2YH6BORGIanQuOFROWpq4', '123213', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516613752970-BJWtx47HG.jpg'),
(8, '123', 'o1AEi0Y2YH6BORGIanQuOFROWpq4', '123213', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516619929240-SJZiuH7rf.jpg'),
(9, '423423234', 'o1AEi0Y2YH6BORGIanQuOFROWpq4', '123456', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516619939374-rysi_SXHz.jpg'),
(10, '不知道', 'o1AEi0Y2YH6BORGIanQuOFROWpq4', '123457', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516620058305-ryMmFSQrG.jpg'),
(11, 'qwe', 'o1AEi0doXpcZYpuWhfiK3R_-yj3I', '123456', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516620837325-S1aQ2SQrf.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `inspectdb`
--

CREATE TABLE `inspectdb` (
  `inspectId` int(40) NOT NULL COMMENT '检查Id',
  `timesId` int(40) NOT NULL COMMENT '检查轮数Id',
  `date` varchar(40) NOT NULL COMMENT '时间',
  `workshopId` int(40) NOT NULL COMMENT '车间Id',
  `checkpointId` int(40) NOT NULL COMMENT '检查点Id',
  `checkpointName` varchar(40) CHARACTER SET gbk COLLATE gbk_bin NOT NULL COMMENT '检查点名称',
  `error` int(10) NOT NULL COMMENT '状态',
  `admin` int(10) NOT NULL COMMENT '是否为管理员发现',
  `description` varchar(100) CHARACTER SET gbk COLLATE gbk_bin NOT NULL COMMENT '简要说明',
  `photo` text NOT NULL COMMENT '图片',
  `openId` varchar(40) NOT NULL COMMENT '负责人openId'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `inspectdb`
--

INSERT INTO `inspectdb` (`inspectId`, `timesId`, `date`, `workshopId`, `checkpointId`, `checkpointName`, `error`, `admin`, `description`, `photo`, `openId`) VALUES
(13, 0, '2018-01-22', 8, 16, '检查点0', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(14, 0, '2018-01-22', 8, 17, '检查点1', 1, 0, '有故障', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516614231523-r1lwME7rG.jpg', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(15, 0, '2018-01-22', 8, 18, '检查点2', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(16, 0, '2018-01-22', 8, 19, '检查点3', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(17, 0, '2018-01-22', 8, 16, '检查点0', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(18, 0, '2018-01-22', 8, 17, '检查点1', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(19, 0, '2018-01-22', 8, 18, '检查点2', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(20, 0, '2018-01-22', 8, 19, '检查点3', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(21, 0, '2018-01-22', 8, 16, '检查点0', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(22, 0, '2018-01-22', 8, 17, '检查点1', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(23, 0, '2018-01-22', 8, 18, '检查点2', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(24, 0, '2018-01-22', 8, 19, '检查点3', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(25, 0, '2018-01-22', 8, 16, '检查点0', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(26, 0, '2018-01-22', 8, 17, '检查点1', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(27, 0, '2018-01-22', 8, 18, '检查点2', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(28, 0, '2018-01-22', 8, 19, '检查点3', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(53, 19, '2018-01-23', 7, 12, '检查点0', 2, 0, '有故障', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516614231523-r1lwME7rG.jpg', 'o1AEi0Y2YH6BORGIanQuOFROWpq4'),
(54, 19, '2018-01-23', 7, 13, '检查点1', 0, 0, '', '', 'o1AEi0Y2YH6BORGIanQuOFROWpq4'),
(55, 19, '2018-01-23', 7, 14, '检查点2', 0, 0, '', '', 'o1AEi0Y2YH6BORGIanQuOFROWpq4'),
(56, 19, '2018-01-23', 7, 15, '检查点3', 0, 0, '', '', 'o1AEi0Y2YH6BORGIanQuOFROWpq4'),
(67, 29, '2018-01-23', 11, 26, '检查点0', 2, 0, '有故障', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516701406886-HkvJwKEBG.jpg', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(68, 29, '2018-01-23', 11, 27, '检查点1', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(69, 29, '2018-01-23', 11, 28, '检查点2', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(70, -1, '2018-01-24', 7, 14, '检查点2', 2, 1, '123', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516783270609-HkkhUaBHG.jpg', 'o1AEi0Y2YH6BORGIanQuOFROWpq4'),
(71, -1, '2018-01-24', 7, 15, '检查点3', 2, 1, '故障', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516783327878-rJdJvTrrG.jpg', 'o1AEi0Y2YH6BORGIanQuOFROWpq4'),
(72, -1, '2018-01-24', 7, 13, '检查点1', 2, 1, '故障', 'http://qcloudtest-1255747074.cn-south.myqcloud.com/1516783832625-r1WJFprBM.jpg', 'o1AEi0Y2YH6BORGIanQuOFROWpq4'),
(73, 30, '2018-01-26', 7, 29, '检查点0', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(74, 30, '2018-01-26', 7, 30, '检查点1', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(75, 30, '2018-01-26', 7, 31, '检查点2', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(76, 30, '2018-01-26', 7, 32, '检查点3', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(77, 31, '2018-01-27', 7, 30, '检查点1', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(78, 31, '2018-01-27', 7, 31, '检查点2', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(79, 31, '2018-01-27', 7, 32, '检查点3', 0, 0, '', '', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E');

-- --------------------------------------------------------

--
-- 表的结构 `memberdb`
--

CREATE TABLE `memberdb` (
  `memberId` int(40) NOT NULL COMMENT '成员Id',
  `groupId` int(40) NOT NULL COMMENT '部门Id',
  `openId` varchar(40) CHARACTER SET gbk COLLATE gbk_bin NOT NULL COMMENT '成员openId'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `memberdb`
--

INSERT INTO `memberdb` (`memberId`, `groupId`, `openId`) VALUES
(10, 6, 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(11, 7, 'o1AEi0Y2YH6BORGIanQuOFROWpq4'),
(12, 6, 'o1AEi0Y2YH6BORGIanQuOFROWpq4'),
(13, 8, 'o1AEi0Y2YH6BORGIanQuOFROWpq4'),
(14, 9, 'o1AEi0Y2YH6BORGIanQuOFROWpq4'),
(15, 10, 'o1AEi0Y2YH6BORGIanQuOFROWpq4'),
(16, 6, 'o1AEi0doXpcZYpuWhfiK3R_-yj3I'),
(17, 11, 'o1AEi0doXpcZYpuWhfiK3R_-yj3I'),
(18, 12, 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(19, 13, 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(20, 14, 'o1AEi0TRH-PEYdx5NsY8uXfynX-E'),
(21, 15, 'o1AEi0TRH-PEYdx5NsY8uXfynX-E');

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
(7, '徐涛', 'o1AEi0TRH-PEYdx5NsY8uXfynX-E', '00000001', '男', '15360591018', 'https://wx.qlogo.cn/mmopen/vi_32/FIGiaicNWZEzU4U83CQKczjjeBJLSR77jk3OFpc5UpfsMqjxiaJnuiaDpy9TCvzmajSqiaPZvHicktLkpOQia51ca9bTg/0'),
(8, '李林峰😬', 'o1AEi0Y2YH6BORGIanQuOFROWpq4', '12312321', '男', '21312312312', 'https://wx.qlogo.cn/mmopen/vi_32/BagUJIjSicHFuh5XlbyaCbpkjhcMCmZ476bUPBzNo7LBn026AaZ6kpr6vwgkSibOqyk8wO6jC756BBryMmLjXiaicg/0'),
(9, 'Racing_C', 'o1AEi0doXpcZYpuWhfiK3R_-yj3I', '21845421', '男', '13548846947', 'https://wx.qlogo.cn/mmopen/vi_32/icoiaJxxG1BbicSeYasPj0wDIicnmFn8I8ib9b3BO1rEyWu2y6ZQCHFKtTNFkKe6Ae6Vxu9bUicpWSiaOgv2jUskkUd9g/0');

-- --------------------------------------------------------

--
-- 表的结构 `timesdb`
--

CREATE TABLE `timesdb` (
  `timesId` int(40) NOT NULL COMMENT '检查轮数Id',
  `workshopId` int(40) NOT NULL COMMENT '车间Id',
  `date` varchar(40) NOT NULL COMMENT '时间'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `timesdb`
--

INSERT INTO `timesdb` (`timesId`, `workshopId`, `date`) VALUES
(9, 8, '2018-01-22'),
(10, 8, '2018-01-22'),
(11, 8, '2018-01-22'),
(12, 8, '2018-01-22'),
(19, 7, '2018-01-23'),
(29, 11, '2018-01-23'),
(30, 7, '2018-01-26'),
(31, 7, '2018-01-27');

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
-- 转存表中的数据 `workshopdb`
--

INSERT INTO `workshopdb` (`workshopId`, `groupId`, `workshopName`, `checkpointNum`, `openId`, `times`) VALUES
(7, 6, '一号车间', 3, 'o1AEi0TRH-PEYdx5NsY8uXfynX-E', 3),
(8, 6, '二号车间', 2, 'o1AEi0TRH-PEYdx5NsY8uXfynX-E', 3),
(11, 6, '三号车间', 2, 'o1AEi0Y2YH6BORGIanQuOFROWpq4', 3);

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
  MODIFY `checkpointId` int(40) NOT NULL AUTO_INCREMENT COMMENT '检查点Id', AUTO_INCREMENT=33;
--
-- 使用表AUTO_INCREMENT `fixdb`
--
ALTER TABLE `fixdb`
  MODIFY `fixId` int(40) NOT NULL AUTO_INCREMENT COMMENT '修复Id', AUTO_INCREMENT=14;
--
-- 使用表AUTO_INCREMENT `groupdb`
--
ALTER TABLE `groupdb`
  MODIFY `groupId` int(40) NOT NULL AUTO_INCREMENT COMMENT '部门Id', AUTO_INCREMENT=16;
--
-- 使用表AUTO_INCREMENT `inspectdb`
--
ALTER TABLE `inspectdb`
  MODIFY `inspectId` int(40) NOT NULL AUTO_INCREMENT COMMENT '检查Id', AUTO_INCREMENT=80;
--
-- 使用表AUTO_INCREMENT `memberdb`
--
ALTER TABLE `memberdb`
  MODIFY `memberId` int(40) NOT NULL AUTO_INCREMENT COMMENT '成员Id', AUTO_INCREMENT=22;
--
-- 使用表AUTO_INCREMENT `staffdb`
--
ALTER TABLE `staffdb`
  MODIFY `userId` int(40) NOT NULL AUTO_INCREMENT COMMENT '用户Id', AUTO_INCREMENT=10;
--
-- 使用表AUTO_INCREMENT `timesdb`
--
ALTER TABLE `timesdb`
  MODIFY `timesId` int(40) NOT NULL AUTO_INCREMENT COMMENT '检查轮数Id', AUTO_INCREMENT=32;
--
-- 使用表AUTO_INCREMENT `workshopdb`
--
ALTER TABLE `workshopdb`
  MODIFY `workshopId` int(40) NOT NULL AUTO_INCREMENT COMMENT '车间Id', AUTO_INCREMENT=12;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
