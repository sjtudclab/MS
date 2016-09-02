var examManage = angular.module('examManage', ['ui.bootstrap']);

examManage.directive('customOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeFunc = scope.$eval(attrs.customOnChange);
            // console.log(scope);
            // console.log('directive')
            element.bind('change', onChangeFunc);
        }
    };
});

examManage.controller('examManagerCtrl', function ($scope, $http, $window) {
    $scope.isCollapsed = false;


    $http({
        method: 'GET',
        url: 'problem.json',



    })
        .then(
        function success(response) {
            // 功能列表
            $scope.operationMetaInfo = response.data.authorityList;

            // 控制标签显示
            $scope.active = [];
            // 控制标签页显示
            $scope.display = [];
            for (i in $scope.operationMetaInfo) {
                $scope.active[i] = "";
                $scope.display[i] = "none";
            }
            // // 初始化显示标签0
            // $scope.index = 0;
        })

    // $scope.operationMetaInfo = ['单选题', '多选题', '判断题', '匹配题', '简答题'];
    // // 控制标签显示
    // $scope.active = [];
    // // 控制标签页显示
    // $scope.display = [];
    // for (i in $scope.operationMetaInfo) {
    //     $scope.active[i] = "";
    //     $scope.display[i] = "none";
    // }
    // // 初始化显示标签0
    // $scope.index = 0;

    $scope.importIcon = 'glyphicon glyphicon-menu-right';
    $scope.displayImport = 'none';


    // 监控index变量控制标签及标签页
    $scope.$watch('index', function () {
        if ($scope.index == undefined) {
            return;
        }
        for (i in $scope.active) {
            $scope.active[i] = "";
            $scope.display[i] = "none";
        }
        $scope.active[$scope.index] = "active";
        $scope.display[$scope.index] = "block";
    });

    $scope.toggleImport = function () {
        if ($scope.displayImport == 'none') {
            $scope.displayImport = 'block';
            $scope.importIcon = 'glyphicon glyphicon-menu-down';
        } else {
            $scope.displayImport = 'none';
            $scope.importIcon = 'glyphicon glyphicon-menu-right';
        }
    }


});

examManage.controller('examManageCtrl', function ($scope, $rootScope, $http, $window) {
    //记录科目信息
    var subjectStatus = {};
    $window.sessionStorage.subjectStatus = JSON.stringify(subjectStatus);

    $scope.operationMetaInfo = ['试卷管理', '考生管理', '考场管理', '考生试卷安排', '考生考场安排', '导出考试安排', '系统管理'];
    // 控制标签显示
    $scope.active = [];
    // 控制标签页显示
    $scope.display = [];
    for (i in $scope.operationMetaInfo) {
        $scope.active[i] = "";
        $scope.display[i] = "none";
    }
    // 初始化显示标签0
    $scope.index = 0;

    $scope.operationTabs = [
        {
            tabName: ['试卷导入', '试卷录入'],
            tabUrl: ['tab1', 'tab2']
        }, {
            tabName: ['考生导入', '考生录入'],
            tabUrl: ['stu1', 'stu2']
        }, {
            tabName: ['考场导入', '考场录入'],
            tabUrl: ['room1', 'room2']
        }, {
            tabName: ['考生试卷安排'],
            tabUrl: ['stuExam1']
        }, {
            tabName: ['考生考场安排'],
            tabUrl: ['stuRoom1']
        }, {
            tabName: ['导出考试安排'],
            tabUrl: ['examArrange']
        }, {
            tabName: ['系统管理'],
            tabUrl: ['setSystem1']
        }];

    // 监控index变量控制标签及标签页
    $scope.$watch('index', function () {
        if ($scope.index == undefined) {
            return;
        }
        for (i in $scope.active) {
            $scope.active[i] = "";
            $scope.display[i] = "none";
        }
        $scope.active[$scope.index] = "active";
        $scope.display[$scope.index] = "block";
        switch ($scope.index) {
            case 0:
                $rootScope.exInput = 'tpls/examManage/tab/subjectImport.html';
                var subjectStatus = JSON.parse($window.sessionStorage.subjectStatus);
                $scope.majorName = subjectStatus.majorName;
                $scope.kemuName = subjectStatus.name;
                break;
            case 1:

                break;
            case 2:

            case 3:

                break;
            case 4:

                break;
            case 5:

                break;
        }

    });
});
examManage.controller('TabsDCtrl', function ($scope, $rootScope) {

    $scope.active = [];
    $scope.display = [];
    $scope.color = [];
    $scope.index = 0;
    for (x in $scope.operationTabs) {
        $scope.active[x] = "";
        $scope.display[x] = 'none';
        $scope.color[x] = "white";
    };
    $scope.$watch('index', function (newValue, oldValue) {

        for (i in $scope.active) {
            $scope.active[i] = "";
            $scope.color[i] = "white";
            $scope.display[i] = "none";

        };

        $scope.active[$scope.index] = "active";
        $scope.display[$scope.index] = "block";

        switch ($scope.index) {

            case 0:
                // $scope.color[$scope.index] = "rgba(88,178,220,.5)";
                $scope.color[$scope.index] = "#fff";
                $scope.color[1] = "#ddd";
                break;
            case 1:
                // $scope.color[$scope.index] = "rgba(204,204,255,.6)";
                $scope.color[$scope.index] = "#fff";
                $scope.color[0] = "#ddd";
                break;
            default:
                alert('error');

        };
    });

    $scope.sel = function (index) {
        $scope.index = index;
    };

});

