!function(t){Galleria.requires(1.25,"The Flickr Plugin requires Galleria version 1.2.5 or later.");var i=Galleria.utils.getScriptPath();Galleria.Flickr=function(t){this.api_key=t||"2a2ce06c15780ebeb0b706650fc890b2",this.options={max:30,imageSize:"medium",thumbSize:"thumb",sort:"interestingness-desc",description:!1,complete:function(){},backlink:!1}},Galleria.Flickr.prototype={constructor:Galleria.Flickr,search:function(t,i){return this._find({text:t},i)},tags:function(t,i){return this._find({tags:t},i)},user:function(t,i){return this._call({method:"flickr.urls.lookupUser",url:"flickr.com/photos/"+t},function(t){this._find({user_id:t.user.id,method:"flickr.people.getPublicPhotos"},i)})},set:function(t,i){return this._find({photoset_id:t,method:"flickr.photosets.getPhotos"},i)},gallery:function(t,i){return this._find({gallery_id:t,method:"flickr.galleries.getPhotos"},i)},groupsearch:function(t,i){return this._call({text:t,method:"flickr.groups.search"},function(t){this.group(t.groups.group[0].nsid,i)})},group:function(t,i){return this._find({group_id:t,method:"flickr.groups.pools.getPhotos"},i)},setOptions:function(i){return t.extend(this.options,i),this},_call:function(i,e){var r="https://api.flickr.com/services/rest/?",o=this;return i=t.extend({format:"json",jsoncallback:"?",api_key:this.api_key},i),t.each(i,function(t,i){r+="&"+t+"="+i}),t.getJSON(r,function(t){"ok"===t.stat?e.call(o,t):Galleria.raise(t.code.toString()+" "+t.stat+": "+t.message,!0)}),o},_getBig:function(t){return t.url_l?t.url_l:parseInt(t.width_o,10)>1280?"https://farm"+t.farm+".static.flickr.com/"+t.server+"/"+t.id+"_"+t.secret+"_b.jpg":t.url_o||t.url_z||t.url_m},_getSize:function(t,i){var e;switch(i){case"thumb":e=t.url_t;break;case"small":e=t.url_s;break;case"big":e=this._getBig(t);break;case"original":e=t.url_o?t.url_o:this._getBig(t);break;default:e=t.url_z||t.url_m}return e},_find:function(i,e){return i=t.extend({method:"flickr.photos.search",extras:"url_t,url_m,url_o,url_s,url_l,url_z,description",sort:this.options.sort,per_page:Math.min(this.options.max,500)},i),this._call(i,function(t){var i,r,o=[],s=t.photos?t.photos.photo:t.photoset.photo,l=s.length;for(r=0;r<l;r++)i=s[r],o.push({thumb:this._getSize(i,this.options.thumbSize),image:this._getSize(i,this.options.imageSize),big:this._getBig(i),title:s[r].title,description:this.options.description&&s[r].description?s[r].description._content:"",link:this.options.backlink?"https://flickr.com/photos/"+i.owner+"/"+i.id:""});e.call(this,o)})}};var e=Galleria.prototype.load;Galleria.prototype.load=function(){if(arguments.length||"string"!=typeof this._options.flickr)return void e.apply(this,Galleria.utils.array(arguments));var r,o=this,s=Galleria.utils.array(arguments),l=this._options.flickr.split(":"),n=t.extend({},o._options.flickrOptions),a="undefined"!=typeof n.loader?n.loader:t("<div>").css({width:48,height:48,opacity:.7,background:"#000 url("+i+"loader.gif) no-repeat 50% 50%"});if(l.length){if("function"!=typeof Galleria.Flickr.prototype[l[0]])return Galleria.raise(l[0]+" method not found in Flickr plugin"),e.apply(this,s);if(!l[1])return Galleria.raise("No flickr argument found"),e.apply(this,s);window.setTimeout(function(){o.$("target").append(a)},100),r=new Galleria.Flickr,"object"==typeof o._options.flickrOptions&&r.setOptions(o._options.flickrOptions),r[l[0]](l[1],function(t){o._data=t,a.remove(),o.trigger(Galleria.DATA),r.options.complete.call(r,t)})}else e.apply(this,s)}}(jQuery);