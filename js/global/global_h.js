

if( ! $().jquery) alert('Require jQuery');

var $zen = {    //namespace $zen;
	$global : {} //namespace $zen :: $global;
};

((function(undefined)
{
	/* ==================================== *
	 * namespace(global, property)          *
	 * ------------------------------------ *
	 * 名前空間にオブジェクトを追加する．   *
	 * global    : グローバルな名前空間     *
	 * namespace : 追加する名前空間         *
	 * property  : 追加するオブジェクト     *
	 * ==================================== */
	$zen.$global.namespace = function(global, namespace, property, undefined)
	{
		global            = global            || {};
		global[namespace] = global[namespace] || {};
		property          = property          || {};

		Object.keys(property).forEach(function(key)
		{
			global[namespace][key] = property[key];
		});
	};
})());

((function(undefined)
{
	/* ======================================== *
	 * include(filename)                        *
	 * ---------------------------------------- *
	 * 他Javascriptファイルの読み込みを行う     *
	 * filename : ファイル名                    *
	 * ======================================== */
	$zen.$global.include = function(filename)
	{
		$('head').append('<script type="text/javascript" src="' + filename + '"></script>');
	}

})());


((function(undefined)
{
	/* ========================================= *
	 * inheritance(child, parent)                *
	 * ----------------------------------------- *
	 * 継承を行う                                *
	 * child  : 子クラス                         *
	 * parent : 親クラス                         *
	 * ========================================= */
	$zen.$global.inheritance = function(child, parent)
	{
		child.prototype             = Object.create(parent.prototype);
		child.prototype.constructor = child;
		child.super                 = parent.prototype;
	}
})());


((function(undefined)
{
	/* =============================================== *
	 * extend(parent, property)                        *
	 * ----------------------------------------------- *
	 * parentを継承した子クラスを作成する．            *
	 * parent   : 親クラス                             *
	 * property : 子クラスのprototypeメソッド          *
	 * =============================================== */
	$zen.$global.extend = function(parent, property)
	{
		parent   = parent   || Object; //parent   is null, parent   is Object
		property = property || {}; //property is null, property is Object

		//if property do not have constructor, use parent constructor
		var child = property.constructor || function(){ parent.apply(this, arguments); };

		$zen.$global.inheritance(child, parent); //INHERITANCE

		//make List 
		Object.keys(property).forEach(function(key)
		{
			if(key !== 'constructor') child.prototype[key] = property[key];
		});

		return child;
	}
})());