examManage.controller('examImportCtrl', function ($state, $scope, $rootScope, $http, $window) {
    //编辑
    $scope.edit = function () {
        alert($scope.tab);
        // $scope.tab="haha";
        $scope.sel(1);
        $rootScope.exInput = 'tpls/examManage/tab/singleImport.html';

    }

    //控制导入文件


    $scope.progressPer = 0;
    $scope.ngshow = false;
    $scope.selectFile = function () {

        $scope.$apply(function () {
            $scope.selectedFile = event.target.files[0];
        })

    }

    $scope.upload = function () {
        $scope.ngshow = true;
        var formData = new FormData();
        formData.append("file", $scope.selectedFile);
        formData.append("token", $window.sessionStorage.token);
        if ($scope.selectedFile == undefined) {
            return;
        }
        $scope.progressPer = 0;
        $http({
            method: 'POST',
            url: '/MS/paper/examForm',
            data: formData,
            headers: {
                'Content-Type': undefined,
            },
            uploadEventHandlers: {
                progress: function (e) {
                    $scope.progressPer = e.loaded / e.total * 100;
                    $scope.progressInfo = '上传中';
                }
            }
        }).then(function success(response) {
            $scope.progressInfo = response.data.info;
            //请求表格内容
            $http.get('/EMS/paper/examTable', {
                // $http.get('info.json', {
                params: {
                    token: $window.sessionStorage.token
                }
            }).then(function successCallback(response) {
                $scope.examineesInfo = response.data;
                $scope.orderCondition = 'id';
                $scope.isReverse = false;
            }, function errorCallback(response) {
            });
        }, function error(response) {
            alert('出现错误\n' + response.status + ' ' + response.statusText);
        });
    }
    //控制表格内容
    // $scope.examineesInfo = response.data;
    $scope.examineesInfo = [{
        'examNum': 'a1',
        'number': '1',
        'content': 'sdhkjsdhf',
        'answer': 'hahah',
        'point': '6',
        'filePic': 'file.img',
        'fileVe': 'ss.video',
        'fileRR': 'ss.audio'

    }, {
            'examNum': 'a1',
            'number': '1',
            'content': 'sdhkjsdhf',
            'answer': 'hahah',
            'point': '6',
            'filePic': 'file.img',
            'fileVe': 'ss.video',
            'fileRR': 'ss.audio'

        }]

    $scope.examineeMetaInfo = {
        'examNum': '试卷号',
        'number': '序号',
        'content': '题干',
        'answer': '参考答案',
        'point': '分值',
        'filePic': '图片文件',
        'fileVe': '视频文件',
        'fileRR': '音频文件'

    };


    // 排序变量
    $scope.thClick = function (value) {
        $scope.orderCondition = value;
        $scope.isReverse = !$scope.isReverse;
    }
    // 刷新
    $scope.refresh = function () {
        refresh();
    };
    //每间隔30s自动刷新
    var timingPromise = undefined;
    // timingPromise = $interval(function () { refresh() }, 30000);

    function refresh() {

        $http({
            method: 'GET',
            url: '/MS/paper/examTable',
            params: {
                token: $window.sessionStorage.token
            }
        })
            .then(
            function success(response) {
                $scope.examineesInfo = response.data;
                $scope.orderCondition = 'id';
                $scope.isReverse = false;
                // $scope.cancelAll();
            },
            function error(response) {
                alert('刷新出错\n' + response.status
                    + ' ' + response.statusText);
            });
    }

});
examManage.controller('stuImportCtrl', function ($scope, $http, $rootScope, $window) {
    //编辑
    $scope.edit = function (name, gender, id, picture, subject, subjectNum) {
        $scope.sel(1);
        $rootScope.stuName = name;
        $rootScope.stuGender = gender;
        $rootScope.stuId = id;
        $rootScope.stuSubject = subject;
        $rootScope.stuSubNum = subjectNum;
        $rootScope.stuPicture = picture;

    }

    //控制导入文件
    $scope.progressPer = 0;
    $scope.ngshow = false;
    $scope.selectFile = function () {

        $scope.$apply(function () {
            $scope.selectedFile = event.target.files[0];
            $scope.tt = $scope.selectedFile.name;
        })

    }

    $scope.upload = function () {
        $scope.ngshow = true;
        var formData = new FormData();
        formData.append("file", $scope.selectedFile);
        if ($scope.selectedFile == undefined) {
            return;
        }
        $scope.progressPer = 0;
        $http({
            method: 'POST',
            url: '/MS/paper/stuForm',
            data: formData,
            headers: {
                'Content-Type': undefined,
            },
            uploadEventHandlers: {
                progress: function (e) {
                    $scope.progressPer = e.loaded / e.total * 100;
                    $scope.progressInfo = '上传中';
                }
            }
        }).then(function success(response) {
            $scope.progressInfo = response.data.info;
        }, function error(response) {
            alert('出现错误\n' + response.status + ' ' + response.statusText);
        });
    }
    //控制表格内容
    // $scope.examineesInfo = response.data;
    $scope.examineesInfo = [{
        'name': '小宋',
        'gender': '男',
        'id': '87798',
        'picture': '1.jpg',
        'subject': '政治',
        'subjectNum': 'de'

    }, {
            'name': '小李',
            'gender': '男',
            'id': '5687687',
            'picture': '2.jpg',
            'subject': '地理',
            'subjectNum': 'e3'

        }]

    $scope.examineeMetaInfo = {
        'name': '姓名',
        'gender': '性别',
        'id': '证件号',
        'picture': '照片',
        'subject': '科目',
        'subjectNum': '科目编号'

    }


    $scope.orderCondition = 'name';
    $scope.isReverse = false;

    // 排序变量
    $scope.thClick = function (value) {
        $scope.orderCondition = value;
        $scope.isReverse = !$scope.isReverse;
    }
    // 刷新
    $scope.refresh = function () {
        refresh();
    };
    //每间隔30s自动刷新
    var timingPromise = undefined;
    // timingPromise = $interval(function () { refresh() }, 30000);

    function refresh() {

        $http({
            method: 'GET',
            url: '/MS/paper/stuTable',
            params: {
                token: $window.sessionStorage.token
            }
        })
            .then(
            function success(response) {
                $scope.examineesInfo = response.data;
                $scope.orderCondition = 'id';
                $scope.isReverse = false;
                // $scope.cancelAll();
            },
            function error(response) {
                alert('刷新出错\n' + response.status
                    + ' ' + response.statusText);
            });
    }

});
examManage.controller('stuInputCtrl', function ($scope, $http, $rootScope, $window, roomManage) {

    // $scope.$watch("roomManage.ipAdd", function (newVal, oldVal) {
    //     if (newVal !== oldVal) {
    //  alert("ahha"+roomManage.roomName);

    //     $scope.roomName = roomManage.roomName;
    //     $scope.seatName = roomManage.seatName;
    //     $scope.ipAdd = roomManage.ipAdd;
    // }

    // }, true);
    //上传考生照片
    $scope.progressPer = 0;
    $scope.ngshow = false;
    $scope.selectFile = function () {

        $scope.$apply(function () {
            $scope.selectedFile = event.target.files[0];
            $rootScope.stuPicture = $scope.selectedFile.name;
        })
    }

    $scope.upload = function () {
        $scope.ngshow = true;
        var formData = new FormData();
        formData.append("file", $scope.selectedFile);
        formData.append("token", $window.sessionStorage.stoken);
        if ($scope.selectedFile == undefined) {
            return;
        }
        $scope.progressPer = 0;
        $http({
            method: 'POST',
            url: '/MS/paper/stuPicture',
            data: formData,
            headers: {
                'Content-Type': undefined,
            },
            uploadEventHandlers: {
                progress: function (e) {
                    $scope.progressPer = e.loaded / e.total * 100;
                    $scope.progressInfo = '上传中';
                }
            }
        }).then(function success(response) {
            $scope.progressInfo = response.data.info;
        }, function error(response) {
            alert('出现错误\n' + response.status + ' ' + response.statusText);
        });
    }
    $scope.delete = function () {
        $rootScope.stuName = '';
        $rootScope.stuGender = '';
        $rootScope.stuId = '';
        $rootScope.stuSubject = '';
        $rootScope.stuSubNum = '';
        $rootScope.stuPicture = '';
    }
    $scope.save = function () {
        // alert($scope.roomName + $scope.seatName);
        alert('保存成功!');
        $http({
            method: 'GET',
            url: '/MS/paper/stuArrange',
            params: {
                stuName: $rootScope.stuName,
                stuGender: $rootScope.stuGender,
                stuId: $rootScope.stuId,
                stuSubject: $rootScope.stuSubject,
                stuSubNum: $rootScope.stuSubNum,
                stuPicture: $rootScope.stuPicture
            }
        })
            .then(
            function success(response) {
                alert("保存成功！");
                // $scope.cancelAll();
            },
            function error(response) {
                // alert('保存出错\n' + response.status
                //     + ' ' + response.statusText);
            });



    }


});
examManage.factory('roomManage', function () {
    return {
        roomName: '',
        seatName: '',
        ipAdd: ''

    };
})
examManage.controller('roomImportCtrl', function ($scope, $http, $rootScope, $window, roomManage) {
    //编辑
    $scope.edit = function (roomNum, seatNum, ip) {
        // roomManage.roomName = roomNum;
        // roomManage.seatName = seatNum;
        // roomManage.ipAdd = ip;
        $scope.sel(1);

        $rootScope.roomName = roomNum;
        $rootScope.seatName = seatNum;
        $rootScope.ipAdd = ip;
        // alert(roomManage.seatName);

    }

    //控制导入文件
    $scope.progressPer = 0;
    $scope.ngshow = false;
    $scope.selectFile = function () {

        $scope.$apply(function () {
            $scope.selectedFile = event.target.files[0];
        })
    }

    $scope.upload = function () {
        $scope.ngshow = true;
        var formData = new FormData();
        formData.append("file", $scope.selectedFile);
        if ($scope.selectedFile == undefined) {
            return;
        }
        $scope.progressPer = 0;
        $http({
            method: 'POST',
            url: 'MS/paper/roomForm',
            data: formData,
            headers: {
                'Content-Type': undefined,
            },
            uploadEventHandlers: {
                progress: function (e) {
                    $scope.progressPer = e.loaded / e.total * 100;
                    $scope.progressInfo = '上传中';
                }
            }
        }).then(function success(response) {
            $scope.progressInfo = response.data.info;
        }, function error(response) {
            alert('出现错误\n' + response.status + ' ' + response.statusText);
        });
    }
    //控制表格内容
    // $scope.examineesInfo = response.data;
    $scope.examineesInfo = [{
        'roomNum': '东中院3-213',
        'seatNum': '7',
        'ip': '192.168.3.234'

    }, {
            'roomNum': '东中院1-311',
            'seatNum': '5',
            'ip': '192.168.0.343'

        }]

    $scope.examineeMetaInfo = {
        'roomNum': '考场名',
        'seatNum': '座位号',
        'ip': 'IP'

    }


    $scope.orderCondition = 'roomNum';
    $scope.isReverse = false;

    // 排序变量
    $scope.thClick = function (value) {
        $scope.orderCondition = value;
        $scope.isReverse = !$scope.isReverse;
    }
    // 刷新
    $scope.refresh = function () {
        refresh();
    };
    //每间隔30s自动刷新
    var timingPromise = undefined;
    // timingPromise = $interval(function () { refresh() }, 30000);

    function refresh() {

        $http({
            method: 'GET',
            url: '/MS/paper/roomTable',
            params: {
                token: $window.sessionStorage.token
            }
        })
            .then(
            function success(response) {
                $scope.examineesInfo = response.data;
                $scope.orderCondition = 'id';
                $scope.isReverse = false;
                // $scope.cancelAll();
            },
            function error(response) {
                alert('刷新出错\n' + response.status
                    + ' ' + response.statusText);
            });
    }

});
examManage.controller('roomIputCtrl', function ($scope, $http, $rootScope, $window, roomManage) {

    // $scope.$watch("roomManage.ipAdd", function (newVal, oldVal) {
    //     if (newVal !== oldVal) {
    //  alert("ahha"+roomManage.roomName);

    //     $scope.roomName = roomManage.roomName;
    //     $scope.seatName = roomManage.seatName;
    //     $scope.ipAdd = roomManage.ipAdd;
    // }

    // }, true);
    $scope.delete = function () {
        $rootScope.roomName = '';
        $rootScope.seatName = '';
        $rootScope.ipAdd = '';
    }
    $scope.save = function () {
        // alert($scope.roomName + $scope.seatName);
        alert("保存成功！");
        $http({
            method: 'GET',
            url: '/MS/paper/roomArrange',
            params: {
                room: $rootScope.roomName,
                seat: $rootScope.seatName,
                ipAdd: $rootScope.ipAdd
            }
        })
            .then(
            function success(response) {
                alert("保存成功！");
                // $scope.cancelAll();
            },
            function error(response) {
                // alert('保存出错\n' + response.status
                //     + ' ' + response.statusText);
            });



    }


});

