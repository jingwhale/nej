var f=function(){
    var _ = NEJ.P,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _j = _('nej.j');
    //上次显示最后一条序号
    var _lastIndex=0;
    //ajax回调函数
    var _cbShowAjaxData=function(_data){
        var _cnt=_e._$get('cnt');
        _cnt.innerHTML='';
        var _len=_data.length;
        for(var i=(_lastIndex>=_len?(_lastIndex=0):_lastIndex),l=(i+5<_len?i+5:_len);i<l;i++){
            var _tempP=_e._$create("p",null,_cnt);
            _tempP.innerHTML="title:"+_data[i].title+"<br/>"+_data[i].shortPublishDateStr
                +" "+_data[i].publishTimeStr+" 访问"+_data[i].accessCount+" 评论"+_data[i].commentCount;
        }
        _lastIndex+=5;
    };
    //bntClick响应函数
    var _onBntClick=function(event){
        //ajax请求数据
        _j._$request("http://nej.netease.com/api/getFriendsLatestBlogs",{
            sync:false,
            type:"json",
            data:null,
            query:"userid=126770605",
            method:"GET",
            onload:_cbShowAjaxData
        });
    };
    //添加事件
    _v._$addEvent(_e._$get('bnt'),'click',_onBntClick._$bind(this));
};
define(['{lib}util/ajax/xdr.js'],f);
