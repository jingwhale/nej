var f = function(){
    var _  = NEJ.P,
        _e = _('nej.e'),
        _tu = _('t.u'),
        _p = _('nej.ui');
     
    var _input = _e._$get('input');
    var onChange = (function(){
        var _sufix = ['@163.com','@126.com','@188.com','@vip.163.com','@vip.126.com','@yeah.net'];
        return function(_value){
            var _arr = [];
            nej.u._$forEach(_sufix,function(_name){
                if(_value.indexOf('@')==-1)
                    _arr.push('<div class="itm">'+_value+_name+'</div>');
                else{
                    
                    var tmp = _value.substring(0,_value.indexOf('@'));
                    var subfix = _value.substring(_value.indexOf('@'));
                    if(subfix==_name)
                        _arr.push('<div class="itm js-selected">'+tmp+_name+'</div>');
                    else
                        _arr.push('<div class="itm">'+tmp+_name+'</div>');
                }
            });
            _suggest._$setList(_arr.join(''));
        }
    })()
    //参数的选择详见tab.js
    var _suggest = _p._$$Suggest._$allocate({
                    parent: _input.parentNode,
                    clazz: 'm-sug',
                    input: _input,
                    onchange: onChange,
                    onselect: onSelect
                });
    
    function onSelect(_value){
        _input.value = _value;
    }
}
define(['{lib}ui/suggest/suggest.js'],f);