examManage.controller('stuExamCtrl', function ($scope, $http, $window) {
    //控制试卷号的显示
    $scope.examNumShow = "none";
    //控制表格内容
    // $scope.examineesInfo = response.data;


    $scope.examineeMetaInfo = {
        'name': '姓名',
        'id': '证件号',
        'major': "专业名称",
        'subject': '科目名称'

    }


    $scope.orderCondition = 'name';
    $scope.isReverse = false;

    //控制表格内容
    $scope.selectionStatus = [];
    // 全选
    $scope.selectAll = function () {
        for (x in $scope.examineesInfo) {
            $scope.selectionStatus[$scope.examineesInfo[x].id] = true;
        }
    }

    // 取消选择
    $scope.cancelAll = function () {
        for (x in $scope.examineesInfo) {
            $scope.selectionStatus[$scope.examineesInfo[x].id] = false;
        }
    }
    // 排序变量
    $scope.thClick = function (value) {
        $scope.orderCondition = value;
        $scope.isReverse = !$scope.isReverse;
    }

    //选择相应专业科目

    var SubMap = {
        "计算机": ["政治", "英语", "数学"],

        "新闻传播": ["语文", "英语", "数学"],

        "美术专业": ["美术", "英语", "数学"],
    };

    $scope.sumSub1 = [{
        "subName1": "计算机"
    }, {
            "subName1": "新闻传播"
        }, {
            "subName1": "美术专业"
        }];
    $scope.$watch("selectedSub1", function (newValue, oldValue, scope) {
        $scope.sumSub = SubMap[$scope.selectedSub1];
    });

    $scope.selectExam = function (selection, examNum) {
        var uidList = [];
        for (x in selection) {

            if (selection[x]) {
                uidList.push(x);
            }
        }
        $http({
            method: 'GET',
            url: '/MS/paper/stuExamArrange',
            params: {
                uidList: uidList,
                examNum: examNum
            }
        })
            .then(
            function success(response) {
                alert("保存成功");
            },
            function error(response) {
                alert('刷新出错\n' + response.status
                    + ' ' + response.statusText);
            });

    }


    $scope.selectSubject = function (major, subject) {
        // refresh(major,subject); 
        $scope.examNumShow = " ";
        switch (subject) {
            case '政治':
                $scope.subNumlists = ["a1", "a2"];
                $scope.examineesInfo = [{
                    'name': '李煜',
                    'id': '678689',
                    'subject': '政治',
                    'major': "计算机"

                }, {
                        'name': '李静',
                        'id': '67869',
                        'subject': '政治',
                        'major': "计算机"

                    }]
                break;
            case '英语':
                $scope.subNumlists = ["n1", "n2"];
                $scope.examineesInfo = [{
                    'name': '李煜',
                    'id': '67869',
                    'subject': '英语',
                    'major': "专业名称"

                }, {
                        'name': '李静',
                        'id': '67889',
                        'subject': '英语',
                        'major': "专业名称"

                    }]
                break;
            case '数学':
                $scope.subNumlists = ["c1", "c2"];
                $scope.examineesInfo = [{
                    'name': '李煜',
                    'id': '678689',
                    'subject': '英语',
                    'major': "专业名称"

                }, {
                        'name': '李静',
                        'id': '67689',
                        'subject': '英语',
                        'major': "专业名称"

                    }]
                break;

        }
    }
    // 刷新
    $scope.refresh = function () {
        refresh();
    };
    //每间隔30s自动刷新
    var timingPromise = undefined;
    // timingPromise = $interval(function () { refresh() }, 30000);

    function refresh() {

        $http({
            method: 'GET',
            url: '/MS/paper/stuExamTable',
            params: {
                major: $scope.selectedSub1,
                subject: $scope.selectedSub
            }
        })
            .then(
            function success(response) {
                $scope.subNumlists = response.data;
                $scope.examineesInfo = response.data;
                $scope.examNumShow = "block";
                $scope.orderCondition = 'id';
                $scope.isReverse = false;
                // $scope.cancelAll();
            },
            function error(response) {
                alert('刷新出错\n' + response.status
                    + ' ' + response.statusText);
            });

    }


});
examManage.controller('stuRoomCtrl', function ($scope, $http, $window) {
   
    $scope.popOpen=false;
    $scope.popColse=function(){
        $scope.popOpen=false;
    }

    //时间选择器
    // 开始时间
    $scope.myDay = new Date();
    $scope.myTime = new Date();
    $scope.myDayTime = new Date();

    $scope.changed = function () {
        // $scope.poop = false;
        $scope.myDayTime.setTime($scope.myDay.getTime());
        $scope.myDayTime.setHours($scope.myTime.getHours());
        $scope.myDayTime.setMinutes($scope.myTime.getMinutes());
        $scope.myDayTime.setSeconds($scope.myTime.getSeconds());
        // console.log($scope.myDayTime.getTime());
        var month = $scope.myDayTime.getMonth() + 1;
        $scope.startSelected = $scope.myDayTime.getFullYear() + "年" + month + "月" + $scope.myDayTime.getDate() + "日" + $scope.myDayTime.getHours() + "时" + $scope.myDayTime.getMinutes() + "分" + $scope.myDayTime.getSeconds() + "秒";
    }


    //控制表格内容
    $scope.selectionStatus = [];
    // 全选
    $scope.selectAll = function () {
        for (x in $scope.examineesInfo) {
            $scope.selectionStatus[$scope.examineesInfo[x].id] = true;
        }
    }

    // 取消选择
    $scope.cancelAll = function () {
        for (x in $scope.examineesInfo) {
            $scope.selectionStatus[$scope.examineesInfo[x].id] = false;
        }
    }

    // $scope.examineesInfo = response.data;

    $scope.examineesInfo = [{
        'name': '李煜',
        'id': '678689',
        'subject': '政治',
        'major': "计算机"

    }, {
            'name': '李静',
            'id': '6789',
            'subject': '政治',
            'major': "计算机"

        }, {
            'name': '于一',
            'id': '678349',
            'subject': '政治',
            'major': "计算机"

        }]
    $scope.examineeMetaInfo = {
        'name': '姓名',
        'id': '证件号',
        'major': '专业名称',
        'subject': '科目名称'

    }


    $scope.orderCondition = 'name';
    $scope.isReverse = false;

    // 排序变量
    $scope.thClick = function (value) {
        $scope.orderCondition = value;
        $scope.isReverse = !$scope.isReverse;
    }

    //选择相应考场
    $scope.sumSub = [{
        "subName": "东中院1-101"
    }, {
            "subName": "东中院1-103"
        }, {
            "subName": "东中院1-104"
        }];
    $scope.selectSubject = function (selectedSub) {
        //获得考生id，证件号 
        var uidList = [];
        for (x in $scope.selectionStatus) {

            if ($scope.selectionStatus[x]) {
                uidList.push(x);
            }
        }
        //  alert(uidList);
        //获得考场名
        // alert(selectedSub.subName);

        $http({
            method: 'GET',
            url: '/MS/paper/stuRoom',
            params: {
                startTime: $scope.myDayTime.getTime(),
                duration: $scope.duration,
                uidLists: uidList,
                room: selectedSub
            }
        })
            .then(
            function success(response) {
                alert("保存成功！");
                refresh();
            },
            function error(response) {
                alert('刷新出错\n' + response.status
                    + ' ' + response.statusText);
            });

    }
    // 刷新
    $scope.refresh = function () {
        refresh();
    };
    //每间隔30s自动刷新
    var timingPromise = undefined;
    // timingPromise = $interval(function () { refresh() }, 30000);

    function refresh() {

        $http({
            method: 'GET',
            url: '/MS/paper/stuRoomTable',
            params: {

            }
        })
            .then(
            function success(response) {
                $scope.examineesInfo = response.data;
                $scope.orderCondition = 'id';
                $scope.isReverse = false;
                // $scope.cancelAll();
            },
            function error(response) {
                alert('刷新出错\n' + response.status
                    + ' ' + response.statusText);
            });
    }


});
examManage.controller('examArrangeCtrl', function ($scope, $http, $window) {

    $scope.sumExport = function () {
        var uidList = [];
        for (x in $scope.selectionStatus) {

            if ($scope.selectionStatus[x]) {
                uidList.push(x);
            }
        }
        alert(uidList);
        window.open("/MS/paper/sumDownload?token=" + $window.sessionStorage.stoken);
    };
    $scope.stuExport = function () {
        var uidList = [];
        for (x in $scope.selectionStatus) {

            if ($scope.selectionStatus[x]) {
                uidList.push(x);
            }
        }
        window.open("/MS/paper/stuDownload?token=" + $window.sessionStorage.stoken);
    }
    //初始化表格
    $scope.roomMetaInfo = {
        'id': '场次',
        'time': '时间'
    };
    $scope.selectionStatus = {};
    // 全选
    $scope.selectAll = function () {
        for (x in $scope.exportByRoom) {
            $scope.selectionStatus[$scope.exportByRoom[x]] = true;
        }
    }

    // 取消选择
    $scope.cancelAll = function () {
        for (x in $scope.exportByRoom) {
            $scope.selectionStatus[$scope.exportByRoom[x]] = false;
        }
    }

    // 单独选择
    $scope.checkSel = function (status, roomId) {
        $scope.cancelAll();
        $scope.selectionStatus[roomId] = true;
    }

    // 排序变量
    $scope.thClick = function (value) {
        $scope.orderCondition = value;
        $scope.isReverse = !$scope.isReverse;
    }
    // 刷新
    $scope.refresh = function () {
        refresh();
    };
    //每间隔30s自动刷新
    var timingPromise = undefined;
    // timingPromise = $interval(function () { refresh() }, 30000);

    function refresh() {
        $http.get('/EMS/paper/roomLists', {
            // $http.get('info.json', {
            params: {
                // token: $window.sessionStorage.token
            }
        }).then(function successCallback(response) {
            $scope.exportByRoom = response.data;
            $scope.orderCondition = 'id';
            $scope.isReverse = false;
        }, function errorCallback(response) { })

    }




});
examManage.controller('singleCtrl', function ($scope, $rootScope, $http, $window) {
    $scope.itemMessage = ['', '', '', ''];
    $scope.rightAnswer = [];

    $scope.save = function () {

        var choice = {};
        for (x in $scope.itemMessage) {
            choice[x * 1 + 1] = $scope.itemMessage[x];
        }
        // console.log(choice);
        // console.log($scope.rightAnswer);
        $http({
            method: 'GET',
            url: '/EMS/admin/addTopic',
            params: {
                token: $window.sessionStorage.stoken,
                typeId: 0,
                content: $scope.content,
                choice: choice,
                List: $scope.rightAnswer

            }
        }).then(function success(response) {
            alert("保存成功！");
        })

    }
    $scope.delete = function () {
        $scope.itemMessage = ['', '', '', ''];
        $scope.rightAnswer = [];
        $scope.content = [];

    }
    $scope.singleReturn = function () {
        $rootScope.exInput = 'tpls/examManage/tab/typeChoice.html';

    }
    $scope.singleFinish = function () {
        $rootScope.exInput = 'tpls/examManage/tab/subjectImport.html';

    }


});
examManage.controller('judgeCtrl', function ($scope, $rootScope, $http, $window) {
    $scope.itemMessage = ['', ''];
    $scope.rightAnswer = [];

    $scope.save = function () {

        var choice = {};
        for (x in $scope.itemMessage) {
            choice[x * 1 + 1] = $scope.itemMessage[x];
        }
        $http({
            method: 'GET',
            url: '/EMS/admin/addTopic',
            params: {
                token: $window.sessionStorage.stoken,
                typeId: 2,
                content: $scope.content,
                choice: choice,
                List: $scope.rightAnswer

            }
        }).then(function success(response) {
            alert("保存成功！");
        })

    }
    $scope.delete = function () {
        $scope.itemMessage = ['', ''];
        $scope.rightAnswer = [];
        $scope.content = [];

    }

    $scope.singleReturn = function () {
        $rootScope.exInput = 'tpls/examManage/tab/typeChoice.html';

    }
    $scope.singleFinish = function () {
        $rootScope.exInput = 'tpls/examManage/tab/subjectImport.html';

    }

});
examManage.controller('multipleCtrl', function ($scope, $rootScope, $http, $window) {
    $scope.right = [];
    $scope.itemMessage = ['', '', '', ''];
    var List = [];
    $scope.save = function () {

        var choice = {};
        for (x in $scope.itemMessage) {
            choice[x] = $scope.itemMessage[x];
            if ($scope.right[x]) {
                List.push(x);
            }

        }

        $http({
            method: 'GET',
            url: '/EMS/admin/addTopic',
            params: {
                token: $window.sessionStorage.stoken,
                typeId: 1,
                content: $scope.content,
                choice: choice,
                List: List

            }
        }).then(function success(response) {
            alert("保存成功！");
        })

    }
    $scope.delete = function () {
        $scope.itemMessage = ['', '', '', ''];
        $scope.right = [];
        $scope.content = [];

    }

    $scope.singleReturn = function () {
        $rootScope.exInput = 'tpls/examManage/tab/typeChoice.html';

    }
    $scope.singleFinish = function () {
        $rootScope.exInput = 'tpls/examManage/tab/subjectImport.html';

    }

});

