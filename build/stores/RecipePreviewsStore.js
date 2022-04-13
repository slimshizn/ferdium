"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _class,_descriptor,_descriptor2,_descriptor3,_mobx=require("mobx"),_Store=_interopRequireDefault(require("./lib/Store")),_CachedRequest=_interopRequireDefault(require("./lib/CachedRequest")),_Request=_interopRequireDefault(require("./lib/Request"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _initializerDefineProperty(e,r,t,i){t&&Object.defineProperty(e,r,{enumerable:t.enumerable,configurable:t.configurable,writable:t.writable,value:t.initializer?t.initializer.call(i):void 0})}function _applyDecoratedDescriptor(e,r,t,i,s){var a={};return Object.keys(i).forEach((function(e){a[e]=i[e]})),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=t.slice().reverse().reduce((function(t,i){return i(e,r,t)||t}),a),s&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(s):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,r,a),a=null),a}function _initializerWarningHelper(e,r){throw new Error("Decorating class property failed. Please ensure that proposal-class-properties is enabled and runs after the decorators transform.")}let RecipePreviewsStore=(_class=class extends _Store.default{constructor(...e){super(...e),_initializerDefineProperty(this,"allRecipePreviewsRequest",_descriptor,this),_initializerDefineProperty(this,"featuredRecipePreviewsRequest",_descriptor2,this),_initializerDefineProperty(this,"searchRecipePreviewsRequest",_descriptor3,this),this.actions.recipePreview.search.listen(this._search.bind(this))}get all(){return this.allRecipePreviewsRequest.execute().result||[]}get featured(){return this.featuredRecipePreviewsRequest.execute().result||[]}get searchResults(){return this.searchRecipePreviewsRequest.result||[]}get dev(){return this.stores.recipes.all.filter((e=>e.local))}_search({needle:e}){""!==e&&this.searchRecipePreviewsRequest.execute(e)}},_descriptor=_applyDecoratedDescriptor(_class.prototype,"allRecipePreviewsRequest",[_mobx.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new _CachedRequest.default(this.api.recipePreviews,"all")}}),_descriptor2=_applyDecoratedDescriptor(_class.prototype,"featuredRecipePreviewsRequest",[_mobx.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new _CachedRequest.default(this.api.recipePreviews,"featured")}}),_descriptor3=_applyDecoratedDescriptor(_class.prototype,"searchRecipePreviewsRequest",[_mobx.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new _Request.default(this.api.recipePreviews,"search")}}),_applyDecoratedDescriptor(_class.prototype,"all",[_mobx.computed],Object.getOwnPropertyDescriptor(_class.prototype,"all"),_class.prototype),_applyDecoratedDescriptor(_class.prototype,"featured",[_mobx.computed],Object.getOwnPropertyDescriptor(_class.prototype,"featured"),_class.prototype),_applyDecoratedDescriptor(_class.prototype,"searchResults",[_mobx.computed],Object.getOwnPropertyDescriptor(_class.prototype,"searchResults"),_class.prototype),_applyDecoratedDescriptor(_class.prototype,"dev",[_mobx.computed],Object.getOwnPropertyDescriptor(_class.prototype,"dev"),_class.prototype),_applyDecoratedDescriptor(_class.prototype,"_search",[_mobx.action],Object.getOwnPropertyDescriptor(_class.prototype,"_search"),_class.prototype),_class);exports.default=RecipePreviewsStore;