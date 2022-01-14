!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.OptionMenu=t():e.OptionMenu=t()}(self,(function(){return(()=>{var e={203:e=>{self,e.exports=(()=>{"use strict";var e={d:(t,a)=>{for(var n in a)e.o(a,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:a[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{CreateElement:()=>a});var a=function(e){var t,a=e.tagname,n=e.classnames,r=e.content,o=e.attributes;if(t=a?document.createElement(a):document.createElement("div"),n&&(t.className=n),r&&(t.innerHTML=r),o&&0!==Object.keys(o).length&&Object.getPrototypeOf(o)===Object.prototype)for(var i in o)if(Object.hasOwnProperty.call(o,i)){var s=o[i];t.setAttribute(i,s)}return t};return t})()}},t={};function a(n){var r=t[n];if(void 0!==r)return r.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,a),o.exports}a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};return(()=>{"use strict";a.r(n),a.d(n,{List:()=>s});var e=a(203),t=function(e){var t=e.url,a=e.options,n=e.onsuccess,r=e.onfail;fetch(t,a).then((function(e){if(e.ok)return e.json();throw new Error("(Data Sender) ".concat(e.status,": Something went wrong"))})).then((function(e){return n(e)})).catch((function(e){return r(e)}))};function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var i=function(){function a(e){var t=this,n=e.target,r=e.data,o=e.dataURL,i=e.addURL,s=e.removeURL,l=e.onAdd,u=e.onRemove;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),this.target=document.querySelector(n),"INPUT"!=this.target.nodeName&&"TEXTAREA"!=this.target.nodeName||(this.targetIsInput=!0),o?this.data=function(e){var t=e.onfetched,a=e.onfail;fetch(e.url,{method:"get"}).then((function(e){if(e.ok)return e.json();throw new Error("(Data Fetcher) ".concat(e.status,": Something went wrong"))})).then((function(e){return t(e)})).catch((function(e){return a(e)}))}({url:o,onfetched:function(e){t.data=e,t.RenderUI()},onfail:function(e){return console.error(e)}}):r?(this.data=r,this._RenderUI()):(this.data={added:[],available:[]},this._RenderUI()),i&&(this.addURL=i),s&&(this.removeURL=s),l&&"function"==typeof l&&(this.onAdd=l),u&&"function"==typeof u&&(this.onRemove=u)}var n,i;return n=a,i=[{key:"_AddItem",value:function(e){var a,n=e.currentTarget.parentNode.parentNode.parentNode.getAttribute("value"),o=this.data.available,i=this.data.added;if("object"===r(o[0])){var s=o.map((function(e){return e.value})).indexOf(n);a=o[s],i.push(a),o.splice(s,1),this.onAdd&&this.onAdd(a)}else"string"==typeof o[0]&&(o.splice(o.indexOf(n),1),i.push(n),this.onAdd&&this.onAdd(n));var l=this.availableList.querySelector('[value="'.concat(n,'"]')),u=l.querySelector("button"),c=u.querySelector("i");if(this.addedList.insertBefore(l,this.CustomInput),u.classList.remove("btn-primary"),c.classList.remove("fa-plus"),u.classList.add("btn-danger"),c.classList.add("fa-minus"),this.addURL){var d=new FormData;d.append("value",n),t({url:this.addURL,onsuccess:function(e){return console.log(e)},onfail:function(e){return console.error(e)},options:{method:"POST",headers:{"X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":document.querySelector('meta[name="_token"]').getAttribute("content")},body:d}})}}},{key:"_CreateCustomItem",value:function(){var t=this,a=this.DataIsObject?'\n        <form>\n            <label for="label">Nama</label>\n            <input type="text" name="label" class="form-control"/>\n            <label for="value">Nilai</label>\n            <input type="text" name="value" class="form-control"/>\n            <input type="submit" value="Tambah" class="btn btn-primary"/>\n        </form>\n        ':'\n        <form>\n            <input type="text" name="value" class="form-control"/>\n            <input type="submit" value="Tambah" class="btn btn-primary"/>\n        </form>\n        ',n=(0,e.CreateElement)({tagname:"li",classnames:"list-group-item list-group-item-action",content:a});n.querySelector("form").addEventListener("submit",(function(e){if(e.preventDefault(),t.DataIsObject){var a=n.querySelector('input[name="label"]').value,r=n.querySelector('input[name="value"]').value;t._InsertCustomItem({label:a,value:r})}else{var o=n.querySelector('input[name="value"]').value;t._InsertCustomItem({value:o})}n.parentNode.removeChild(n),n=null})),this.addedList.insertBefore(n,this.CustomInput)}},{key:"_InsertCustomItem",value:function(t){var a,n=this,r=t.label,o=t.value,i=(0,e.CreateElement)({tagname:"li",classnames:"list-group-item list-group-item-action",attributes:{value:o,isCustom:!0},content:'\n                <div class="row">\n                    <div class="col">'.concat(r||o,'</div>\n                    <div class="col-auto">\n                        <button class="btn btn-danger">\n                            <i class="fas fa-minus"></i>\n                        </button>\n                    </div>\n                </div>')}),s=this.data.added;a=this.DataIsObject?{value:o,label:r||o}:o,s.push(a),i.querySelector("button").addEventListener("click",(function(e){return n._MoveItem(e)})),this.addedList.insertBefore(i,this.CustomInput),this.targetIsInput&&(this.target.value=JSON.stringify(this.data.added))}},{key:"_MoveItem",value:function(e){for(var t=e.currentTarget;"UL"!=t.nodeName;)t=t.parentNode;t==this.addedList?this._RemoveItem(e):t==this.availableList&&this._AddItem(e),this.targetIsInput&&(this.target.value=JSON.stringify(this.data.added))}},{key:"_PopulateList",value:function(t){var a=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],o=!1,i="";if(n.forEach((function(n){if(!o){var s={label:"",value:""};if("object"===r(n)?(Object.hasOwnProperty.call(n),s.label=n.label,Object.hasOwnProperty.call(n,"value")?(a.DataIsObject=!0,s.value=n.value,""==s.label&&(s.label=n.value)):(o=!0,i="Incorrect data format")):s.label=s.value=n,!o){var l=t==a.availableList?{icon:"plus",class:"primary"}:{icon:"minus",class:"danger"},u=(0,e.CreateElement)({tagname:"li",classnames:"list-group-item list-group-item-action",attributes:{value:s.value},content:'\n                            <div class="row">\n                                <div class="col">'.concat(s.label,'</div>\n                                <div class="col-auto">\n                                    <button type="button" class="btn btn-').concat(l.class,'">\n                                        <i class="fas fa-').concat(l.icon,'"></i>\n                                    </button>\n                                </div>\n                            </div>')});u.querySelector("button").addEventListener("click",(function(e){return a._MoveItem(e)})),t.append(u)}}})),o)return console.error(i),void t.append(i);if(t==this.addedList){var s=this.CustomInput=(0,e.CreateElement)({name:"li",classnames:"list-group-item list-group-item-action",attributes:{value:"create-new"},content:'\n                <div class="row">\n                    <div class="col-auto">\n                        <i class="fas fa-plus"></i>\n                    </div>\n                    <div class="col">Buat Baru</div>\n                </div>\n                '});s.addEventListener("click",(function(e){return a._CreateCustomItem()})),t.append(s)}}},{key:"_RemoveItem",value:function(e){var a,n=e.currentTarget.parentNode.parentNode.parentNode.getAttribute("value"),o=e.currentTarget.parentNode.parentNode.parentNode.hasAttribute("isCustom"),i=this.data.available,s=this.data.added;if("object"===r(s[0])){var l=s.map((function(e){return e.value})).indexOf(n);a=s[l],o||i.push(a),s.splice(l,1),this.onRemove&&this.onRemove(a)}else"string"==typeof s[0]&&(s.splice(s.indexOf(n),1),o||i.push(n),this.onRemove&&this.onRemove(n));var u=this.addedList.querySelector('[value="'.concat(n,'"]')),c=u.querySelector("button"),d=c.querySelector("i");if(o?this.addedList.removeChild(u):(this.availableList.append(u),c.classList.remove("btn-danger"),d.classList.remove("fa-minus"),c.classList.add("btn-primary"),d.classList.add("fa-plus")),this.removeURL){var m=new FormData;m.append("value",n),t({url:this.removeURL,onsuccess:function(e){return console.log(e)},onfail:function(e){return console.error(e)},options:{method:"POST",headers:{"X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":document.querySelector('meta[name="_token"]').getAttribute("content")},body:m}})}}},{key:"_RenderUI",value:function(){var t=(0,e.CreateElement)({classnames:"container"}),a=(0,e.CreateElement)({classnames:"row "}),n=(0,e.CreateElement)({classnames:"col-12 col-md-6 mb-5",attributes:{style:"height: 300px; overflow: auto"}}),r=(0,e.CreateElement)({classnames:"col-12 col-md-6 mb-5",attributes:{style:"height: 300px; overflow: auto"}}),o=this.addedList=(0,e.CreateElement)({tagname:"ul",classnames:"list-group"}),i=this.availableList=(0,e.CreateElement)({tagname:"ul",classnames:"list-group"});this._PopulateList(o,this.data.added),this._PopulateList(i,this.data.available),this.data.available.length&&this.targetIsInput&&(this.target.value=JSON.stringify(this.data.added)),n.append(o),r.append(i),a.append(r),a.append(n),t.append(a),this.targetIsInput?(this.target.type="hidden",this.target.parentNode.insertBefore(t,this.target)):this.target.append(t)}},{key:"getData",get:function(){return{added:this.data.added,available:this.data.available}}}],i&&o(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),a}();const s=i})(),n})()}));