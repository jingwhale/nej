var f=function(){
    var _ = NEJ.P,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _j = _('nej.j'),
        _u = _('nej.u'),
        _ui= _('nej.ui'),
        _p = _('nej.ut');
    
    //获取input节点
    var _input=_e._$get('input');
    //给input节点添加事件
    _v._$addEvent(_input,'click',onInputClick);
    function onInputClick(_event){
        _v._$stop(_event);//因为日历控件是卡片，在document上接收到click 事件都会回调到卡片，所以阻止掉事件
        var _datepick = _ui._$$DatePick._$allocate({
                    parent: _input.parentNode,
                    clazz: 'm-dt',
                    onchange: onChange
                }); 
    }
    //选中时回调，把值设到input中
    function onChange(_value){
        _input.value = _u._$format(_value,'yyyy-MM-dd');
    }
};

define(['{lib}ui/datepick/datepick.js'],f);