examManage.controller('mpCtrl', function ($scope, $http, $rootScope, $window) {
    $scope.itemMessage = ['', ''];
    $scope.answerMessage = ['', ''];
    var choice = {};
    $scope.save = function () {
        for (x in $scope.itemMessage) {
            choice[x] = $scope.answerMessage[x];
        }

        $http({
            method: 'GET',
            url: '/EMS/admin/addTopic',
            params: {
                token: $window.sessionStorage.stoken,
                typeId: 3,
                content: $scope.content,
                item: $scope.itemMessage,
                List: $scope.answerMessage,
                choice: choice

            }
        }).then(function success(response) {
            alert("保存成功！");
        })

    }
    $scope.delete = function () {
        $scope.itemMessage = ['', ''];
        $scope.answerMessage = ['', ''];
        $scope.content = [];

    }
    $scope.singleReturn = function () {
        $rootScope.exInput = 'tpls/examManage/tab/typeChoice.html';

    }
    $scope.singleFinish = function () {
        $rootScope.exInput = 'tpls/examManage/tab/subjectImport.html';

    }
});

examManage.controller('simpleCtrl', function ($scope, $http, $rootScope, $window) {

    $scope.save = function () {
        $http({
            method: 'GET',
            url: '/EMS/admin/addTopic',
            params: {
                token: $window.sessionStorage.stoken,
                typeId: 4,
                content: $scope.content

            }
        }).then(function success(response) {
            alert("保存成功！");
        })

    }
    $scope.delete = function () {
        $scope.content = [];

    }
    $scope.singleReturn = function () {
        $rootScope.exInput = 'tpls/examManage/tab/typeChoice.html';

    }
    $scope.singleFinish = function () {
        $rootScope.exInput = 'tpls/examManage/tab/subjectImport.html';

    }
});
examManage.controller('fillBlankCtrl', function ($scope, $http, $rootScope, $window) {

    $scope.save = function () {
        $http({
            method: 'GET',
            url: '/EMS/admin/addTopic',
            params: {
                token: $window.sessionStorage.stoken,
                typeId: 4,
                content: $scope.content

            }
        }).then(function success(response) {
            alert("保存成功！");
        })

    }
    $scope.delete = function () {
        $scope.content = [];

    }
    $scope.singleReturn = function () {
        $rootScope.exInput = 'tpls/examManage/tab/typeChoice.html';

    }
    $scope.singleFinish = function () {
        $rootScope.exInput = 'tpls/examManage/tab/subjectImport.html';

    }
});
examManage.controller('machineCtrl', function ($scope, $http, $rootScope, $window) {

    $scope.save = function () {
        $http({
            method: 'GET',
            url: '/EMS/admin/addTopic',
            params: {
                token: $window.sessionStorage.stoken,
                typeId: 4,
                content: $scope.content

            }
        }).then(function success(response) {
            alert("保存成功！");
        })

    }
    $scope.delete = function () {
        $scope.content = [];

    }
    $scope.singleReturn = function () {
        $rootScope.exInput = 'tpls/examManage/tab/typeChoice.html';

    }
    $scope.singleFinish = function () {
        $rootScope.exInput = 'tpls/examManage/tab/subjectImport.html';

    }
});
examManage.controller('subjectCtrl', function ($scope, $rootScope, $http, $window) {

    if ($rootScope.subjectContrl) {
        $rootScope.subjectContrl = false;
        var subjectStatus = JSON.parse($window.sessionStorage.subjectStatus);
        $scope.majorName = subjectStatus.majorName;
        $scope.name = subjectStatus.name;
        $scope.majorNum = subjectStatus.majorNum;
        $scope.nameNum = subjectStatus.nameNum;
        $scope.examNumber = subjectStatus.examNumber;
        $scope.duration = subjectStatus.duration;
        $scope.earliestSubmit = subjectStatus.earliestSubmit;
        $scope.latestLogin = subjectStatus.latestLogin;
        $scope.scoreShow = subjectStatus.scoreShow;
        if (subjectStatus.singleCheckbox) {
            $scope.singleScore = subjectStatus.singleScore;
            $scope.singleCheckbox = true;
        }
        if (subjectStatus.multipleCheckbox) {
            $scope.multiScore = subjectStatus.multiScore;
            $scope.multifulScore = subjectStatus.multifulScore;
            $scope.multipleCheckbox = true;
        }
        if (subjectStatus.judgeCheckbox) {

            $scope.judgeScore = subjectStatus.judgeScore;
            $scope.judgeCheckbox = true;
        }
        if (subjectStatus.matchCheckbox) {

            $scope.matchScore = subjectStatus.matchScore;
            $scope.matchCheckbox = true;
        }
        if (subjectStatus.simpleCheckbox) {
            $scope.simpleScore = subjectStatus.simpleScore;
            $scope.simpleCheckbox = true;
        }
        if (subjectStatus.fillBlankCheckbox) {
            $scope.fillBlankScore = subjectStatus.fillBlankScore;
            $scope.fillBlankCheckbox = true;
        }
        if (subjectStatus.machineCheckbox) {

            $scope.machineScore = subjectStatus.machineScore;
            $scope.machineCheckbox = true;
        }
    }


    $scope.save = function () {
        alert($scope.singleCheckbox);
        var typePoints = {};
        if ($scope.singleCheckbox) {
            typePoints[0] = $scope.singleScore;
        }
        if ($scope.multipleCheckbox) {
            typePoints[1] = $scope.multiScore + ',' + $scope.multifulScore;
        }
        if ($scope.judgeCheckbox) {
            typePoints[2] = $scope.judgeScore;
        }
        if ($scope.matchCheckbox) {
            typePoints[3] = $scope.matchScore;
        }
        if ($scope.simpleCheckbox) {
            typePoints[4] = $scope.simpleScore;
        }
        if ($scope.fillBlankCheckbox) {
            // subjectStatus.fillBlankCheckbox = true;
            typePoints[5] = $scope.fillBlankScore;
        }
        if ($scope.machineCheckbox) {

            typePoints[6] = $scope.machineScore;
        }

        var subjectStatus = JSON.parse($window.sessionStorage.subjectStatus);
        subjectStatus.majorNum = $scope.majorNum;
        subjectStatus.name = $scope.name;
        subjectStatus.majorName = $scope.majorName;
        subjectStatus.nameNum = $scope.nameNum;
        subjectStatus.examNumber = $scope.examNumber;
        subjectStatus.duration = $scope.duration;
        subjectStatus.earliestSubmit = $scope.earliestSubmit;
        subjectStatus.latestLogin = $scope.latestLogin;
        subjectStatus.scoreShow = $scope.scoreShow;
        if ($scope.singleCheckbox) {
            subjectStatus.singleCheckbox = true;
            subjectStatus.singleScore = $scope.singleScore;
        } else {
            subjectStatus.singleCheckbox = false;
        }
        if ($scope.multipleCheckbox) {
            subjectStatus.multipleCheckbox = true;
            subjectStatus.multiScore = $scope.multiScore;
            subjectStatus.multifulScore = $scope.multifulScore;
        } else {
            subjectStatus.multipleCheckbox = false;
        }
        if ($scope.judgeCheckbox) {
            subjectStatus.judgeCheckbox = true;
            subjectStatus.judgeScore = $scope.judgeScore;
        } else {
            subjectStatus.judgeCheckbox = false;
        }
        if ($scope.matchCheckbox) {
            subjectStatus.matchCheckbox = true;
            subjectStatus.matchScore = $scope.matchScore;
        } else {
            subjectStatus.matchCheckbox = false;
        }
        if ($scope.simpleCheckbox) {
            subjectStatus.simpleCheckbox = true;
            subjectStatus.simpleScore = $scope.simpleScore;
        } else {
            subjectStatus.simpleCheckbox = false;
        }
        if ($scope.fillBlankCheckbox) {
            subjectStatus.fillBlankCheckbox = true;
            subjectStatus.fillBlankScore = $scope.fillBlankScore;
        } else {
            subjectStatus.fillBlankCheckbox = false;
        }
        if ($scope.machineCheckbox) {
            subjectStatus.machineCheckbox = true;
            subjectStatus.machineScore = $scope.machineScore;
        } else {
            subjectStatus.machineCheckbox = false;
        }
        $window.sessionStorage.subjectStatus = JSON.stringify(subjectStatus);

        $http({
            method: 'GET',
            url: '/MS/paper/paperInput',
            params: {
                // token: $window.sessionStorage.token,
                proName: $scope.majorName,
                proId: $scope.majorNum,
                subName: $scope.name,
                subId: $scope.nameNum,
                paperNum: $scope.examNum,
                duration: $scope.duration,
                earliestSubmit: $scope.earliestSubmit,
                latestLogin: $scope.latestLogin,
                showMark: $scope.scoreShow,
                map: typePoints

            }
        }).then(function success(response) {
            alert("保存成功！");
        })

    }
    $scope.delete = function () {
        $scope.name = [];
        $scope.duration = [];
        $scope.earliestSubmit = [];
        $scope.latestLogin = [];
        $scope.singleCheckbox = false;
        $scope.singleScore = [];
        $scope.multipleCheckbox = false;
        $scope.multifulScore = [];
        $scope.multiScore = [];
        $scope.judgeCheckbox = false;
        $scope.judgeScore = [];
        $scope.matchCheckbox = false;
        $scope.matchScore = [];
        $scope.simpleCheckbox = false;
        $scope.simpleScore = [];

    }
    $scope.startType = function () {

        $rootScope.exInput = 'tpls/examManage/tab/typeChoice.html';
    }
});
examManage.controller('typeCtrl', function ($scope, $rootScope, $http, $window) {
    // $scope.typeLists = ["单选题", "多选题", "判断题", "匹配题", "简答题", '填空题', '上机题'];
    var Lists = [];
    var subjectStatus = JSON.parse($window.sessionStorage.subjectStatus);
    if (subjectStatus.singleCheckbox) {
        Lists.push("单选题");
    }
    if (subjectStatus.multipleCheckbox) {
        Lists.push("多选题");
    }
    if (subjectStatus.judgeCheckbox) {

        Lists.push("判断题");
    }
    if (subjectStatus.matchCheckbox) {

        Lists.push("匹配题");
    }
    if (subjectStatus.simpleCheckbox) {
        Lists.push("简答题");
    }
    if (subjectStatus.fillBlankCheckbox) {
        Lists.push("填空题");
    }
    if (subjectStatus.machineCheckbox) {
        Lists.push("上机题");
    }
    $scope.typeLists = Lists;
    $scope.typeSelected = {};
    $scope.typeConfirm = function (type) {
        // alert(type);
        switch (type) {
            case "单选题":
                $rootScope.exInput = 'tpls/examManage/tab/singleImport.html';
                break;
            case "多选题":
                $rootScope.exInput = 'tpls/examManage/tab/multipleImport.html';
                break;
            case "判断题":
                $rootScope.exInput = 'tpls/examManage/tab/judgeImport.html';
                break;
            case "匹配题":
                $rootScope.exInput = 'tpls/examManage/tab/matchImport.html';
                break;
            case "简答题":
                $rootScope.exInput = 'tpls/examManage/tab/simpleImport.html';
                break;
            case "填空题":
                $rootScope.exInput = 'tpls/examManage/tab/fillBlank.html';
                break;
            case "上机题":
                $rootScope.exInput = 'tpls/examManage/tab/machine.html';
                break;

        }

    }
    $scope.singleReturn = function () {
        $rootScope.subjectContrl = true;
        $rootScope.exInput = 'tpls/examManage/tab/subjectImport.html';

    }

});