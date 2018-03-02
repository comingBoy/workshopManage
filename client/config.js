/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://vpqxc4sg.qcloud.la';
//var host = 'https://934560484.qcloudmanagestaff.club';
var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        getAllGroupUrl: `${host}/weapp/getAllGroup`,

        newGroupUrl: `${host}/weapp/newGroup`,

        verifyUrl: `${host}/weapp/verify`,

        registerUrl: `${host}/weapp/register`,

        modifyUserInfoUrl: `${host}/weapp/modifyUserInfo`,

        uploadImgUrl: `${host}/weapp/uploadImg`,

        verifyStaffUrl: `${host}/weapp/verifyStaff`,

        joinGroupUrl: `${host}/weapp/joinGroup`,

        getStaffUrl: `${host}/weapp/getStaff`,

        delStaffUrl: `${host}/weapp/delStaff`,

        getGroupWorkshopUrl: `${host}/weapp/getGroupWorkshop`,

        newWorkshopUrl: `${host}/weapp/newWorkshop`,

        getInspectUrl: `${host}/weapp/getInspect`,

        getMyWorkshopUrl: `${host}/weapp/getMyWorkshop`,

        newProgressUrl: `${host}/weapp/newProgress`,

        newWorkshopStatusUrl: `${host}/weapp/newWorkshopStatus`,

        getCheckpointUrl: `${host}/weapp/getCheckpoint`,
        
        getCheckpoint0Url: `${host}/weapp/getCheckpoint0`,

        getInspectHisUrl: `${host}/weapp/getInspectHis`,

        getErrorUrl: `${host}/weapp/getError`,

        fixErrorUrl: `${host}/weapp/fixError`,

        inspectUrl: `${host}/weapp/inspect`,

        inspect0Url: `${host}/weapp/inspect0`,

        getFixUrl: `${host}/weapp/getFix`,

        getTimesUrl: `${host}/weapp/getTimes`,

        getInspectByIdUrl: `${host}/weapp/getInspectById`,

        getWorkshopInfoUrl: `${host}/weapp/getWorkshopInfo`,

        changeWorkshopInfoUrl: `${host}/weapp/changeWorkshopInfo`,

        changeCheckpointInfoUrl: `${host}/weapp/changeCheckpointInfo`,

        delWorkshopUrl: `${host}/weapp/delWorkshop`, 

        delCheckpointUrl: `${host}/weapp/delCheckpoint`,

        newCheckpointUrl: `${host}/weapp/newCheckpoint`,

        delGroupUrl: `${host}/weapp/delGroup`,

        changeOpenIdUrl: `${host}/weapp/changeOpenId`,

        modifyGroupUrl: `${host}/weapp/modifyGroup`,

        getCheckDetailUrl: `${host}/weapp/getCheckDetail`,

        setLevelUrl: `${host}/weapp/setLevel`,

        getInspectTimesUrl: `${host}/weapp/getInspectTimes`,

        getLastInspectUrl: `${host}/weapp/getLastInspect`,

        getSuperiorUrl: `${host}/weapp/getSuperior`,

        getMessageUrl: `${host}/weapp/getMessage`,

        leaveMessageUrl: `${host}/weapp/leaveMessage`,

        getMyMessageUrl: `${host}/weapp/getMyMessage`,

        readMessageUrl: `${host}/weapp/readMessage`,

        getAdminUrl: `${host}/weapp/getAdmin`,

    }
};

module.exports = config;
