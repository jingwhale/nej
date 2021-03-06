/*
 * ------------------------------------------
 * 多选控件带范围选择实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    var o = NEJ.O,
        f = NEJ.F,
        e = NEJ.P('nej.e'),
        u = NEJ.P('nej.u'),
        p = NEJ.P('nej.ut'),
        __proRangeSelector,
        __supRangeSelector;
    if (!!p._$$RangeSelector) return;
    /**
     * 多选控件带范围选择<br />
     * 页面结构举例
     * [code type="html"]
     * 
     *    <body onselectstart="return false;">
     *      <div id="box"></div>
     *      <div id="box2"></div>
     *    </body>
     * [/code]
     * 脚本举例
     * [code]
     *   var _  = NEJ.P,
     *   _e = _('nej.e'),
     *   _v = _('nej.v'),
     *   _p = _('nej.ut');
     *   
     *   var _html_seed = _e._$addHtmlTemplate('{list 1..31 as x}\
     *       <div class="item">${x}</div>\
     *   {/list}');
     *   
     *   var _box  = _e._$get('box');
     *   _box.innerHTML = _e._$getHtmlTemplate(_html_seed);
     *   var _box2 = _e._$get('box2');
     *   // 先实例化一个范围选择器
     *   var _range = _p._$$Range._$allocate({
     *       body:_box2,
     *       onchange:function(_event){
     *       },
     *       onbeforechange:function(_event){
     *       },
     *       onafterchange:function(_event){
     *       }
     *   });
     *   // 能被选中的节点，是parent节点下，所有样式为item的节点
     *   // 上面的范围选择器可以不传onchange，这个事件下面会处理，鼠标移动时触发
     *   // 监听范围选择器的的onchange事件，在事件里断节点是否在范围内，加上select的样式
     *   _p._$$RangeSelector._$allocate({
     *       parent:box,
     *       range:_range,
     *       item:'item',
     *       select:'select',
     *       onchange:function(_event){
     *           // 鼠标down，开始选择的回调
     *       }
     *   });
     * [/code]
     * @class   {nej.ut._$$RangeSelector} 多选控件带范围选择
     * @extends {nej.ut._$$MultiSelector}
     * @param   {Object} 可选配置参数，已处理参数列表如下所示
     * @config  {nej.ut._$$Range|nej.ui._$$Range} range 范围选择器实例
     */
    p._$$RangeSelector = NEJ.C();
    __proRangeSelector = p._$$RangeSelector._$extend(p._$$MultiSelector);
    __supRangeSelector = p._$$RangeSelector._$supro;
    /**
     * 控件重置
     * @protected
     * @method {__reset}
     * @param  {Object} 可选配置参数
     * @return {Void}
     */
    __proRangeSelector.__reset = function(_options){
        this.__supReset(_options);
        this.__range = _options.range;
        if (!this.__range) return;
        this.__range._$setEvent('onchange',
             this.__onRangeChange._$bind(this));
        this.__range._$setEvent('onafterchange',
             this.__onAfterRangeChange._$bind(this));
        this.__doRefreshListPosition();
    };
    /**
     * 控件销毁
     * @protected
     * @method {__destroy}
     * @return {Void}
     */
    __proRangeSelector.__destroy = (function(){
        var _clear = function(_item){
            u._$safeDelete(_item,['box','last']);
        };
        return function(){
            u._$forEach(this.__list,_clear);
            this.__supDestroy();
            this.__range._$setEvent('onchange',f);
            delete this.__range;
        };
    })();
    /**
     * 判断两个位置是否存在交集
     * @protected
     * @method {__hasInterSection}
     * @param  {Object}  位置
     * @param  {Object}  位置
     * @return {Boolean} 交集
     */
    __proRangeSelector.__hasInterSection = function(_pos0,_pos1){
        return Math.max(_pos0.left,_pos1.left)<
               Math.min(_pos0.left+_pos0.width,
                        _pos1.left+_pos1.width)&&
               Math.max(_pos0.top,_pos1.top)<
               Math.min(_pos0.top+_pos0.height,
                        _pos1.top+_pos1.height);
    };
    /**
     * 刷新列表位置信息
     * @protected
     * @method {__doRefreshListPosition}
     * @return {Void}
     */
    __proRangeSelector.__doRefreshListPosition = (function(){
        var _calculate = function(_item){
            var _offset = e._$offset(_item);
            _item.box = {
                top:_offset.y
               ,left:_offset.x
               ,width:_item.offsetWidth
               ,height:_item.offsetHeight
            };
        };
        return function(){
            u._$forEach(this.__list,_calculate);
        };
    })();
    /**
     * 刷洗节点选择状态
     * @protected
     * @method {__doRefreshItemSelect}
     * @param  {Node} 节点
     * @return {Void}
     */
    __proRangeSelector.__doRefreshItemSelect = function(_event,_item){
        var _id = _item.flag,
            _ctrl = _event.ctrlKey,
            _shift = _event.shiftKey,
            _mixed = this.__hasInterSection(
                          _item.box,_event),
            _selected = this.__isItemSelected(_id);
        if (_item.last==null)
            _item.last = _selected;
        if (_mixed){
            _ctrl&&_item.last
            ? this.__doItemDelFromSelection(_id,_item)
            : this.__doItemAddToSelection(_id,_item);
            if (!_ctrl&&_shift) _item.last = !1;
        }else{
            _item.last
            ? this.__doItemAddToSelection(_id,_item)
            : this.__doItemDelFromSelection(_id,_item);
        }
    };
    /**
     * 调整最后选中项
     * @protected
     * @method {__doAdjustLastItem}
     * @param  {Node} 节点
     * @return {Void}
     */
    __proRangeSelector.__doAdjustLastItem = function(_item){
        u._$safeDelete(_item,'last');
        var _id = _item.flag;
        if (this.__last<0&&
            this.__isItemSelected(_id))
            this.__last = _id;
    };
    /**
     * 范围变化触发事件
     * @protected
     * @method {__onRangeChange}
     * @param  {Object} 范围信息
     * @return {Void}
     */
    __proRangeSelector.__onRangeChange = function(_event){
        // selection clear first
        _event.ctrlKey = _event.event.ctrlKey;
        _event.shiftKey = _event.event.shiftKey;
        delete _event.event;
        window.setTimeout(
             u._$forEach._$bind(u,this.__list,this
              .__doRefreshItemSelect._$bind(this,_event)),0);
    };
    /**
     * 区域变化结束事件
     * @protected
     * @method {__onAfterRangeChange}
     * @return {Void}
     */
    __proRangeSelector.__onAfterRangeChange = function(){
        u._$forEach(this.__list,this.__doAdjustLastItem,this);
    };
};
define('{lib}util/selector/selector.range.js',
      ['{lib}util/selector/selector.js'
      ,'{lib}util/range/range.js'],f);